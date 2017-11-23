// 一、引入flexible
// require("../plugins/flexible");
// 11-19 使用 lib-flexible npm包代替flexible.js,需要配置vendor 提取打包
import 'lib-flexible'


require("../styles/base.css")

// 樣式
require("../styles/dracula.css")



// 逻辑(2种用法都可以)
// require("./dracula.js");
import "./dracula.js"

// 二、markdown、less、stylus
// 渲染markdown文件为html
require("../md/markdown.css")
require("../md/github.css")
// 1119 测试less
require("../styles/less_mixin.less")
// 测试stylus
require("../styles/test.styl")

//  渲染markdown为html
var html = require("../md/README.md")
var container = document.getElementById("md")

container.innerHTML = html;

// PUG 渲染
var template = require("./demo.pug");
var pugBox = document.getElementById("pug");

var arr=[
    {
        name:"张一",
        tel:1358888888
    },
    {
        name:"张二",
        tel:1358888888
    },
    {
        name:"张三",
        tel:1358888888
    }
];

var str = template({data:arr});
console.log(str);
pugBox.innerHTML = str;

