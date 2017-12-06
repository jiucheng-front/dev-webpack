function Testfn(){
    let testDom = document.getElementById("test");
    console.log("异步组件调用成功");
    console.log(testDom);
}
// Testfn()
module.exports = Testfn