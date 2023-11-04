const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
	transpileDependencies: true,
	filenameHashing: false,
	devServer: {
		allowedHosts: 'all',
		// https: true,
	},
});
