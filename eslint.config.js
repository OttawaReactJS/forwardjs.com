import globals from "globals";
import pluginJs from "@eslint/js";
import pluginAstro from "eslint-plugin-astro";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        id: "readonly",
        dateTime: "readonly",
      },
    },
  },
  pluginJs.configs.recommended,
  ...pluginAstro.configs.recommended,
  {
    ignores: [".astro", "dist"],
  },
];
