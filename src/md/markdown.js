"use strict";
/**
 * 二、markdown、less、stylus
 * 
 */

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}


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