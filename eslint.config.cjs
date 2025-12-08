module.exports = [
	// ignore build / deps
	{ ignores: ['node_modules/**', 'dist/**'] },

	// apply to project source files
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			// provide the parser module, not its name string
			parser: require('@typescript-eslint/parser'),
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				ecmaFeatures: { jsx: true },
			},
		},
		plugins: {
			'@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
			react: require('eslint-plugin-react'),
			'react-hooks': require('eslint-plugin-react-hooks'),
		},
		settings: { react: { version: 'detect' } },
		rules: {
			// adjust as you prefer
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
		},
	},
];
