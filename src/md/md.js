"use strict";

const marked = require("marked");
const loaderUtils = require("loader-utils");


// var loader= __dirname + "/../../";
// console.log(loader);

module.exports = function (markdown) {
    // merge params and default config
    const options = loaderUtils.getOptions(this);

    this.cacheable();

    marked.setOptions(options);

    return marked(markdown);
};