/** @type {import('stylelint').Config} */
export default {
  extends: "stylelint-config-recommended-vue",
  overrides: [
    {
      files: ["*.vue", "**/*.vue"],
      rules: {
        "unit-allowed-list": ["px", "em", "s", "vh", "rem", "%","vw"],
        "no-empty-source": null,
      },
    },
  ],
};
