"use strict";
/**
 * 二、markdown、less、stylus
 * 
 */

const Markdown = {
    init(){
        console.log("come from markdown.js");
        this.container = document.getElementById("md");
        this.html = require("../md/README.md");
        this.renderHtml(this.html);
    },
    renderHtml(){
        this.container.innerHTML = this.html;
    }
}

module.exports = Markdown