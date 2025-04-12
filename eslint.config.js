// import eslint from "@eslint/js";
// import tseslint from "typescript-eslint";

// export default tseslint.config(
//   eslint.configs.recommended,
//   ...tseslint.configs.recommended,
// )

import js from "@eslint/js";
import eslintPluginVue from "eslint-plugin-vue";
import ts from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...eslintPluginVue.configs["flat/recommended"],
  {
    files: ["*.vue", "**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  }
);
