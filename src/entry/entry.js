// 一、引入flexible
require("../plugins/flexible");

require("../styles/base.css");

// 樣式
require("../styles/dracula.css");



// 逻辑
require("./dracula.js");


// 渲染markdown文件为html
require("../md/markdown.css");
require("../md/github.css");

var html = require("../md/README.md");
var container = document.getElementById("md");

container.innerHTML = html;

