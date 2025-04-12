/** @type {import('stylelint').Config} */
export default {
  extends: "stylelint-config-recommended-vue",
  rules: {
    "unit-allowed-list": true,
  },
  overrides: [
    {
      files: ["*.vue", "**/*.vue"],
      rules: {
        "unit-allowed-list": ["px", "rem", "s"],
      },
    },
  ],
};
