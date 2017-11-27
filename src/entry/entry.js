/**
 * 一、引入flexible(1,2方式)
 * 1、require("../plugins/flexible");
 */
// 2、11-19 使用 lib-flexible npm包代替flexible.js,需要配置vendor 提取打包
import 'lib-flexible'

/**
 * 二、引入CSS
 * 
 */
require("../styles/base.css")
require("../md/markdown.css")
require("../md/github.css")
// 1119 test less
require("../styles/less_mixin.less")
// test stylus
require("../styles/test.styl")

/**
 * 三、引入逻辑
 * 
 */
import Test from "./test"
Test.backTop("backTop")


/**
 * 四、渲染markdown
 * 
 */
// require("./markdown")
import Markdown from "./markdown"
Markdown.init();


/**
 * 五、使用pug 组件
 * 
 */
require("./loadpug")

import Build from "../../config/build"

let endTime =Build.info.time 

if(endTime){
    console.log(endTime);
}