const paths = require('react-scripts/config/paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Export
module.exports = {
	webpack: override
};


function override(config, env) {
	
    // Entry
	config.entry = {
		popup: paths.appIndexJs,
		options: paths.appSrc + '/options.js',
		background: paths.appSrc + '/background.js',
		content: paths.appSrc + '/content.js'
	};
	
    // Config
	config.output.filename = 'static/js/[name].js';
    config.optimization.runtimeChunk = false;
	config.optimization.splitChunks = {
        cacheGroups: {default: false}
	};
    
	// Option
    const isEnvProduction = env === 'production';
	const minifyOpts = {
		removeComments: true,
		collapseWhitespace: true,
		removeRedundantAttributes: true,
		useShortDoctype: true,
		removeEmptyAttributes: true,
		removeStyleLinkTypeAttributes: true,
		keepClosingSlash: true,
		minifyJS: true,
		minifyCSS: true,
		minifyURLs: true,
	};
	
	
    /**
     * Custom HtmlWebpackPlugin
     * Instance : Popup.js
     * 
     */
	const indexHtmlPlugin = new HtmlWebpackPlugin({
		inject: true,
		chunks: ['popup'],
		template: paths.appHtml,
		filename: 'popup.html',
		minify: isEnvProduction && minifyOpts,
	});

	config.plugins = replacePlugin(config.plugins,
		(name) => /HtmlWebpackPlugin/i.test(name), indexHtmlPlugin
	);



	/**
     * Custom HtmlWebpackPlugin
     * Instance : Option.js
     * 
     */
	const optionsHtmlPlugin = new HtmlWebpackPlugin({
		inject: true,
		chunks: ['options'],
		template: paths.appPublic + '/options.html',
		filename: 'options.html',
		minify: isEnvProduction && minifyOpts,
	});
	config.plugins.push(optionsHtmlPlugin);



    /**
     * Custom ManifestPlugin
     * Instance : Manifast.json
     * 
     */
	const manifestPlugin = new ManifestPlugin({
		fileName: 'asset-manifest.json',
	});
	config.plugins = replacePlugin(config.plugins,
		(name) => /ManifestPlugin/i.test(name), manifestPlugin
	);



    /**
     * Custom MiniCssExtractPlugin
     * Instance : ./css
     * 
     */
	const miniCssExtractPlugin = new MiniCssExtractPlugin({
		filename: 'static/css/[name].css'
	});
	// Replace origin MiniCssExtractPlugin instance in config.plugins with the above one
	config.plugins = replacePlugin(config.plugins,
		(name) => /MiniCssExtractPlugin/i.test(name), miniCssExtractPlugin
	);



    /**
     * Custom GenerateSW
     * Instance : config.plugins
     * 
     */
	config.plugins = replacePlugin(config.plugins,
		(name) => /GenerateSW/i.test(name)
	);

	return config;
}



// Utility Function 
// Replace & Remove Plugin in a Webpack Config
function replacePlugin(plugins, nameMatcher, newPlugin) {
	const i = plugins.findIndex((plugin) => {
		return plugin.constructor && plugin.constructor.name &&
			nameMatcher(plugin.constructor.name);
	});

	return i > -1?
		plugins.slice(0, i).concat(newPlugin || []).concat(plugins.slice(i+1)) :
		plugins;
}
