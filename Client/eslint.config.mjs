import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import stylistic from '@stylistic/eslint-plugin'

export default [
    { plugins: { '@stylistic': stylistic }, files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], rules: { '@stylistic/indent': ['error', 4] }, ignores: [".next/**"] },
    { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
    { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReactConfig,
];
