import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  callGateway,
  callManagedAgent,
  cancelManagedAgentInteraction,
  extractJsonFromAgentText,
  extractText,
  extractToolArgs,
  getManagedAgentInteraction,
  guardAiRequest,
  resolveGeminiApiKey,
  type GatewayMessage,
  type ManagedAgentStatus,
} from "./ai-security";
import {
  apiKeyInputSchema,
  followUpAnswerSchema,
  interviewHistoryItemSchema,
  languageSchema,
  profileInputSchema,
  profileSchema as profileZodSchema,
  resumeInputSchema,
} from "./schemas/resume";
import type { CareerPath, FollowUpQuestion, Profile, ResumeData } from "./types";
import { optimizeResumeForOnePage } from "./resume-utils";

// ───────────────── parseMemory ─────────────────

const profileSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    location: { type: "string" },
    email: { type: "string" },
    phone: { type: "string" },
    photoUrl: { type: "string" },
    languages: { type: "array", items: { type: "string" } },
    summary: { type: "string" },
    skills: {
      type: "object",
      properties: {
        technical: { type: "array", items: { type: "string" } },
        soft: { type: "array", items: { type: "string" } },
        tools: { type: "array", items: { type: "string" } },
        languages_spoken: { type: "array", items: { type: "string" } },
      },
      required: ["technical", "soft", "tools", "languages_spoken"],
    },
    experience: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          company: { type: "string" },
          duration: { type: "string" },
          description: { type: "string" },
          achievements: { type: "array", items: { type: "string" } },
        },
        required: ["title", "company", "duration", "description", "achievements"],
      },
    },
    projects: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          tech: { type: "array", items: { type: "string" } },
          impact: { type: "string" },
        },
        required: ["name", "description", "tech", "impact"],
      },
    },
    education: {
      type: "array",
      items: {
        type: "object",
        properties: {
          degree: { type: "string" },
          institution: { type: "string" },
          year: { type: "string" },
        },
        required: ["degree", "institution", "year"],
      },
    },
    certifications: { type: "array", items: { type: "string" } },
    careerGoals: { type: "string" },
    personalityTraits: { type: "array", items: { type: "string" } },
    industryExperience: { type: "array", items: { type: "string" } },
    inferredStrengths: { type: "array", items: { type: "string" } },
    skillItems: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          level: { type: "number", description: "1 to 5 rating" },
        },
        required: ["name", "level"],
      },
    },
  },
  required: [
    "name",
    "location",
    "languages",
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
    "certifications",
    "careerGoals",
    "personalityTraits",
    "industryExperience",
    "inferredStrengths",
  ],
};

export const parseMemory = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      apiKey: apiKeyInputSchema,
      memory: z.string().min(20).max(50000),
    }),
  )
  .handler(async ({ data }): Promise<{ profile: Profile }> => {
    const apiKey = await guardAiRequest("parseMemory", data.apiKey);
    const json = await callGateway({
      apiKey,
      messages: [
        {
          role: "system",
          content:
            "You are an expert career intelligence AI. The user has pasted their AI memory export — a raw dump of facts, experiences, skills, and life context. Extract a complete professional identity profile. Be thorough; infer reasonable details where appropriate but do not fabricate concrete facts (companies, dates, metrics).",
        },
        { role: "user", content: data.memory },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "save_profile",
            description: "Save the extracted professional identity profile.",
            parameters: profileSchema,
          },
        },
      ],
      toolChoice: { type: "function", function: { name: "save_profile" } },
    });
    const profile = extractToolArgs<Profile>(json);
    return { profile };
  });

// ───────────────── getFollowUpQuestions ─────────────────

export const getFollowUpQuestions = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      apiKey: apiKeyInputSchema,
      profile: profileInputSchema,
      rawMemory: z.string().max(50000),
    }),
  )
  .handler(
    async ({
      data,
    }): Promise<{
      state: "GATHERING" | "READY_TO_TEMPLATE" | "NEED_CLARITY";
      message: string;
      questions: import("./types").FollowUpQuestion[];
    }> => {
      const apiKey = await guardAiRequest("getFollowUpQuestions", data.apiKey);
      const profileStr = JSON.stringify(data.profile);
      const json = await callGateway({
        apiKey,
        messages: [
          {
            role: "system",
            content: `You are the "Workflow Navigator" for MemoryCV. Your job is to guide the user through the onboarding funnel and decide when their "Professional Memory" is complete enough to move to the next stage.
Your tone must be formal and logical, not chatty or casual. You are a system answering and analyzing, not a "dude" chatting.

### THE WORKFLOW STATES
1. GATHERING: User is still giving info or uploading raw data.
2. READY_TO_TEMPLATE: You have enough info (Name, Role, Education, Experience) to build a solid resume.
3. NEED_CLARITY: The data is messy or missing major pieces (e.g., no job dates or vague descriptions).

### YOUR MISSION
1. Analyze Input: Look at the user's brain dump/upload.
2. Determine State: Decide if they are ready to move forward.
3. Draft Response:
   - If GATHERING/NEED_CLARITY: Ask one or a few sharp, logical questions to fill the gap.
   - If READY_TO_TEMPLATE: Return a formal summary and move to the next state.

Critical fields: name, email/phone contact, at least 1 experience with achievements, education, skills.

IMPORTANT FOR UI COMPONENTS:
- For 'languages' and 'skills', you MUST use the inputType "rating".
- For multiple choice, use inputType "multiselect".
- For standard text, use inputType "text".
Return 5 to 10 questions if you need to build a comprehensive profile from scratch, or fewer if just clarifying. If READY_TO_TEMPLATE, return an empty questions array.`,
          },
          {
            role: "user",
            content: `Raw input:\n${data.rawMemory}\n\nExtracted profile:\n${profileStr}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_workflow_state",
              description:
                "Return the current workflow state, an accompanying message, and any necessary follow-up questions.",
              parameters: {
                type: "object",
                properties: {
                  state: {
                    type: "string",
                    enum: ["GATHERING", "READY_TO_TEMPLATE", "NEED_CLARITY"],
                  },
                  message: {
                    type: "string",
                    description:
                      "Formal message to the user explaining the state or what is needed.",
                  },
                  questions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        field: {
                          type: "string",
                          description: "Which profile field this fills, e.g. 'email', 'skills'",
                        },
                        question: {
                          type: "string",
                          description: "The logical question to ask the user",
                        },
                        helperText: {
                          type: "string",
                          description: "Brief explanation of why this matters",
                        },
                        inputType: {
                          type: "string",
                          enum: ["text", "select", "multiselect", "rating"],
                        },
                        options: {
                          type: "array",
                          items: { type: "string" },
                          description: "Options for select/multiselect. Empty if text or rating.",
                        },
                        placeholder: { type: "string" },
                      },
                      required: ["id", "field", "question", "helperText", "inputType", "options"],
                    },
                  },
                },
                required: ["state", "message", "questions"],
              },
            },
          },
        ],
        toolChoice: { type: "function", function: { name: "return_workflow_state" } },
      });
      const result = extractToolArgs<{
        state: "GATHERING" | "READY_TO_TEMPLATE" | "NEED_CLARITY";
        message: string;
        questions: import("./types").FollowUpQuestion[];
      }>(json);
      return result;
    },
  );

// ───────────────── patchProfileWithAnswers ─────────────────

export const patchProfileWithAnswers = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      apiKey: apiKeyInputSchema,
      profile: profileInputSchema,
      answers: z.array(followUpAnswerSchema).max(50),
    }),
  )
  .handler(async ({ data }): Promise<{ profile: import("./types").Profile }> => {
    const apiKey = await guardAiRequest("patchProfileWithAnswers", data.apiKey);
    const json = await callGateway({
      apiKey,
      messages: [
        {
          role: "system",
          content:
            "You are a profile merge AI. Given an existing profile JSON and a set of user answers to follow-up questions, merge the answers into the profile and return the updated complete profile JSON. Preserve all existing data; only add/update fields based on the answers.",
        },
        {
          role: "user",
          content: `Current profile:\n${JSON.stringify(data.profile)}\n\nUser answers:\n${JSON.stringify(data.answers)}`,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "save_profile",
            description: "Save the updated profile with user answers merged in.",
            parameters: profileSchema,
          },
        },
      ],
      toolChoice: { type: "function", function: { name: "save_profile" } },
    });
    const profile = extractToolArgs<import("./types").Profile>(json);
    return { profile };
  });

// ───────────────── generateResume ─────────────────

const resumeSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    title: { type: "string" },
    email: { type: "string" },
    phone: { type: "string" },
    photoUrl: { type: "string" },
    location: { type: "string" },
    summary: { type: "string" },
    experience: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          company: { type: "string" },
          duration: { type: "string" },
          description: { type: "string" },
          achievements: { type: "array", items: { type: "string" } },
        },
        required: ["title", "company", "duration", "description", "achievements"],
      },
    },
    projects: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          tech: { type: "array", items: { type: "string" } },
          impact: { type: "string" },
        },
        required: ["name", "description", "tech", "impact"],
      },
    },
    education: {
      type: "array",
      items: {
        type: "object",
        properties: {
          degree: { type: "string" },
          institution: { type: "string" },
          year: { type: "string" },
        },
        required: ["degree", "institution", "year"],
      },
    },
    skills: { type: "array", items: { type: "string" } },
    skillItems: {
      type: "array",
      description:
        "Skill ratings used by visual resume templates. Keep names aligned with skills. Level is 1-5 and controls bars, dots, stars, or other skill graphics.",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          level: { type: "number" },
        },
        required: ["name", "level"],
      },
    },
    certifications: { type: "array", items: { type: "string" } },
    sectionTitles: {
      type: "object",
      description: "Localized section titles. Must translate Profile, Experience, Education, Skills, Languages, Certifications if the resume is non-English.",
      properties: {
        profile: { type: "string" },
        experience: { type: "string" },
        education: { type: "string" },
        skills: { type: "string" },
        languages: { type: "string" },
        certifications: { type: "string" },
      },
    },
  },
  required: [
    "name",
    "title",
    "summary",
    "experience",
    "projects",
    "education",
    "skills",
    "skillItems",
    "certifications",
  ],
};

export const generateResume = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      apiKey: apiKeyInputSchema,
      profile: profileInputSchema,
      jobTarget: z.string().min(2).max(5000),
    }),
  )
  .handler(async ({ data }): Promise<{ resume: ResumeData }> => {
    const apiKey = await guardAiRequest("generateResume", data.apiKey);
    const json = await callGateway({
      apiKey,
      messages: [
        {
          role: "system",
          content: `### ROLE
You are the "Professional Memory Architect" for MemoryCV. Your goal is to transform messy, raw career data into high-impact, top-1% professional resumes that bypass ATS filters and impress human recruiters.

### THE MISSION
1. **Analyze:** Parse the provided "Memory JSON" (user's career history).
2. **Refine:** Upgrade every bullet point using the "Google XYZ Formula": 
   - [Accomplished X] as measured by [Y], by doing [Z].
3. **Quantify:** If the user didn't provide numbers, intelligently estimate or use strong action verbs that imply scale (e.g., "Streamlined," "Architected," "Optimized").
4. **Tone:** Professional, modern, and high-energy. Avoid "I" or "My"; start with powerful action verbs.

### RULES OF ENGAGEMENT
- **Sorani Context:** If the input is in Kurdish (Sorani), maintain professional linguistic standards.
- **Localization:** If the input is in Kurdish, ensure you translate all sectionTitles (Profile, Experience, Education, Skills, Languages, Certifications) into Kurdish in the \`sectionTitles\` object.
- **Conciseness:** No fluff. Every word must justify its existence on the page.
- **Skills Mapping:** Group skills logically based on the "Memory."
- **ATS Focus:** Use keywords specific to the job title the user is targeting.

You must output the final resume using the provided schema tool.`,
        },
        {
          role: "user",
          content: `User profile (JSON):\n${JSON.stringify(data.profile)}\n\nTarget role / job description:\n${data.jobTarget}\n\nWrite a complete tailored resume for this exact role.`,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "save_resume",
            description: "Save the tailored resume data.",
            parameters: resumeSchema,
          },
        },
      ],
      toolChoice: { type: "function", function: { name: "save_resume" } },
    });
    const resume = extractToolArgs<ResumeData>(json);
    return { resume: optimizeResumeForOnePage(resume) };
  });

// ───────────────── chatEditResume ─────────────────

export const chatEditResume = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      apiKey: apiKeyInputSchema,
      resume: resumeInputSchema,
      userMessage: z.string().min(1).max(2000),
      language: languageSchema.default("en"),
    }),
  )
  .handler(async ({ data }): Promise<{ resume: ResumeData; reply: string }> => {
    const apiKey = await guardAiRequest("chatEditResume", data.apiKey);
    const isKu = data.language === "ku";
    const json = await callGateway({
      apiKey,
      messages: [
        {
          role: "system",
          content: `You are an elite resume editor and AI assistant. The user will provide their current resume data (in JSON) and a message detailing what changes they want. You must output the fully updated resume data reflecting these changes using the save_resume tool. \n\nCRITICAL LANGUAGE RULE: No matter what language the user speaks in their request, you MUST modify the resume data in the exact same language the resume is currently written in. Do not translate the resume content unless explicitly asked.\n\nCRITICAL REPLY RULE: Your conversational reply must be VERY short and concise (max 1 sentence) confirming the changes. Write that reply in ${isKu ? "Kurdish (Sorani)" : "English"}. If the user asks to raise, lower, reduce, fill, or change skill bars, dots, stars, or visual skill levels, update resume.skillItems with names aligned to resume.skills and levels from 1 to 5.`,
        },
        {
          role: "user",
          content: `Current Resume Data:\n${JSON.stringify(data.resume)}\n\nUser Request: ${data.userMessage}`,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "save_resume",
            description: "Save the updated tailored resume data alongside a reply message.",
            parameters: {
              type: "object",
              properties: {
                resume: resumeSchema,
                reply: {
                  type: "string",
                  description:
                    "A VERY short and concise conversational reply (max 1 sentence) confirming the changes.",
                },
              },
              required: ["resume", "reply"],
            },
          },
        },
      ],
      toolChoice: { type: "function", function: { name: "save_resume" } },
    });

    const result = extractToolArgs<{ resume: ResumeData; reply: string }>(json);
    return { resume: optimizeResumeForOnePage(result.resume), reply: result.reply };
  });

// ───────────────── follow-up questions ─────────────────

const followUpQuestionsSchema = {
  type: "object",
  properties: {
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          field: { type: "string" },
          question: { type: "string" },
          helperText: { type: "string" },
          inputType: { type: "string", enum: ["text", "select"] },
          options: { type: "array", items: { type: "string" } },
          placeholder: { type: "string" },
        },
        required: ["id", "field", "question", "helperText", "inputType", "options"],
      },
    },
  },
  required: ["questions"],
};

const profileWithPhotoSchema = {
  ...profileSchema,
  properties: {
    ...profileSchema.properties,
    photoUrl: { type: "string" },
  },
};

export const suggestFollowUpQuestions = createServerFn({ method: "POST" })
  .inputValidator(z.object({ apiKey: apiKeyInputSchema, profile: profileZodSchema }))
  .handler(async ({ data }): Promise<{ questions: FollowUpQuestion[] }> => {
    const apiKey = await guardAiRequest("suggestFollowUpQuestions", data.apiKey);
    const json = await callGateway({
      apiKey,
      messages: [
        {
          role: "system",
          content:
            "You are a career intake assistant. Review this extracted profile and identify missing, unclear, or weak resume-critical information. Ask 5 to 10 short, high-value follow-up questions. Use select inputs when you can offer strong options. Use text input when the answer must be free-form. Do not ask for information already clearly present. Prioritize current title, contact details, location clarity, career target, strongest achievements, portfolio/photo, and missing education or project context.",
        },
        {
          role: "user",
          content: `Profile:\n${JSON.stringify(data.profile)}`,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "save_follow_up_questions",
            description: "Save the follow-up questions needed to complete the profile.",
            parameters: followUpQuestionsSchema,
          },
        },
      ],
      toolChoice: { type: "function", function: { name: "save_follow_up_questions" } },
    });

    const { questions } = extractToolArgs<{ questions: FollowUpQuestion[] }>(json);
    return { questions: questions.slice(0, 10) };
  });

export const applyFollowUpAnswers = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      apiKey: apiKeyInputSchema,
      profile: profileInputSchema,
      answers: z.array(followUpAnswerSchema).max(50),
    }),
  )
  .handler(async ({ data }): Promise<{ profile: Profile }> => {
    const apiKey = await guardAiRequest("applyFollowUpAnswers", data.apiKey);
    const json = await callGateway({
      apiKey,
      messages: [
        {
          role: "system",
          content:
            "You are a career profile completion assistant. Update the existing profile using the user's follow-up answers. Preserve all confirmed facts, fill missing fields from the answers, and improve the profile summary only when the new information materially helps. Never invent companies, dates, metrics, or credentials. If a photo URL is provided, store it in photoUrl.",
        },
        {
          role: "user",
          content: `Existing profile:\n${JSON.stringify(data.profile)}\n\nFollow-up answers:\n${JSON.stringify(data.answers)}`,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "save_completed_profile",
            description: "Save the completed profile after applying follow-up answers.",
            parameters: profileWithPhotoSchema,
          },
        },
      ],
      toolChoice: { type: "function", function: { name: "save_completed_profile" } },
    });

    return { profile: extractToolArgs<Profile>(json) };
  });

// ───────────────── improveBullet ─────────────────

export const improveBullet = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      apiKey: apiKeyInputSchema,
      bullet: z.string().min(2).max(2000),
      jobTitle: z.string().max(200).optional(),
      mode: z.enum(["impact", "technical", "quantify", "concise"]).default("impact"),
    }),
  )
  .handler(async ({ data }): Promise<{ bullet: string }> => {
    const apiKey = await guardAiRequest("improveBullet", data.apiKey);
    const modeMap: Record<string, string> = {
      impact: "Make it more impactful and achievement-oriented.",
      technical: "Make it more technical and specific.",
      quantify: "Add plausible metrics if inferable; otherwise sharpen specificity.",
      concise: "Make it more concise — under 18 words.",
    };
    const json = await callGateway({
      apiKey,
      messages: [
        {
          role: "system",
          content: `You rewrite resume bullets. Use strong action verbs, keep under 2 lines. ${modeMap[data.mode]} Return ONLY the improved bullet, no quotes, no explanation.`,
        },
        {
          role: "user",
          content: `Original: ${data.bullet}\nContext role: ${data.jobTitle ?? "N/A"}`,
        },
      ],
    });
    return {
      bullet: extractText(json)
        .trim()
        .replace(/^["']|["']$/g, ""),
    };
  });

// ───────────────── suggestCareerPaths ─────────────────

const careerPathsSchema = {
  type: "object",
  properties: {
    paths: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          matchScore: { type: "number" },
          whyFit: { type: "string" },
          skillGaps: { type: "array", items: { type: "string" } },
          salaryRange: { type: "string" },
          timeToTransition: { type: "string" },
        },
        required: ["title", "matchScore", "whyFit", "skillGaps", "salaryRange", "timeToTransition"],
      },
    },
  },
  required: ["paths"],
};

export const suggestCareerPaths = createServerFn({ method: "POST" })
  .inputValidator(z.object({ apiKey: apiKeyInputSchema, profile: profileZodSchema }))
  .handler(async ({ data }): Promise<{ paths: CareerPath[] }> => {
    const apiKey = await guardAiRequest("suggestCareerPaths", data.apiKey);
    const json = await callGateway({
      apiKey,
      messages: [
        {
          role: "system",
          content:
            "You are a career strategist. Suggest the 6 most realistic, high-potential career paths for this person. Match scores 0-100. Salary in USD ranges. Be specific.",
        },
        { role: "user", content: `Profile:\n${JSON.stringify(data.profile)}` },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "save_career_paths",
            description: "Save the 6 career path suggestions.",
            parameters: careerPathsSchema,
          },
        },
      ],
      toolChoice: { type: "function", function: { name: "save_career_paths" } },
    });
    return extractToolArgs<{ paths: CareerPath[] }>(json);
  });

// ───────────────── tailorToJob ─────────────────

export const tailorToJob = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      apiKey: apiKeyInputSchema,
      resume: resumeInputSchema,
      jobDescription: z.string().min(20).max(10000),
      language: languageSchema.default("en"),
    }),
  )
  .handler(async ({ data }): Promise<{ resume: ResumeData }> => {
    const apiKey = await guardAiRequest("tailorToJob", data.apiKey);
    const isKu = data.language === "ku";
    const json = await callGateway({
      apiKey,
      messages: [
        {
          role: "system",
          content: `You rewrite an existing resume to be laser-targeted to the provided job description. Reorder, rephrase, surface relevant keywords. Do not invent companies, dates, or metrics. Keep structure identical. If you need to add any short assistant-facing note, write it in ${isKu ? "Kurdish (Sorani)" : "English"}.`,
        },
        {
          role: "user",
          content: `Existing resume:\n${JSON.stringify(data.resume)}\n\nJob description:\n${data.jobDescription}`,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "save_resume",
            description: "Save the tailored resume.",
            parameters: resumeSchema,
          },
        },
      ],
      toolChoice: { type: "function", function: { name: "save_resume" } },
    });
    return { resume: optimizeResumeForOnePage(extractToolArgs<ResumeData>(json)) };
  });

// ───────────────── fixResumeErrors ─────────────────

export const fixResumeErrors = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      apiKey: apiKeyInputSchema,
      resume: resumeInputSchema,
      language: languageSchema.default("en"),
    }),
  )
  .handler(async ({ data }): Promise<{ resume: ResumeData; reply: string }> => {
    const apiKey = await guardAiRequest("fixResumeErrors", data.apiKey);
    const isKu = data.language === "ku";
    const json = await callGateway({
      apiKey,
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: `You are an elite Senior HR Executive and Expert Talent Acquisition Specialist for a top-tier multinational corporation. You possess deep expertise in Applicant Tracking Systems (ATS) optimization, professional branding, and rigorous CV/Resume auditing.
# Primary Objective
Analyze the provided CV comprehensively. You must automatically deduce the candidate's target department/industry, identify all structural, grammatical, and strategic flaws, and provide actionable, high-impact solutions to elevate the CV to a top-1% standard. AND most importantly, YOU MUST ACTUALLY FIX THE CV BY RETURNING THE UPDATED RESUME JSON alongside your analysis.
# Core Directives & Constraints (Strictly Enforced)
1. **Absolute Truth & Zero Hallucination:** Do not fabricate information, skills, or experiences. Base your entire analysis strictly on the provided text.
2. **Context Isolation:** Treat this analysis in absolute isolation. Do not mix, reference, or incorporate any data or topics from previous chats.
3. **Language Mandate:** The CV/Resume data itself MUST be updated in the original language of the CV. Do not translate the CV content!
4. **Conciseness Mandate:** Your entire response (the 'reply' field) MUST be VERY SHORT (max 1 sentence) acknowledging that the errors have been fixed and ATS optimized. Do NOT output a long analysis. Write the reply in ${isKu ? "Kurdish (Sorani)" : "English"}.
5. **Proactive Enhancement:** Anticipate what makes a perfect CV. Fix formatting, grammar, phrasing, and missing information.

Use the save_resume tool. The 'resume' parameter should contain the ACTUALLY FIXED AND IMPROVED RESUME based on your analysis. The 'reply' parameter should contain your VERY SHORT conversational acknowledgment.`,
        },
        {
          role: "user",
          content: `Here is the current CV data:\n${JSON.stringify(data.resume)}`,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "save_resume",
            description: "Save the fixed, optimized resume data alongside your evaluation reply.",
            parameters: {
              type: "object",
              properties: {
                resume: resumeSchema,
                reply: {
                  type: "string",
                  description:
                    "A VERY short and concise conversational reply (max 1 sentence) confirming the CV has been fixed.",
                },
              },
              required: ["resume", "reply"],
            },
          },
        },
      ],
      toolChoice: { type: "function", function: { name: "save_resume" } },
    });

    const result = extractToolArgs<{ resume: ResumeData; reply: string }>(json);
    return { resume: optimizeResumeForOnePage(result.resume), reply: result.reply };
  });

export const generateCoverLetter = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      apiKey: apiKeyInputSchema,
      resume: resumeInputSchema,
      language: languageSchema,
    }),
  )
  .handler(async ({ data }): Promise<{ coverLetter: string }> => {
    const apiKey = await guardAiRequest("generateCoverLetter", data.apiKey);
    const json = await callGateway({
      apiKey,
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: `You are an expert Career Coach and Talent Acquisition Specialist. 
Your goal is to write a highly professional, engaging, and persuasive Cover Letter based on the provided Resume Data.
The Cover Letter must be written in ${data.language === "ku" ? "fluent Kurdish (Sorani)" : "English"}.

# Guidelines
1. Do not repeat the resume. Tell a compelling story about the candidate's core strengths and how they align with the industry.
2. Structure: 
   - A strong opening that states the candidate's target role.
   - 1 or 2 body paragraphs highlighting major achievements or specific skills.
   - A confident closing with a call to action.
3. Keep it under one page (approx 300-400 words).
4. Use standard cover letter format with placeholders like [Date], [Hiring Manager Name], [Company Name] where appropriate.
5. If the language is Kurdish, ensure the tone is professional, respectful, and uses proper Sorani terminology for business/HR.`,
        },
        {
          role: "user",
          content: `Here is the candidate's Resume Data:\n${JSON.stringify(data.resume, null, 2)}\n\nPlease generate the Cover Letter.`,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "return_cover_letter",
            description: "Return the generated cover letter.",
            parameters: {
              type: "object",
              properties: {
                coverLetter: {
                  type: "string",
                  description: "The generated cover letter text in markdown format.",
                },
              },
              required: ["coverLetter"],
            },
          },
        },
      ],
      toolChoice: { type: "function", function: { name: "return_cover_letter" } },
    });

    const result = extractToolArgs<{ coverLetter: string }>(json);
    return { coverLetter: result.coverLetter };
  });

// ───────────────── generateInterviewQuestion ─────────────────

export const generateInterviewQuestion = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      apiKey: apiKeyInputSchema,
      history: z.array(interviewHistoryItemSchema).max(100),
      targetRole: z.string().max(300).optional(),
      language: languageSchema.default("en"),
      questionIndex: z.number().min(0).max(100),
      totalQuestions: z.number().min(1).max(100),
    }),
  )
  .handler(async ({ data }): Promise<{ nextQuestion: string }> => {
    const apiKey = await guardAiRequest("generateInterviewQuestion", data.apiKey);
    const isKu = data.language === "ku";
    const rolePrompt = data.targetRole
      ? `The user is interviewing for the role of: ${data.targetRole}. You ALREADY KNOW this role, DO NOT ask them what role they are applying for.`
      : "The user is interviewing for a general professional role.";

    const sysPrompt = `You are an expert AI Interviewer conducting a highly professional, hyper-realistic job interview.
${rolePrompt}
You are currently asking question ${data.questionIndex + 1} out of ${data.totalQuestions}.
Your goal is to assess the candidate's skills, experience, and behavioral traits.

RULES:
1. Ask ONE clear, professional interview question.
2. If this is question 1, welcome them briefly and immediately ask the first opening question (e.g., "Tell me about yourself" or a role-specific starter). DO NOT ask what role they are applying for.
3. Base your question on the context of the conversation so far, or introduce a new relevant topic if needed.
4. DO NOT break character. You are the interviewer.
5. Keep the question concise (1-3 sentences maximum).
6. DO NOT provide answers or hints.
7. ${isKu ? "YOU MUST SPEAK ONLY IN KURDISH SORANI (کوردی سۆرانی)." : "Speak in English."}`;

    const messages: GatewayMessage[] = [{ role: "system", content: sysPrompt }];

    if (data.history.length === 0) {
      messages.push({
        role: "user",
        content: isKu
          ? "من ئامادەم. تکایە یەکەم پرسیاری چاوپێکەوتنەکە بکە."
          : "I am ready. Please ask the first interview question.",
      });
    } else {
      messages.push(
        ...data.history.map(
          (msg) =>
            ({
              role: msg.role === "ai" ? "assistant" : msg.role,
              content: msg.content,
            }) as GatewayMessage,
        ),
      );
    }

    const json = await callGateway({
      apiKey,
      model: "gemini-2.5-flash",
      messages,
    });

    return { nextQuestion: extractText(json).trim() };
  });

// ───────────────── generateFieldContent ─────────────────

export const generateFieldContent = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      apiKey: apiKeyInputSchema,
      field: z.string().max(200),
      formData: z.record(z.string(), z.unknown()).refine((o) => JSON.stringify(o).length <= 100_000, {
        message: "Form data too large",
      }),
      language: languageSchema.default("en"),
    }),
  )
  .handler(async ({ data }): Promise<{ content: string }> => {
    const apiKey = await guardAiRequest("generateFieldContent", data.apiKey);
    const isKu = data.language === "ku";
    const json = await callGateway({
      apiKey,
      messages: [
        {
          role: "system",
          content: `You are an expert resume writer. The user is filling out a form and clicked "Generate with AI" for the field: ${data.field}. 
Write professional content for this specific field based on the context provided in the rest of the form.
Do not use markdown formatting. Write pure text suitable for a textarea. 
For example, if field is "experience", write a few bullet points of standard achievements for their role.
Write in ${isKu ? "Kurdish (Sorani)" : "English"}.`,
        },
        {
          role: "user",
          content: `Current form data context:\n${JSON.stringify(data.formData, null, 2)}\n\nPlease generate the content for: ${data.field}`,
        },
      ],
    });
    return { content: extractText(json).trim() };
  });

// ───────────────── Telegram Jobs Agent (Gemini Managed Agent) ─────────────────
//
// Uses the Antigravity managed agent (Gemini Interactions API) to browse public
// Telegram job channels, read the most recent messages, and surface a ranked
// shortlist of jobs that match the user's professional memory.
//
// Why a managed agent: this task needs real web browsing and multi-step
// reasoning, which the standard chat-completions endpoint cannot do.
//
// Architecture: the scan runs in the API's background mode. `startTelegramJobScan`
// kicks it off (~1-2s) and returns an interaction id; the client then polls
// `pollTelegramJobScan` every few seconds until status is "completed". Both
// server functions finish in well under any free-tier serverless timeout
// (Vercel Hobby 10s, Cloudflare, Netlify, Deno Deploy, etc.) — no need to pay
// for extended runtimes.

export type JobMatchTier = "A" | "B" | "C";

export interface TelegramJobMatch {
  title: string;
  company?: string;
  location?: string;
  channel: string;
  link?: string;
  snippet: string;
  postedAt?: string;
  language?: string;
  score: number;
  tier: JobMatchTier;
  whyFit: string;
  skillGap?: string[];
}

export interface TelegramJobScanStats {
  channelsScanned: number;
  channelsFailed: number;
  messagesRead: number;
  matchesFound: number;
  notes?: string;
}

export type TelegramJobScanPhase = "queued" | "running" | "completed" | "failed" | "cancelled";

export interface TelegramJobScanHandle {
  interactionId: string;
  environmentId?: string;
  phase: TelegramJobScanPhase;
}

export interface TelegramJobScanResult {
  matches: TelegramJobMatch[];
  stats: TelegramJobScanStats;
  interactionId: string;
  environmentId?: string;
  phase: TelegramJobScanPhase;
  rawOutput?: string;
}

const telegramChannelSchema = z
  .string()
  .min(2)
  .max(64)
  .regex(/^@?[a-zA-Z0-9_]{2,32}$/u, "Invalid Telegram channel handle");

function mapAgentStatusToPhase(status: ManagedAgentStatus): TelegramJobScanPhase {
  switch (status) {
    case "completed":
      return "completed";
    case "failed":
    case "incomplete":
      return "failed";
    case "cancelled":
      return "cancelled";
    case "in_progress":
    case "requires_action":
    default:
      return "running";
  }
}

function buildTelegramAgentPrompts(args: {
  profile: Profile;
  channels: string[];
  messagesPerChannel: number;
  maxMatches: number;
  language: "en" | "ku";
  targetRole?: string;
}): { systemInstruction: string; userInput: string } {
  const isKu = args.language === "ku";
  const channelUrls = args.channels.map((h) => `https://t.me/s/${h}`);

  const compactProfile = {
    name: args.profile.name,
    location: args.profile.location,
    summary: args.profile.summary?.slice(0, 1500) ?? "",
    careerGoals: args.profile.careerGoals?.slice(0, 800) ?? "",
    languages: args.profile.languages ?? [],
    skills: {
      technical: args.profile.skills?.technical?.slice(0, 30) ?? [],
      soft: args.profile.skills?.soft?.slice(0, 20) ?? [],
      tools: args.profile.skills?.tools?.slice(0, 30) ?? [],
      languages_spoken: args.profile.skills?.languages_spoken?.slice(0, 10) ?? [],
    },
    industryExperience: args.profile.industryExperience?.slice(0, 20) ?? [],
    inferredStrengths: args.profile.inferredStrengths?.slice(0, 20) ?? [],
    latestRole: args.profile.experience?.[0]?.title ?? "",
    yearsOfExperience: args.profile.experience?.length ?? 0,
    targetRole: args.targetRole ?? "",
  };

  const systemInstruction = `You are a Telegram job-channel research agent for the MemoryCV platform.
Your job is to BROWSE public Telegram channels via their web preview pages, read the most
recent posts, identify which posts are real job opportunities, and rank them against the
user's professional memory.

# Browsing rules
- For each channel handle the user gives you, open: https://t.me/s/<handle>
- Some channels do not expose a public web preview; in that case mark them as "failed"
  in stats but keep going.
- Only consider the most recent ${args.messagesPerChannel} messages per channel (typical
  newest first ordering of the t.me/s page).
- Read message text carefully. Ignore reposts, surveys, ads, fundraising posts.

# What counts as a job
- Posts that announce a vacancy, hiring, opening, internship, contract, freelance gig,
  remote opportunity, scholarship-with-stipend, or similar paid role. Skip courses,
  paid trainings, paid events, and pure promotional content.

# Matching rules
- Compare each job to the user's profile (skills, latest role, target role, location,
  spoken languages, summary, career goals).
- Tier A = strong fit (clear overlap on role + key skills + language/location).
- Tier B = partial fit (some overlap; minor gaps in 1-2 skills, or different seniority).
- Tier C = adjacent/stretch (worth knowing but real gaps).
- Score is 0-100 (A: 80-100, B: 60-79, C: 40-59). Skip anything below 40.

# Output
Return EXACTLY one JSON object between these markers, and nothing else after the markers.
Do NOT include code fences. Do NOT include commentary outside the markers.

<<<JSON_START>>>
{
  "matches": [
    {
      "title": "string",
      "company": "string (optional)",
      "location": "string (optional)",
      "channel": "@handle (no protocol)",
      "link": "https://t.me/<handle>/<id> if you can determine it, else empty",
      "snippet": "first ~220 chars of the original message text",
      "postedAt": "ISO date or readable timestamp if visible, else empty",
      "language": "en | ku | ar | other",
      "score": 0,
      "tier": "A" | "B" | "C",
      "whyFit": "1-2 sentences in ${isKu ? "Kurdish (Sorani)" : "English"}",
      "skillGap": ["short", "skill", "names"]
    }
  ],
  "stats": {
    "channelsScanned": 0,
    "channelsFailed": 0,
    "messagesRead": 0,
    "matchesFound": 0,
    "notes": "short status note, empty if nothing to report"
  }
}
<<<JSON_END>>>

# Hard limits
- At most ${args.maxMatches} matches.
- Sort matches by tier (A then B then C) and then by score descending.
- Do NOT invent posts. Only include jobs you actually saw in the channels.
- Do NOT translate the snippet; keep it in the original language.
- The 'whyFit' field must be in ${isKu ? "Kurdish (Sorani)" : "English"}.`;

  const userInput = `Scan these Telegram channels for jobs that match the user.

Channels to scan (open each URL with your browsing tool):
${channelUrls.map((u, i) => `${i + 1}. ${u}`).join("\n")}

User professional memory (JSON):
${JSON.stringify(compactProfile, null, 2)}

Read up to ${args.messagesPerChannel} most recent posts per channel. Return at most
${args.maxMatches} ranked matches in the JSON format described in your instructions.`;

  return { systemInstruction, userInput };
}

function parseTelegramAgentOutput(
  outputText: string,
  maxMatches: number,
  fallbackChannelsScanned: number,
): { matches: TelegramJobMatch[]; stats: TelegramJobScanStats; rawOutput?: string } {
  const parsed = extractJsonFromAgentText<{
    matches?: TelegramJobMatch[];
    stats?: TelegramJobScanStats;
  }>(outputText);

  const rawMatches = Array.isArray(parsed?.matches) ? parsed!.matches : [];
  const cleanMatches: TelegramJobMatch[] = rawMatches
    .slice(0, maxMatches)
    .map((m): TelegramJobMatch => ({
      title: String(m?.title ?? "").slice(0, 300),
      company: m?.company ? String(m.company).slice(0, 200) : undefined,
      location: m?.location ? String(m.location).slice(0, 200) : undefined,
      channel: String(m?.channel ?? "").replace(/^@?/, "@").slice(0, 80),
      link: m?.link ? String(m.link).slice(0, 500) : undefined,
      snippet: String(m?.snippet ?? "").slice(0, 1000),
      postedAt: m?.postedAt ? String(m.postedAt).slice(0, 100) : undefined,
      language: m?.language ? String(m.language).slice(0, 20) : undefined,
      score: Math.max(0, Math.min(100, Number(m?.score) || 0)),
      tier: (["A", "B", "C"] as const).includes(m?.tier as JobMatchTier)
        ? (m!.tier as JobMatchTier)
        : "C",
      whyFit: String(m?.whyFit ?? "").slice(0, 800),
      skillGap: Array.isArray(m?.skillGap)
        ? m.skillGap.slice(0, 10).map((s) => String(s).slice(0, 80))
        : undefined,
    }))
    .sort((a, b) => {
      const tierOrder = { A: 0, B: 1, C: 2 } as const;
      const td = tierOrder[a.tier] - tierOrder[b.tier];
      if (td !== 0) return td;
      return b.score - a.score;
    });

  const stats: TelegramJobScanStats = {
    channelsScanned: Number(parsed?.stats?.channelsScanned) || fallbackChannelsScanned,
    channelsFailed: Number(parsed?.stats?.channelsFailed) || 0,
    messagesRead: Number(parsed?.stats?.messagesRead) || 0,
    matchesFound: cleanMatches.length,
    notes: parsed?.stats?.notes ? String(parsed.stats.notes).slice(0, 500) : undefined,
  };

  return {
    matches: cleanMatches,
    stats,
    rawOutput: parsed == null && outputText ? outputText.slice(0, 4000) : undefined,
  };
}

/**
 * Kick off the Telegram-jobs managed agent in background mode.
 * Returns an interaction handle in ~1-2s; the agent then runs on Google's infra.
 * Poll with `pollTelegramJobScan(handle.interactionId)` until phase is
 * `"completed"` or a terminal failure.
 */
export const startTelegramJobScan = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      apiKey: apiKeyInputSchema,
      profile: profileInputSchema,
      channels: z.array(telegramChannelSchema).min(1).max(5),
      messagesPerChannel: z.number().int().min(20).max(100).default(60),
      maxMatches: z.number().int().min(3).max(20).default(10),
      language: languageSchema.default("en"),
      targetRole: z.string().max(300).optional(),
      previousInteractionId: z.string().max(200).optional(),
      environmentId: z.string().max(200).optional(),
    }),
  )
  .handler(async ({ data }): Promise<TelegramJobScanHandle> => {
    const apiKey = await guardAiRequest("findTelegramJobs", data.apiKey, {
      max: 6,
      windowMs: 60 * 60 * 1000,
    });

    const channels = data.channels.map((handle) => handle.replace(/^@/, ""));
    const { systemInstruction, userInput } = buildTelegramAgentPrompts({
      profile: data.profile,
      channels,
      messagesPerChannel: data.messagesPerChannel,
      maxMatches: data.maxMatches,
      language: data.language,
      targetRole: data.targetRole,
    });

    const result = await callManagedAgent({
      apiKey,
      input: userInput,
      systemInstruction,
      environment: data.environmentId ?? "remote",
      previousInteractionId: data.previousInteractionId,
      background: true,
      timeoutMs: 25_000,
    });

    return {
      interactionId: result.interactionId,
      environmentId: result.environmentId,
      phase: mapAgentStatusToPhase(result.status),
    };
  });

/**
 * Poll a running Telegram-jobs scan started by `startTelegramJobScan`.
 * Returns the current phase; when phase is "completed", `matches` and `stats`
 * are populated. Each call finishes in ~1s so it fits inside any free-tier
 * serverless timeout.
 */
export const pollTelegramJobScan = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      apiKey: apiKeyInputSchema,
      interactionId: z.string().min(1).max(200),
      maxMatches: z.number().int().min(3).max(20).default(10),
      fallbackChannelsScanned: z.number().int().min(0).max(20).default(0),
    }),
  )
  .handler(async ({ data }): Promise<TelegramJobScanResult> => {
    // Lightweight rate limit — polling can happen many times per scan.
    const apiKey = await guardAiRequest("pollTelegramJobScan", data.apiKey, {
      max: 240,
      windowMs: 60 * 60 * 1000,
    });

    const status = await getManagedAgentInteraction({
      apiKey,
      interactionId: data.interactionId,
    });

    const phase = mapAgentStatusToPhase(status.status);

    if (phase !== "completed") {
      return {
        matches: [],
        stats: {
          channelsScanned: data.fallbackChannelsScanned,
          channelsFailed: 0,
          messagesRead: 0,
          matchesFound: 0,
        },
        interactionId: status.interactionId,
        environmentId: status.environmentId,
        phase,
      };
    }

    const parsed = parseTelegramAgentOutput(
      status.outputText,
      data.maxMatches,
      data.fallbackChannelsScanned,
    );

    return {
      matches: parsed.matches,
      stats: parsed.stats,
      interactionId: status.interactionId,
      environmentId: status.environmentId,
      phase,
      rawOutput: parsed.rawOutput,
    };
  });

/** Cancel a running Telegram-jobs scan. Best-effort; safe to call any time. */
export const cancelTelegramJobScan = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      apiKey: apiKeyInputSchema,
      interactionId: z.string().min(1).max(200),
    }),
  )
  .handler(async ({ data }): Promise<{ ok: true }> => {
    const apiKey = resolveGeminiApiKey(data.apiKey);
    await cancelManagedAgentInteraction({ apiKey, interactionId: data.interactionId });
    return { ok: true };
  });
