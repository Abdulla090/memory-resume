import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type {
  CareerPath,
  FollowUpQuestion,
  Profile,
  ResumeData,
} from "./types";
import { optimizeResumeForOnePage } from "./resume-utils";

const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
const DEFAULT_MODEL = "gemini-3.1-flash-lite-preview";

interface GatewayMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ToolDef {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

async function callGateway(opts: {
  messages: GatewayMessage[];
  tools?: ToolDef[];
  toolChoice?: { type: "function"; function: { name: string } };
  model?: string;
  apiKey?: string;
}) {
  const authKey = opts.apiKey ?? process.env.GEMINI_API_KEY;
  const modelName = opts.model ?? DEFAULT_MODEL;

  if (!authKey) throw new Error('No Gemini API key configured. Add your key in Settings.');

  const body: Record<string, unknown> = { model: modelName, messages: opts.messages };
  if (opts.tools) body.tools = opts.tools;
  if (opts.toolChoice) body.tool_choice = opts.toolChoice;

  const res = await fetch(GEMINI_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + authKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    if (res.status === 429) throw new Error('Gemini rate limit hit. Please wait and try again.');
    if (res.status === 401 || res.status === 403) throw new Error('Invalid Gemini API key. Check your key in Settings.');
    const text = await res.text().catch(() => '');
    console.error('Gemini API error:', res.status, text);
    throw new Error('Gemini API error (' + res.status + ')');
  }

  return res.json();
}

function extractToolArgs<T>(json: any): T {
  const call = json?.choices?.[0]?.message?.tool_calls?.[0];
  if (!call?.function?.arguments) {
    throw new Error("AI did not return structured output");
  }
  return JSON.parse(call.function.arguments) as T;
}

function extractText(json: any): string {
  return json?.choices?.[0]?.message?.content ?? "";
}

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
    z.object({ apiKey: z.string().optional(), 
      memory: z.string().min(20).max(50000),
    }),
  )
  .handler(async ({ data }): Promise<{ profile: Profile }> => {
    const json = await callGateway({ apiKey: data.apiKey, 
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
      apiKey: z.string().optional(),
      profile: z.any(),
      rawMemory: z.string(),
    }),
  )
  .handler(async ({ data }): Promise<{ questions: import("./types").FollowUpQuestion[]; isComplete: boolean }> => {
    const profileStr = JSON.stringify(data.profile);
    const json = await callGateway({
      apiKey: data.apiKey,
      messages: [
        {
          role: "system",
          content: `You are a career coach AI helping a user build their resume. You have already extracted a profile from their raw memory, but some fields may be missing or weak. Analyze the profile for gaps and generate smart, friendly follow-up questions to fill those gaps. Focus on the most impactful missing pieces first. Each question must have relevant quick-pick options the user can tap, plus allow custom text input. Return at most 6 questions. If the profile is complete enough (all critical fields filled), return isComplete: true and an empty questions array.

Critical fields: name, email/phone contact, at least 1 experience with achievements, education, skills.
Good-to-have: location, career goals, certifications, projects.

Important: If the user hasn't provided a profile photo, always include one question asking them if they'd like to upload a professional photo (mention they can use the attachment button next to the input). Make this optional.`,
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
            name: "return_questions",
            description: "Return follow-up questions to fill profile gaps",
            parameters: {
              type: "object",
              properties: {
                isComplete: { type: "boolean", description: "True if profile has enough info to generate a good resume" },
                questions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      field: { type: "string", description: "Which profile field this fills, e.g. 'email', 'experience[0].achievements'" },
                      question: { type: "string", description: "The friendly question to ask the user" },
                      helperText: { type: "string", description: "One sentence explaining why this matters" },
                      inputType: { type: "string", enum: ["text", "select", "multiselect"] },
                      options: { type: "array", items: { type: "string" }, description: "Quick-pick options the user can tap. Empty for free text only." },
                      placeholder: { type: "string" },
                    },
                    required: ["id", "field", "question", "helperText", "inputType", "options"],
                  },
                },
              },
              required: ["isComplete", "questions"],
            },
          },
        },
      ],
      toolChoice: { type: "function", function: { name: "return_questions" } },
    });
    const result = extractToolArgs<{ isComplete: boolean; questions: import("./types").FollowUpQuestion[] }>(json);
    return result;
  });

// ───────────────── patchProfileWithAnswers ─────────────────

export const patchProfileWithAnswers = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      apiKey: z.string().optional(),
      profile: z.any(),
      answers: z.array(z.object({ questionId: z.string(), field: z.string(), answer: z.string() })),
    }),
  )
  .handler(async ({ data }): Promise<{ profile: import("./types").Profile }> => {
    const json = await callGateway({
      apiKey: data.apiKey,
      messages: [
        {
          role: "system",
          content: "You are a profile merge AI. Given an existing profile JSON and a set of user answers to follow-up questions, merge the answers into the profile and return the updated complete profile JSON. Preserve all existing data; only add/update fields based on the answers.",
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
    certifications: { type: "array", items: { type: "string" } },
  },
  required: [
    "name",
    "title",
    "summary",
    "experience",
    "projects",
    "education",
    "skills",
    "certifications",
  ],
};

export const generateResume = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({ apiKey: z.string().optional(), 
      profile: z.any(),
      jobTarget: z.string().min(2).max(5000),
    }),
  )
  .handler(async ({ data }): Promise<{ resume: ResumeData }> => {
    const json = await callGateway({ apiKey: data.apiKey, 
      messages: [
        {
          role: "system",
          content:
            "You are an elite resume writer and career strategist. You write resumes that get interviews at top companies. Every bullet must be achievement-oriented with metrics where possible, use strong action verbs, match keywords from the target role, and be honest but framed at maximum impact. Summary is 2-3 punchy sentences. ATS-optimized.",
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
      apiKey: z.string().optional(),
      resume: z.any(),
      userMessage: z.string().min(1).max(2000),
    }),
  )
  .handler(async ({ data }): Promise<{ resume: ResumeData; reply: string }> => {
    const json = await callGateway({
      apiKey: data.apiKey,
      messages: [
        {
          role: "system",
          content:
            "You are an elite resume editor and AI assistant. The user will provide their current resume data (in JSON) and a message detailing what changes they want. You must output the fully updated resume data reflecting these changes using the save_resume tool. You must also provide a brief reply confirming what you changed.",
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
                reply: { type: "string", description: "A brief message (1-2 sentences) confirming the changes made to the user." }
              },
              required: ["resume", "reply"]
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
  .inputValidator(z.object({ apiKey: z.string().optional(),  profile: z.any() }))
  .handler(async ({ data }): Promise<{ questions: FollowUpQuestion[] }> => {
    const json = await callGateway({ apiKey: data.apiKey, 
      messages: [
        {
          role: "system",
          content:
            "You are a career intake assistant. Review this extracted profile and identify missing, unclear, or weak resume-critical information. Ask at most 4 short, high-value follow-up questions. Use select inputs when you can offer strong options. Use text input when the answer must be free-form. Do not ask for information already clearly present. Prioritize current title, contact details, location clarity, career target, strongest achievements, portfolio/photo, and missing education or project context.",
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
    return { questions: questions.slice(0, 4) };
  });

export const applyFollowUpAnswers = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({ apiKey: z.string().optional(), 
      profile: z.any(),
      answers: z.array(
        z.object({ 
          questionId: z.string(),
          field: z.string(),
          answer: z.string(),
        }),
      ),
    }),
  )
  .handler(async ({ data }): Promise<{ profile: Profile }> => {
    const json = await callGateway({ apiKey: data.apiKey, 
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
    z.object({ apiKey: z.string().optional(), 
      bullet: z.string().min(2).max(2000),
      jobTitle: z.string().max(200).optional(),
      mode: z.enum(["impact", "technical", "quantify", "concise"]).default("impact"),
    }),
  )
  .handler(async ({ data }): Promise<{ bullet: string }> => {
    const modeMap: Record<string, string> = {
      impact: "Make it more impactful and achievement-oriented.",
      technical: "Make it more technical and specific.",
      quantify: "Add plausible metrics if inferable; otherwise sharpen specificity.",
      concise: "Make it more concise — under 18 words.",
    };
    const json = await callGateway({ apiKey: data.apiKey, 
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
    return { bullet: extractText(json).trim().replace(/^["']|["']$/g, "") };
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
        required: [
          "title",
          "matchScore",
          "whyFit",
          "skillGaps",
          "salaryRange",
          "timeToTransition",
        ],
      },
    },
  },
  required: ["paths"],
};

export const suggestCareerPaths = createServerFn({ method: "POST" })
  .inputValidator(z.object({ apiKey: z.string().optional(),  profile: z.any() }))
  .handler(async ({ data }): Promise<{ paths: CareerPath[] }> => {
    const json = await callGateway({ apiKey: data.apiKey, 
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
    z.object({ apiKey: z.string().optional(), 
      resume: z.any(),
      jobDescription: z.string().min(20).max(10000),
    }),
  )
  .handler(async ({ data }): Promise<{ resume: ResumeData }> => {
    const json = await callGateway({ apiKey: data.apiKey, 
      messages: [
        {
          role: "system",
          content:
            "You rewrite an existing resume to be laser-targeted to the provided job description. Reorder, rephrase, surface relevant keywords. Do not invent companies, dates, or metrics. Keep structure identical.",
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
