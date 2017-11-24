// PUG 渲染
/**
 * DOV
 * https://github.com/pugjs/pug-loader
 * https://pugjs.org/api/reference.html
 * 
 * * */
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
// console.log(str);
pugBox.innerHTML = str;

//
var rank = require("../pug/rank.pug");
var rankBox = document.getElementById("rankBox");

var rankLists=[
    {
        src:"http://a.img.shouyintv.cn/jBfK301-normal",
        name:"你是风儿我傻傻",
        diamond:123
    },
    {
        src:"http://a.img.shouyintv.cn/QDjD301-normal",
        name:"个覅感觉对方考虑",
        diamond:456654
    }
];

var rankStr = rank({ data:rankLists });
rankBox.innerHTML = rankStr;