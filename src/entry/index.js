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
require("../styles/common.css")


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
require("../md/markdown.css")
require("../md/github.css")
// 1119 test less
require("../styles/less_mixin.less")

require("../styles/mixin.scss")
// test stylus
require("../styles/test.styl")
import Markdown from "./markdown"
Markdown.init();


/**
 * 五、使用pug 组件
 * 
 */
require("./loadpug")


/**
 * 六、如果使用JQ(config内，common.js内要添加)
 * 
 */

// import $ from "jquery"
// $("#md").on("mouseover",function(){
//     console.log("over");
//     $(this).addClass("hover");
// });
