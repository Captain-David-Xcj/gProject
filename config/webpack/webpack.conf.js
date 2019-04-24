const webpack = require('webpack');//引入webpack
const opn = require('opn');//打开浏览器
const merge = require('webpack-merge');//webpack配置文件合并
const path = require("path");
const baseWebpackConfig = require("./webpack.base.conf");//基础配置
const webpackFile = require("./webpack.file.conf");//一些路径配置
const HtmlWebpackPlugin=require("html-webpack-plugin");
const entry = require("./webpack.entry.conf");
const webpackCom = require("./webpack.com.conf");
const CleanWebpackPlugin =require("clean-webpack-plugin")
let pages = entry;

let config = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(webpackFile.proDirectory),
        filename: 'js/[name].js',
        chunkFilename: "js/[name].js",
    },
    optimization: {
        //包清单
        runtimeChunk: {
            name: "manifest"
        }
    },
    plugins: [
        /*设置热更新*/
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin({}),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            title: webpackCom.titleFun("index",pages["index"][1]),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunks: ['manifest',"index"],
            hash: false,
            chunksSortMode: 'dependency'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                include: [
                    path.resolve(__dirname, "../../app"),
                    path.resolve(__dirname, "../../entryBuild")
                ],
                exclude: [
                    path.resolve(__dirname, "../../node_modules")
                ],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader:
                            'css-loader'
                    }
                ],
            },
            {
                test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg|swf)$/,
                loader: 'file-loader?name=[name].[ext]&outputPath=' + webpackFile.resource + '/'
            }
        ]
    },
    /*设置api转发*/
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        hot: true,
        inline: true,
        contentBase: path.resolve(webpackFile.devDirectory),
        historyApiFallback: true,
        disableHostCheck: true,
        proxy: [
            {
                context: ['/api/**', '/u/**'],
                target: 'http://192.168.12.100:8080/',
                secure: false
            }
        ],
        /*打开浏览器 并打开本项目网址*/
        after() {
            opn('http://localhost:' + this.port)
        }
    }
});

for (let chunkName in pages) {
    if(chunkName==="index") continue;
    let conf = {
        filename: "./content/"+chunkName + '.html',
        template: 'index.html',
        inject: true,
        title: webpackCom.titleFun(chunkName,pages[chunkName][1]),
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunks: ['manifest',chunkName],
        hash: false,
        chunksSortMode: 'dependency'
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = config;