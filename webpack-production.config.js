var webpack = require("webpack"),
    CompressionPlugin = require("compression-webpack-plugin");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "main.min.css",
    allChunks: true,
    disable: false,
});

console.log("PRODUCTION BUILD");

module.exports = {
    entry: [
        './src/boot',
        './styles/main.scss',
    ],
    output: {
        path: __dirname + "/dist/",
        filename: "./bundle.min.js"
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        },{
            test: /\.s?css$/,
            exclude: /node_modules/,
            use: extractSass.extract({
                fallback: 'style-loader',
                use: [
                    {loader: 'css-loader', options: {
                        minimize: true,
                    }},
                    {loader: 'sass-loader'},
                ]
            })
        },{
            test: /\.css$/i,
            exclude: /node_modules/,
            use: extractSass.extract({
                fallback: 'style-loader',
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader', options: {
                        minimize: true,
                    }},
                ],
            })
        }],
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, './src'),
        new webpack.optimize.UglifyJsPlugin({
        	compress: {
        	    warnings: true,
                screw_ie8: true,
        	    dead_code: true,
        	    unused: true
        	},
			output: {
				comments: false
			},
            mangle: {
                keep_frames: true,
                screw_ie8: true
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin(),
        extractSass,
    ]
};
