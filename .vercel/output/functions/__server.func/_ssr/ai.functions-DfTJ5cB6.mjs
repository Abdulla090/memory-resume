import { r as reactExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { l as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./index.mjs";
import { o as object, s as string, b as any, _ as _enum, a as array } from "../_libs/zod.mjs";
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const parseMemory = createServerFn({
  method: "POST"
}).inputValidator(object({
  apiKey: string().optional(),
  memory: string().min(20).max(5e4)
})).handler(createSsrRpc("dbb32cc290c3284385b65fed8f41aeaed3fc4879a571067f87e6359594909413"));
const getFollowUpQuestions = createServerFn({
  method: "POST"
}).inputValidator(object({
  apiKey: string().optional(),
  profile: any(),
  rawMemory: string()
})).handler(createSsrRpc("3a1982be35adca2338b054bcd959f47c33abe8f4400d4ae0fdb6ebd7d5f96019"));
const patchProfileWithAnswers = createServerFn({
  method: "POST"
}).inputValidator(object({
  apiKey: string().optional(),
  profile: any(),
  answers: array(object({
    questionId: string(),
    field: string(),
    answer: string()
  }))
})).handler(createSsrRpc("ab8d9e1d698d4300df9f0bf7927e37f0f327ce394c206fc5ca59eb833e126efa"));
const generateResume = createServerFn({
  method: "POST"
}).inputValidator(object({
  apiKey: string().optional(),
  profile: any(),
  jobTarget: string().min(2).max(5e3)
})).handler(createSsrRpc("f795326b699c1d220517649fee5a4949a36221cc9ae67737cdf5167f7fd3864b"));
const chatEditResume = createServerFn({
  method: "POST"
}).inputValidator(object({
  apiKey: string().optional(),
  resume: any(),
  userMessage: string().min(1).max(2e3)
})).handler(createSsrRpc("83a99bd00f312255f1fa4387e6d2db8731d02727defa44cfeeb9059d9edb73ec"));
createServerFn({
  method: "POST"
}).inputValidator(object({
  apiKey: string().optional(),
  profile: any()
})).handler(createSsrRpc("7e2bff48ee3e2c36279db8965a21df5962a27efe76541f787ad6c5118d6b41b6"));
createServerFn({
  method: "POST"
}).inputValidator(object({
  apiKey: string().optional(),
  profile: any(),
  answers: array(object({
    questionId: string(),
    field: string(),
    answer: string()
  }))
})).handler(createSsrRpc("d7b1bbd3298f1a808aebef6ff6150ef93c543a4fb232b6bea173f4b714366398"));
const improveBullet = createServerFn({
  method: "POST"
}).inputValidator(object({
  apiKey: string().optional(),
  bullet: string().min(2).max(2e3),
  jobTitle: string().max(200).optional(),
  mode: _enum(["impact", "technical", "quantify", "concise"]).default("impact")
})).handler(createSsrRpc("780bac92f4bd76d017925d809cd8e1798400c2f387c70bb5fdbbea8f4645e906"));
createServerFn({
  method: "POST"
}).inputValidator(object({
  apiKey: string().optional(),
  profile: any()
})).handler(createSsrRpc("227ee91be8b92a0fb0f252de125c3605d7d7e16f11da75e09df0b3a034a4b999"));
const tailorToJob = createServerFn({
  method: "POST"
}).inputValidator(object({
  apiKey: string().optional(),
  resume: any(),
  jobDescription: string().min(20).max(1e4)
})).handler(createSsrRpc("1162af18a42f876cf63c90b0d0b59d4071609b74c49e713518ce4c7bbb54c6f1"));
export {
  generateResume as a,
  patchProfileWithAnswers as b,
  chatEditResume as c,
  getFollowUpQuestions as g,
  improveBullet as i,
  parseMemory as p,
  tailorToJob as t,
  useServerFn as u
};
