import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default defineConfig([
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "**/*-backup.*",
      "**/*.exp*-backup",
      "upload-to-atlas.js"
    ]
  },
  {
    files: ["**/*.{js,jsx}"],
    ...js.configs.recommended,
    languageOptions: {
      ...js.configs.recommended.languageOptions,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  {
    files: ["main.js", "main.jsx", "src/**/*.{js,jsx}"],
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    files: ["src/**/*.{jsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },
    rules: {
      ...reactHooks.configs.flat.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ]
    }
  },
  {
    files: ["backend/**/*.js"],
    languageOptions: {
      globals: globals.node
    },
    rules: {
      "no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        caughtErrors: "none"
      }]
    }
  }
]);
