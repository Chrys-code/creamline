import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], 
    plugins: { 
      js, 
      reactHooks, 
      reactRefresh,
    }, 
    extends: ["js/recommended", prettier], 
    languageOptions: { ecmaVersion: 2022, globals: globals.browser } 
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
		rules: {
      eqeqeq: ["warn"],
      "no-unused-vars": [
        "warn",
        { "args": "after-used", "argsIgnorePattern": "^_", "ignoreRestSiblings": true }
      ],
			"no-undef": "warn",
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "warn"
		},
	},
]);
