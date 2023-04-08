/* eslint-env node */

require("@uniswap/eslint-config/load");

module.exports = {
  extends: ["@uniswap/eslint-config/react", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }], // enforce a consistent line ending style
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            paths: [
              {
                name: "zustand",
                importNames: ["default"],
                message:
                  "Default import from zustand is deprecated. Import `{ create }` instead.",
              },
            ],
          },
        ],
      },
    },
  ],
};
