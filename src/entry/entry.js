// 一、引入flexible
require("../plugins/flexible");

require("../styles/base.css");

// 樣式
require("../styles/dracula.css");



// 逻辑
require("./dracula.js");

var html = require("../md/README.md");
var container = document.getElementById("md");

container.innerHTML = html;

