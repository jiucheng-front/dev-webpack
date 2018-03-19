const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CONFIG = require('./config/config');

//5 markdown conver to html
var marked = require("marked");
var renderer = new marked.Renderer();
// entry:https://segmentfault.com/a/1190000009916612
module.exports = {
    entry:{
        // 2、0 是否多入口
        // app:'./src/entry/index.js',
        app:'./src/entry/login.js',
        // detail:"./src/entry/detail.js",
        //1.1 不要JQ直接注释就不会打包，不然使用不使用都会打包JQ为 vendor.js
        vendors: CONFIG.dev.VENDOR
    },
    output: {
        // path: path.resolve(__dirname, "build"),
        path: path.resolve(__dirname, CONFIG.build.outputProjectPath),
        // filename: 'app_[chunkhash].js'
        // 加上/js就会输出到js文件夹下面
        filename:'js/[name]_[chunkhash].js',
        // 2、1
        // chunkFilename: 'js/[id].chunk.js'
        // 3.0 异步组件带上
        chunkFilename: 'js/[name].[chunkhash:5].chunk.js'
    },
    module: {
        rules: [
            //1.1 解析压缩css,css-loader，
            {
                test: /\.css$/,
                // 6.2 想抽离出来得
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    // use: 'css-loader',
                    use:[
                        { loader: "css-loader", options: { importLoaders: 1 }},
                        { loader: 'postcss-loader', options: { sourceMap: true } }
                    ]
                })
            },
            { //1.2.SASS的.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
                test: /\.scss$/,
                // 6.2 想抽离出来得
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        "css-loader",
                        // "postcss-loader",
                        { loader: 'postcss-loader', options: { sourceMap: true } },
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
                        // "postcss-loader",
                        { loader: 'postcss-loader', options: { sourceMap: true } },
                        "less-loader"
                    ]
                })
            },
            // 1.4 使用stylus-loader 编译 .stylus为CSS
            {
                test:/\.styl$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                        "css-loader",
                        // "postcss-loader",
                        { loader: 'postcss-loader', options: { sourceMap: true } },
                        "stylus-loader"
                    ]
                })
            },
            //2 处理图片,图片路径需是相对路径才能看到效果(一般不需要)
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
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            //4 处理字体（如：引入字体图标）
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
            },
            // 5、markDown文件转为html(需要markdown.css,和github.css)
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "html-loader"
                    },
                    {
                        loader: require.resolve("./src/md/md.js"),
                        options: {
                            renderer
                        }
                    }
                ]
            },
            //6、 处理.pug HTML片段(组件化，省去字符串拼接)
            {
                test:/\.pug$/,
                use:{
                    loader:"pug-loader"
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
            title: 'Dev template',
            filename: 'index.html',
            favicon:'./images/favicon.ico',
            // 2.3 需要引入的chunk，不配置就会引入所有页面的资源
            // chunks: ['vendors',"app"],
            minify: {
                //移除HTML中的注释
                removeComments: true, 
                //删除空白符与换行符
                collapseWhitespace: false,
                collapseWhitespace:true
            },
            template: CONFIG.dev.indexFile
        }),
        // 多页
        // new HtmlWebpackPlugin({
        //     title: 'App',
        //     filename: 'detail.html',
        //     favicon:'./images/favicon.ico',
        //     chunks: ['vendors',"detail"],
        //     minify: {
        //         removeComments: true, 
        //         collapseWhitespace: false,
        //         collapseWhitespace:true
        //     },
        //     template: "./src/pages/detail.ejs"
        // })
    ]
};