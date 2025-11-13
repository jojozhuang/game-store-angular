import { defineConfig, globalIgnores } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores([
    "projects/**/*",
    ".angular/*",
    "dist/*",
    "e2e/*",
    "coverage/*",
    "node_modules/*",
    "**/*.spec.ts",
    "**/typings.d.ts",
    "cypress/*",
]), {
    files: ["**/*.ts"],

    extends: compat.extends(
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:prettier/recommended",
    ),

    languageOptions: {
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: ["tsconfig.json", "e2e/tsconfig.json"],
            createDefaultProgram: true,
        },
    },

    rules: {
        "@angular-eslint/component-selector": ["error", {
            type: "element",
            prefix: ["app", "widget"],
            style: "kebab-case",
        }],

        "@angular-eslint/directive-selector": ["error", {
            type: "attribute",
            prefix: "ng",
            style: "camelCase",
        }],
        "@angular-eslint/prefer-standalone": "off",
        "@typescript-eslint/unbound-method": ["error", {
            ignoreStatic: true,
        }],

        "no-console": 2,
    },
}, {
    files: ["**/*.html"],

    extends: compat.extends(
        "plugin:@angular-eslint/template/recommended",
        "plugin:prettier/recommended",
    ),

    rules: {},
}]);