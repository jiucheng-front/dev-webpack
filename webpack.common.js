const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CONFIG = require('./config/config');

// 4、提取第三方JS庫
// const VENDOR=[
//     "jQuery"
// ];

// console.log(__dirname, CONFIG.build.outPutProjectPath);

module.exports = {
    entry:{
        app:'./src/entry/entry.js',
        //1.1 不要JQ直接注释就不会打包，不然使用不使用都会打包JQ为 vendor.js
        vendor: CONFIG.dev.VENDOR
    },
    output: {
        // path: path.resolve(__dirname, "build"),
        path: path.resolve(__dirname, CONFIG.build.outPutProjectPath),
        // filename: 'app_[chunkhash].js'
        // 加上/js就会输出到js文件夹下面
        filename:'js/[name]_[chunkhash].js'
    },
    module: {
        rules: [
            //1.1 解析压缩css,css-loader，
            {
                test: /\.css$/,
                // 6.2 想抽离出来得
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    // use: 'css-loader',
                    use:[{
                        loader: 'css-loader'
                    }]
                })
            },
            { //1.2.SASS的.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
                test: /\.scss$/,
                // 6.2 想抽离出来得
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        "css-loader",
                        "sass-loader"
                    ]
                })
            },
            // 1.3 引入less-loader,编译less
            {
                test:/\.less$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                        "css-loader",
                        "less-loader"
                    ]
                })
            },
            //2 处理图片,图片路径需是相对路径才能看到效果
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        // 默认打包到dist下的img文件夹
                        name:'img/[name].[hash:7].[ext]'
                    }
                }
            },
            //3 编译js或者es6
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            //4 处理字体
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        // fonts/打包到dist下的fonts文件夹
                        name: 'fonts/[name].[hash:7].[ext]'
                    }
                }
            }

        ]
    },
    plugins: [
        //5、提取css到单独的文件夹
        new ExtractTextPlugin({
            //加上/css就会输出到css文件夹下面
            filename: 'css/app_[hash].css',
            // filename:'app_[chunkhash].css',
            disable: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: 'App',
            filename: 'index.html',
            template: CONFIG.dev.indexFile
        }),
    ]
};