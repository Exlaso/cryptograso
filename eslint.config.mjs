import antfu from "@antfu/eslint-config";

export default antfu({
  type: "app",
  react: true,
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },
}, {
  rules: {
    "@typescript-eslint/no-redeclare": "off",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "no-console": "off",
    "antfu/no-top-level-await": "off",
    "node/prefer-global/process": "off",
    "react/no-context-provider": "off",
    "react/no-nested-component-definitions": "off",
    "perfectionist/sort-imports": ["error", {
      order: "asc",
      type: "natural",
      groups: [["builtin", "external", "internal"]],
    }],
  },
});
