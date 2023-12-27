module.exports = {
	env: {
		browser: true,
		es2022: true,
		node: true,
		jest: true,
	},
	settings: {
		react: {
			version: '18.2.0',
		},
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'plugin:@next/next/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	ignorePatterns: ['.next', '.swc', '.turbo', 'node_modules', 'out', 'dist', 'public', '__*'],
	plugins: ['@typescript-eslint', 'jest', 'import'],
	rules: {
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_', varsIgnorePattern: '^_' },
		],
		'import/order': [
			'error',
			{
				'newlines-between': 'always',
				pathGroups: [
					{
						pattern: '~/**',
						group: 'parent',
					},
				],
				pathGroupsExcludedImportTypes: [],
				groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
			},
		],
		indent: ['off', 'tab'],
		'linebreak-style': ['error', 'unix'],
		semi: ['error', 'always'],
		'no-empty-function': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@next/next/no-img-element': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'react/no-unknown-property': [2, { ignore: ['jsx', 'global'] }],
	},
};
