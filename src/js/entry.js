// 一、引入flexible
require("./flexible");
require("../styles/base.css");

// ---------------CSS引入的2种方式：是否想把小图片转化为base64-----------------
// 1、以下引入的CSS里面使用图片是绝对路径不会转化为base64
require("../styles/degula-index.css");
// 2、以下引入的CSS里面使用图片是相对路径，小于8K会自动转换为base64
// require("../root/html/degulaOne/css/degula-index.css");

// 二、测试LESS和scss的简单使用
// require("../styles/test_less.less");
// require("../styles/test_scss.scss");

// 三、页面逻辑
require("./degula_old.js");

// 四、测试Jquery
// var $=require("jquery");
// console.log($);
