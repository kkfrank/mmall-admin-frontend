const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: './src/index.js',
    output: {
        path: '/build',
        filename: '[name].[hash].js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css']
    },
    module:{
        rules:[{
            test:/\.(js|jsx)$/,
            include: /src/,
            use: [{
                loader:'babel-loader'
            }]
        }, {
            test: /\.html$/,
            use: [{
                loader: "html-loader"
            }]
        }, {
            test: /\.(sa|sc|c)ss$/,
            // include: /src/,
            use:[{
                loader: MiniCssExtractPlugin.loader
            },{
                loader:'css-loader'
            },{
                loader:'postcss-loader'
            },{
                loader: "sass-loader"
            }]
        }, {
            test: /\.(png|jpe?g|gif)$/,
            use:[{
                loader: 'url-loader?limit=10000&name=img/[name].[ext]'
            }]
        }
        ]
    },
    optimization:{
        // splitChunks: {
        //     chunks: 'all',
        //     // name: false
        // }
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 1024 * 50,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        }
    },
    plugins: [
        // 独立css文件
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        // html 模板插件
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html'
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