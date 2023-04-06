export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-70bc2959","v-d440f426","v-884a0bbc","v-7dde1cb8","v-748f66d5","v-7dde1cd7","v-65c9fb08","v-7dde2114","v-7dde4a5f","v-21ba2ec8","v-2921a50f","v-e0b06004","v-5adb4bb0","v-673af10a","v-16722c46","v-6cec0ebc","v-4c274696","v-03c5c12d","v-6ce7b6da","v-48579df1","v-594b2522","v-5e01a32b","v-a94b64b0","v-004e2d72","v-66839488","v-a28a27e0","v-71afee22","v-56c36d18"]}},"star":{"/":{"path":"/star/","keys":[]}},"timeline":{"/":{"path":"/timeline/","keys":[]}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
  });

