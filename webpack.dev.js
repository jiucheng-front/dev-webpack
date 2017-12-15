const path = require('path');
var webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const CONFIG = require('./config/config');

module.exports = merge(common, {
    // devtool: 'eval-source-map',
    devServer: {
        //1、 可指定服务器根目录如：src/root 方便本地查看，前提有该文件夹
        contentBase: path.join(__dirname, CONFIG.dev.serverRoot),
        inline: true,
        port: CONFIG.dev.port,
        //2、 指定本地电脑的IP作为host,方便同一个局域网手机查看效果，请填写自己本机的IP地址或者localhost
        // host: "172.16.9.142",
        host: "localhost",
        //3、 是否需要跨域去请求接口本地测试
        proxy: {
            "/api":{
                // 最后这个是要换的
                target:"http://zengsimin-dev.langlive.com:80",
                changeOrigin:true,
                pathRewrite:{
                "^/api":""
                }
            }
        }
    }
});