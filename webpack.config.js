const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "main.css",
    allChunks: true,
    disable: false,
});

console.log("DEVELOPMENT BUILD");

module.exports = {
    entry: [
        './src/boot',
        './styles/main.scss'
    ],
    output: {
        path: __dirname + "/dist/",
        filename: "./bundle.js"
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
        extractSass,
        new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, './src'),
    ]
};
