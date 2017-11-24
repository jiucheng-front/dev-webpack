"use strict";

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