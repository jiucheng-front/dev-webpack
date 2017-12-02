var webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

const CONFIG = require('./config/config');


module.exports = merge(common, {
    devtool: 'source-map',
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
        new UglifyJSPlugin({
            compress: { warnings: false },
            // 是否需要sourcePap
            // sourceMap: true
        }),
        //3、指定环境
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        //4 、提取不同入口使用共同的CSS、JS，結合common內的vendor
        new webpack.optimize.CommonsChunkPlugin({
            // vendors 把第三方JS库提取出来，每次逻辑代码更新，vendors不会更新能缓存(提高性能)
            // manifest文件是将每次打包都会更改的东西单独提取出来，保证没有更改的vendors代码无需重新打包，这样可以加快打包速度
            names: ['vendors', 'manifest'],
            // 配合 manifest 文件使用
            minChunks: Infinity
        })
    ]
});