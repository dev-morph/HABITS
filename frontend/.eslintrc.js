module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/typescript/recommended', 'prettier'],
	parser: 'vue-eslint-parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2022,
		ecmaFeatures: {
			globalReturn: false,
			impliedStrict: false,
			jsx: false,
		},
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'vue/multi-word-component-names': 'off',
		'no-unused-vars': 'off',
	},
};
