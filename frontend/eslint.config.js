import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
	globalIgnores(['dist']),
	{
		files: ['**/*.{js,jsx}'],
		plugins: {
			'@stylistic': stylistic,
		},
		rules: {
			'@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
			'@stylistic/jsx-quotes': ['error', 'prefer-double'],
			'@stylistic/semi': ['error', 'always'],
			'@stylistic/max-len': ['warn', {
				code: 80,
				ignoreUrls: true,
			}],
		},
		extends: [
			js.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
		],
		languageOptions: {
			globals: globals.browser,
			parserOptions: { ecmaFeatures: { jsx: true } },
		},
	},
]);
