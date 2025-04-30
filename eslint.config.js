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
    env: {
      browser: true, // 启用浏览器全局变量（window, document 等）
    },
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
      "html-indent": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "vue/require-default-prop": "off",
    },
  }
);
