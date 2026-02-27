import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import {defineConfig} from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        plugins: {js},
        extends: ["js/recommended"],
        languageOptions: {globals: globals.node},
        ignores: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/package-lock.json"],
    },
    tseslint.configs.recommended,
    {
        files: ["**/*.json"],
        plugins: {json},
        language: "json/json",
        extends: ["json/recommended"],
        ignores: ["**/node_modules/**", "**/dist/**", "**/build/**", "package-lock.json"]
    },
]);
