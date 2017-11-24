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