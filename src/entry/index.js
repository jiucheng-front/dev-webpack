
const path = require("path");
"use strict";
/**
 * 一、引入flexible(1,2方式)
 * 1、require("path/flexible");
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
import Utils from "../common/Utils"
Utils.backTop("backTop")


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
import Markdown from "../md/markdown"
Markdown.init();


/**
 * 五、使用pug 组件
 * https://github.com/pugjs/pug-loader
 * https://pugjs.org/api/reference.html
 */

var template = require("../components/Doc.pug");
var pugBox = document.getElementById("pug");
let items=[
    {
        name:"less",
        Englink:"http://lesscss.org/",
        Chlink:"http://less.bootcss.com/"
    },
    {
        name:"sass",
        Englink:"http://sass-lang.com/",
        Chlink:"https://www.sass.hk/"
    },
    {
        name:"stylus",
        Englink:"http://stylus-lang.com/",
        Chlink:"http://www.zhangxinxu.com/jq/stylus/"
    },
    {
        name:"webpack",
        Englink:"https://webpack.js.org/",
        Chlink:"https://doc.webpack-china.org/"
    },
    {
        name:"es6",
        Englink:"https://ponyfoo.com/articles/es6",
        Chlink:"http://es6.ruanyifeng.com/"
    }
]

var str = template({ data:items });
// console.log(str);
pugBox.innerHTML = str;

console.log("this is from index.js");

// 五、1
let mainTemp = require("../components/main.pug");
let mainDom = document.getElementById("main");
let mainStr = mainTemp();
mainDom.innerHTML = mainStr

// 五、2 测试异步组件
let testDom = document.getElementById("test");

testDom.addEventListener("click",function(){
    require.ensure([], function() {
        var test = require('./test.js');
        test();
    })
});



/**
 * 六、如果使用JQ(config内，common.js内要添加)
 * 
 */

// import $ from "jquery"
// $("#md").on("mouseover",function(){
//     console.log("over");
//     $(this).addClass("hover");
// });


/*
*七、使用lazyloading
*
*/
// have error
// require("./detail");