var fs = require("fs")
// console.log(fs)
fs.readFile(__dirname+'\/test.txt','utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});