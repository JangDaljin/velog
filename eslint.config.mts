import Eslint from "@eslint/js";
import { TSESLint } from "@typescript-eslint/utils";
import PrettierConfig from "eslint-config-prettier";
import PrettierPluginRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import TsEsLint from "typescript-eslint";

export default TsEsLint.config({
  extends: [
    Eslint.configs.recommended,
    ...TsEsLint.configs.strict,
    ...TsEsLint.configs.stylistic,
    PrettierConfig,
    PrettierPluginRecommended,
  ],
  plugins: {
    "@typescript-eslint": TsEsLint.plugin,
  },
  languageOptions: {
    parser: TsEsLint.parser,
    parserOptions: {
      projectService: true,
    },
    globals: {
      ...globals.node,
    },
  },
  rules: {
    "no-console": ["warn"],

    //데코레이터 있는 class 허용
    "@typescript-eslint/no-extraneous-class": [
      "error",
      {
        allowWithDecorator: true,
      },
    ],
  },
  files: ["src/**/*.ts"],
}) satisfies TSESLint.FlatConfig.ConfigArray;
