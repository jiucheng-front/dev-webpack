var webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

const CONFIG = require('./config/config');

// 测试添加每次打包的打包时间
var Build = require("./config/build");

var sd = require('silly-datetime');
var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
Build.info.time ="打包时间是："+ time
console.log(Build.info.time);


module.exports = merge(common, {
    output:{
        // 打包后html内引入文件是相对路径还是绝对路径
        publicPath: "./",
    },
    //可以扩展
    module:{
        rules:[

        ]
    },
    plugins: [
        new CleanWebpackPlugin(CONFIG.build.cleanLsit),
        // 1、压缩CSS
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        //2、压缩JS
        new UglifyJSPlugin(),
        //3、指定环境
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        //4 、提取第三方JS庫，結合common內的vendor
        new webpack.optimize.CommonsChunkPlugin({
            // vendor 的意义和之前相同
            // manifest文件是将每次打包都会更改的东西单独提取出来，保证没有更改的代码无需重新打包，这样可以加快打包速度
            names: ['vendor', 'manifest'],
            // 配合 manifest 文件使用
            minChunks: Infinity
        })
    ]
});