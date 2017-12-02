/**
 * PUG  DOV
 * https://github.com/pugjs/pug-loader
 * https://pugjs.org/api/reference.html
 * 
 */
"use strict";

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

//
// var rank = require("../pug/rank.pug");
// var rankBox = document.getElementById("rankBox");

// var rankLists=[
//     {
//         src:"http://a.img.shouyintv.cn/jBfK301-normal",
//         name:"你是风儿我傻傻",
//         diamond:123
//     },
//     {
//         src:"http://a.img.shouyintv.cn/QDjD301-normal",
//         name:"个覅感觉对方考虑",
//         diamond:456654
//     }
// ];

// var rankStr = rank({ data:rankLists });
// rankBox.innerHTML = rankStr;