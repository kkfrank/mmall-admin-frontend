/*global
    __DEV__
    __dirname
    process
*/
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        path.join(__dirname, './src/index.js'),
    ],
    output: {
        publicPath: '/',
        path: path.join(__dirname, '/dev'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'react-hot-loader',
                    'babel-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|png|svg|gif|bmp)/i,
                use: [
                    'url-loader?limit=5000'
                ]
            },
            {
                test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,
                use: [
                    'url-loader?limit=5000'
                ]
            },
            // css文件的处理
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(scss)$/,
                // exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: [{
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        }, {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }]
                })
            }
        ]
    },
    plugins: [
        // Scope hosting
        new webpack.optimize.ModuleConcatenationPlugin(),

        // 独立css文件
        new ExtractTextPlugin({
            filename: 'css/main.css',
            disable: true
        }),

        // 提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename: 'js/base.js'
        }),

        // html 模板插件
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html'
        }),
        // 热加载插件
        new webpack.HotModuleReplacementPlugin(),
        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    devServer: {
        // proxy: {
        //     // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:7777 上，由 koa 提供 mock 数据。
        //     // koa 代码在 ./mock 目录中，启动命令为 npm run mock
        //     '/api': {
        //         target: 'http://localhost:7777',
        //         secure: false
        //     }
        // },
        port: '9010',
        // proxy: {
        //     '/api':'http://admintest.happymmall.com',
        // },
        proxy : {
            '/manage' : {
                target: 'http://admintest.happymmall.com',
                secure: false,
                changeOrigin : true
            },
            '/user/logout.do' : {
                target: 'http://admintest.happymmall.com',
                changeOrigin : true
            }
        },
        // 独立css文件
        // host: '127.0.0.1',

        // disableHostCheck: true, // 为了手机可以访问
        contentBase: './dev', // 本地服务器所加载的页面所在的目录
        historyApiFallback: true, // 为了SPA应用服务
        inline: true, //实时刷新
        hot: true  // 使用热加载插件 HotModuleReplacementPlugin
    }
}