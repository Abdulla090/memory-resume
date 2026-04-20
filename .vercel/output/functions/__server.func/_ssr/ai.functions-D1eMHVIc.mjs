import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./index.mjs";
import { o as optimizeResumeForOnePage } from "./resume-utils-BBQwWAqL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as object, s as string, a as array, _ as _enum, b as any } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const DEFAULT_MODEL = "google/gemini-3.1-flash-lite-preview";
async function callGateway(opts) {
  let endpoint = GATEWAY_URL;
  let authKey = process.env.LOVABLE_API_KEY;
  let modelName = opts.model ?? DEFAULT_MODEL;
  if (opts.apiKey) {
    endpoint = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
    authKey = opts.apiKey;
    modelName = "gemini-3.1-flash-lite-preview";
  }
  if (!authKey) throw new Error("API Key is not configured");
  const body = {
    model: modelName,
    messages: opts.messages
  };
  if (opts.tools) body.tools = opts.tools;
  if (opts.toolChoice) body.tool_choice = opts.toolChoice;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    if (res.status === 429) {
      throw new Error("AI rate limit hit. Please wait a moment and try again.");
    }
    if (res.status === 402) {
      throw new Error("AI credits exhausted. Add credits in Settings → Workspace → Usage.");
    }
    const text = await res.text().catch(() => "");
    console.error("AI gateway error:", res.status, text);
    throw new Error(`AI gateway error (${res.status})`);
  }
  return res.json();
}
function extractToolArgs(json) {
  const call = json?.choices?.[0]?.message?.tool_calls?.[0];
  if (!call?.function?.arguments) {
    throw new Error("AI did not return structured output");
  }
  return JSON.parse(call.function.arguments);
}
function extractText(json) {
  return json?.choices?.[0]?.message?.content ?? "";
}
const profileSchema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    location: {
      type: "string"
    },
    email: {
      type: "string"
    },
    phone: {
      type: "string"
    },
    photoUrl: {
      type: "string"
    },
    languages: {
      type: "array",
      items: {
        type: "string"
      }
    },
    summary: {
      type: "string"
    },
    skills: {
      type: "object",
      properties: {
        technical: {
          type: "array",
          items: {
            type: "string"
          }
        },
        soft: {
          type: "array",
          items: {
            type: "string"
          }
        },
        tools: {
          type: "array",
          items: {
            type: "string"
          }
        },
        languages_spoken: {
          type: "array",
          items: {
            type: "string"
          }
        }
      },
      required: ["technical", "soft", "tools", "languages_spoken"]
    },
    experience: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: {
            type: "string"
          },
          company: {
            type: "string"
          },
          duration: {
            type: "string"
          },
          description: {
            type: "string"
          },
          achievements: {
            type: "array",
            items: {
              type: "string"
            }
          }
        },
        required: ["title", "company", "duration", "description", "achievements"]
      }
    },
    projects: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string"
          },
          description: {
            type: "string"
          },
          tech: {
            type: "array",
            items: {
              type: "string"
            }
          },
          impact: {
            type: "string"
          }
        },
        required: ["name", "description", "tech", "impact"]
      }
    },
    education: {
      type: "array",
      items: {
        type: "object",
        properties: {
          degree: {
            type: "string"
          },
          institution: {
            type: "string"
          },
          year: {
            type: "string"
          }
        },
        required: ["degree", "institution", "year"]
      }
    },
    certifications: {
      type: "array",
      items: {
        type: "string"
      }
    },
    careerGoals: {
      type: "string"
    },
    personalityTraits: {
      type: "array",
      items: {
        type: "string"
      }
    },
    industryExperience: {
      type: "array",
      items: {
        type: "string"
      }
    },
    inferredStrengths: {
      type: "array",
      items: {
        type: "string"
      }
    }
  },
  required: ["name", "location", "languages", "summary", "skills", "experience", "projects", "education", "certifications", "careerGoals", "personalityTraits", "industryExperience", "inferredStrengths"]
};
const parseMemory_createServerFn_handler = createServerRpc({
  id: "dbb32cc290c3284385b65fed8f41aeaed3fc4879a571067f87e6359594909413",
  name: "parseMemory",
  filename: "src/lib/ai.functions.ts"
}, (opts) => parseMemory.__executeServer(opts));
const parseMemory = createServerFn({
  method: "POST"
}).inputValidator(object({
  apiKey: string().optional(),
  memory: string().min(20).max(5e4)
})).handler(parseMemory_createServerFn_handler, async ({
  data
}) => {
  const json = await callGateway({
    apiKey: data.apiKey,
    messages: [{
      role: "system",
      content: "You are an expert career intelligence AI. The user has pasted their AI memory export — a raw dump of facts, experiences, skills, and life context. Extract a complete professional identity profile. Be thorough; infer reasonable details where appropriate but do not fabricate concrete facts (companies, dates, metrics)."
    }, {
      role: "user",
      content: data.memory
    }],
    tools: [{
      type: "function",
      function: {
        name: "save_profile",
        description: "Save the extracted professional identity profile.",
        parameters: profileSchema
      }
    }],
    toolChoice: {
      type: "function",
      function: {
        name: "save_profile"
      }
    }
  });
  const profile = extractToolArgs(json);
  return {
    profile
  };
});
const resumeSchema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    title: {
      type: "string"
    },
    email: {
      type: "string"
    },
    phone: {
      type: "string"
    },
    photoUrl: {
      type: "string"
    },
    location: {
      type: "string"
    },
    summary: {
      type: "string"
    },
    experience: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: {
            type: "string"
          },
          company: {
            type: "string"
          },
          duration: {
            type: "string"
          },
          description: {
            type: "string"
          },
          achievements: {
            type: "array",
            items: {
              type: "string"
            }
          }
        },
        required: ["title", "company", "duration", "description", "achievements"]
      }
    },
    projects: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string"
          },
          description: {
            type: "string"
          },
          tech: {
            type: "array",
            items: {
              type: "string"
            }
          },
          impact: {
            type: "string"
          }
        },
        required: ["name", "description", "tech", "impact"]
      }
    },
    education: {
      type: "array",
      items: {
        type: "object",
        properties: {
          degree: {
            type: "string"
          },
          institution: {
            type: "string"
          },
          year: {
            type: "string"
          }
        },
        required: ["degree", "institution", "year"]
      }
    },
    skills: {
      type: "array",
      items: {
        type: "string"
      }
    },
    certifications: {
      type: "array",
      items: {
        type: "string"
      }
    }
  },
  required: ["name", "title", "summary", "experience", "projects", "education", "skills", "certifications"]
};
const generateResume_createServerFn_handler = createServerRpc({
  id: "f795326b699c1d220517649fee5a4949a36221cc9ae67737cdf5167f7fd3864b",
  name: "generateResume",
  filename: "src/lib/ai.functions.ts"
}, (opts) => generateResume.__executeServer(opts));
const generateResume = createServerFn({
  method: "POST"
}).inputValidator(object({
  apiKey: string().optional(),
  profile: any(),
  jobTarget: string().min(2).max(5e3)
})).handler(generateResume_createServerFn_handler, async ({
  data
}) => {
  const json = await callGateway({
    apiKey: data.apiKey,
    messages: [{
      role: "system",
      content: "You are an elite resume writer and career strategist. You write resumes that get interviews at top companies. Every bullet must be achievement-oriented with metrics where possible, use strong action verbs, match keywords from the target role, and be honest but framed at maximum impact. Summary is 2-3 punchy sentences. ATS-optimized."
    }, {
      role: "user",
      content: `User profile (JSON):
${JSON.stringify(data.profile)}

Target role / job description:
${data.jobTarget}

Write a complete tailored resume for this exact role.`
    }],
    tools: [{
      type: "function",
      function: {
        name: "save_resume",
        description: "Save the tailored resume data.",
        parameters: resumeSchema
      }
    }],
    toolChoice: {
      type: "function",
      function: {
        name: "save_resume"
      }
    }
  });
  const resume = extractToolArgs(json);
  return {
    resume: optimizeResumeForOnePage(resume)
  };
});
const followUpQuestionsSchema = {
  type: "object",
  properties: {
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          field: {
            type: "string"
          },
          question: {
            type: "string"
          },
          helperText: {
            type: "string"
          },
          inputType: {
            type: "string",
            enum: ["text", "select"]
          },
          options: {
            type: "array",
            items: {
              type: "string"
            }
          },
          placeholder: {
            type: "string"
          }
        },
        required: ["id", "field", "question", "helperText", "inputType", "options"]
      }
    }
  },
  required: ["questions"]
};
const profileWithPhotoSchema = {
  ...profileSchema,
  properties: {
    ...profileSchema.properties,
    photoUrl: {
      type: "string"
    }
  }
};
const suggestFollowUpQuestions_createServerFn_handler = createServerRpc({
  id: "7e2bff48ee3e2c36279db8965a21df5962a27efe76541f787ad6c5118d6b41b6",
  name: "suggestFollowUpQuestions",
  filename: "src/lib/ai.functions.ts"
}, (opts) => suggestFollowUpQuestions.__executeServer(opts));
const suggestFollowUpQuestions = createServerFn({
  method: "POST"
}).inputValidator(object({
  apiKey: string().optional(),
  profile: any()
})).handler(suggestFollowUpQuestions_createServerFn_handler, async ({
  data
}) => {
  const json = await callGateway({
    apiKey: data.apiKey,
    messages: [{
      role: "system",
      content: "You are a career intake assistant. Review this extracted profile and identify missing, unclear, or weak resume-critical information. Ask at most 4 short, high-value follow-up questions. Use select inputs when you can offer strong options. Use text input when the answer must be free-form. Do not ask for information already clearly present. Prioritize current title, contact details, location clarity, career target, strongest achievements, portfolio/photo, and missing education or project context."
    }, {
      role: "user",
      content: `Profile:
${JSON.stringify(data.profile)}`
    }],
    tools: [{
      type: "function",
      function: {
        name: "save_follow_up_questions",
        description: "Save the follow-up questions needed to complete the profile.",
        parameters: followUpQuestionsSchema
      }
    }],
    toolChoice: {
      type: "function",
      function: {
        name: "save_follow_up_questions"
      }
    }
  });
  const {
    questions
  } = extractToolArgs(json);
  return {
    questions: questions.slice(0, 4)
  };
});
const applyFollowUpAnswers_createServerFn_handler = createServerRpc({
  id: "d7b1bbd3298f1a808aebef6ff6150ef93c543a4fb232b6bea173f4b714366398",
  name: "applyFollowUpAnswers",
  filename: "src/lib/ai.functions.ts"
}, (opts) => applyFollowUpAnswers.__executeServer(opts));
const applyFollowUpAnswers = createServerFn({
  method: "POST"
}).inputValidator(object({
  apiKey: string().optional(),
  profile: any(),
  answers: array(object({
    questionId: string(),
    field: string(),
    answer: string()
  }))
})).handler(applyFollowUpAnswers_createServerFn_handler, async ({
  data
}) => {
  const json = await callGateway({
    apiKey: data.apiKey,
    messages: [{
      role: "system",
      content: "You are a career profile completion assistant. Update the existing profile using the user's follow-up answers. Preserve all confirmed facts, fill missing fields from the answers, and improve the profile summary only when the new information materially helps. Never invent companies, dates, metrics, or credentials. If a photo URL is provided, store it in photoUrl."
    }, {
      role: "user",
      content: `Existing profile:
${JSON.stringify(data.profile)}

Follow-up answers:
${JSON.stringify(data.answers)}`
    }],
    tools: [{
      type: "function",
      function: {
        name: "save_completed_profile",
        description: "Save the completed profile after applying follow-up answers.",
        parameters: profileWithPhotoSchema
      }
    }],
    toolChoice: {
      type: "function",
      function: {
        name: "save_completed_profile"
      }
    }
  });
  return {
    profile: extractToolArgs(json)
  };
});
const improveBullet_createServerFn_handler = createServerRpc({
  id: "780bac92f4bd76d017925d809cd8e1798400c2f387c70bb5fdbbea8f4645e906",
  name: "improveBullet",
  filename: "src/lib/ai.functions.ts"
}, (opts) => improveBullet.__executeServer(opts));
const improveBullet = createServerFn({
  method: "POST"
}).inputValidator(object({
  apiKey: string().optional(),
  bullet: string().min(2).max(2e3),
  jobTitle: string().max(200).optional(),
  mode: _enum(["impact", "technical", "quantify", "concise"]).default("impact")
})).handler(improveBullet_createServerFn_handler, async ({
  data
}) => {
  const modeMap = {
    impact: "Make it more impactful and achievement-oriented.",
    technical: "Make it more technical and specific.",
    quantify: "Add plausible metrics if inferable; otherwise sharpen specificity.",
    concise: "Make it more concise — under 18 words."
  };
  const json = await callGateway({
    apiKey: data.apiKey,
    messages: [{
      role: "system",
      content: `You rewrite resume bullets. Use strong action verbs, keep under 2 lines. ${modeMap[data.mode]} Return ONLY the improved bullet, no quotes, no explanation.`
    }, {
      role: "user",
      content: `Original: ${data.bullet}
Context role: ${data.jobTitle ?? "N/A"}`
    }]
  });
  return {
    bullet: extractText(json).trim().replace(/^["']|["']$/g, "")
  };
});
const careerPathsSchema = {
  type: "object",
  properties: {
    paths: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: {
            type: "string"
          },
          matchScore: {
            type: "number"
          },
          whyFit: {
            type: "string"
          },
          skillGaps: {
            type: "array",
            items: {
              type: "string"
            }
          },
          salaryRange: {
            type: "string"
          },
          timeToTransition: {
            type: "string"
          }
        },
        required: ["title", "matchScore", "whyFit", "skillGaps", "salaryRange", "timeToTransition"]
      }
    }
  },
  required: ["paths"]
};
const suggestCareerPaths_createServerFn_handler = createServerRpc({
  id: "227ee91be8b92a0fb0f252de125c3605d7d7e16f11da75e09df0b3a034a4b999",
  name: "suggestCareerPaths",
  filename: "src/lib/ai.functions.ts"
}, (opts) => suggestCareerPaths.__executeServer(opts));
const suggestCareerPaths = createServerFn({
  method: "POST"
}).inputValidator(object({
  apiKey: string().optional(),
  profile: any()
})).handler(suggestCareerPaths_createServerFn_handler, async ({
  data
}) => {
  const json = await callGateway({
    apiKey: data.apiKey,
    messages: [{
      role: "system",
      content: "You are a career strategist. Suggest the 6 most realistic, high-potential career paths for this person. Match scores 0-100. Salary in USD ranges. Be specific."
    }, {
      role: "user",
      content: `Profile:
${JSON.stringify(data.profile)}`
    }],
    tools: [{
      type: "function",
      function: {
        name: "save_career_paths",
        description: "Save the 6 career path suggestions.",
        parameters: careerPathsSchema
      }
    }],
    toolChoice: {
      type: "function",
      function: {
        name: "save_career_paths"
      }
    }
  });
  return extractToolArgs(json);
});
const tailorToJob_createServerFn_handler = createServerRpc({
  id: "1162af18a42f876cf63c90b0d0b59d4071609b74c49e713518ce4c7bbb54c6f1",
  name: "tailorToJob",
  filename: "src/lib/ai.functions.ts"
}, (opts) => tailorToJob.__executeServer(opts));
const tailorToJob = createServerFn({
  method: "POST"
}).inputValidator(object({
  apiKey: string().optional(),
  resume: any(),
  jobDescription: string().min(20).max(1e4)
})).handler(tailorToJob_createServerFn_handler, async ({
  data
}) => {
  const json = await callGateway({
    apiKey: data.apiKey,
    messages: [{
      role: "system",
      content: "You rewrite an existing resume to be laser-targeted to the provided job description. Reorder, rephrase, surface relevant keywords. Do not invent companies, dates, or metrics. Keep structure identical."
    }, {
      role: "user",
      content: `Existing resume:
${JSON.stringify(data.resume)}

Job description:
${data.jobDescription}`
    }],
    tools: [{
      type: "function",
      function: {
        name: "save_resume",
        description: "Save the tailored resume.",
        parameters: resumeSchema
      }
    }],
    toolChoice: {
      type: "function",
      function: {
        name: "save_resume"
      }
    }
  });
  return {
    resume: optimizeResumeForOnePage(extractToolArgs(json))
  };
});
export {
  applyFollowUpAnswers_createServerFn_handler,
  generateResume_createServerFn_handler,
  improveBullet_createServerFn_handler,
  parseMemory_createServerFn_handler,
  suggestCareerPaths_createServerFn_handler,
  suggestFollowUpQuestions_createServerFn_handler,
  tailorToJob_createServerFn_handler
};
