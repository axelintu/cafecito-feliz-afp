import js from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	{
		files: ['**/*.js'],
		plugins: {
			'@stylistic': stylistic,
		},
		extends: [js.configs.recommended],
		languageOptions: {
			globals: globals.node,
		},
		rules: {
			'@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
			'@stylistic/semi': ['error', 'always'],
			'@stylistic/max-len': ['warn', {
				code: 80,
				ignoreUrls: true,
			}],
		},
	},
]);
