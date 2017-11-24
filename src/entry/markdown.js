"use strict";
/**
 * 二、markdown、less、stylus
 * 
 */
require("../md/markdown.css")
require("../md/github.css")
// 1119 test less
require("../styles/less_mixin.less")
// test stylus
require("../styles/test.styl")

const Markdown = {
    init(){
        console.log("啊啊啊");
        this.container = document.getElementById("md");
        this.html = require("../md/README.md");
        this.renderHtml(this.html);
    },
    renderHtml(){
        this.container.innerHTML = this.html;
    }
}

module.exports = Markdown