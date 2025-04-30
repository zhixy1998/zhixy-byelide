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
import globals from "globals";
export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...eslintPluginVue.configs["flat/recommended"],
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // 对所有文件生效
      "vue/require-default-prop": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  }, //对所有文件生效
  {
    files: ["*.vue", "**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
      globals: {
        ...globals.browser, // 替换原来的 env: { browser: true }
        ...globals.node, // 替换原来的 env: { node: true }
      },
    },
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "vue/require-default-prop": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  }
);
