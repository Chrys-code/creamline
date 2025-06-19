import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      eqeqeq: ["error", "always"],
			"react/react-in-jsx-scope": "off",
			"@typescript-eslint/no-empty-interface": "off",
			"@stylistic/indent": ["warn", "tab"],
			"@typescript-eslint/no-explicit-any": "warn",
			"linebreak-style": ["error", "unix"],
      "no-empty-pattern": "off",
			"react-hooks/exhaustive-deps": "warn",
    },
  },
)
