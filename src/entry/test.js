function Testfn(){
    let testDom = document.getElementById("test");
    console.log("异步组件调用成功");
    console.log(testDom);
    // 动态追加DOM
    var element = document.createElement('div');
    var button = document.createElement('button');
    var br = document.createElement('br');
    button.innerHTML = 'Click me and look at the console!from test.js';
    element.innerHTML = ['Hello', 'webpack'].join('');
    element.appendChild(br);
    element.appendChild(button);
    document.body.appendChild(element);
    // 异步追加的逻辑
    button.addEventListener("click", e =>{
        let targetElem = e.target;
        console.log(e)
        console.log(targetElem)
    })
}
// Testfn()
module.exports = Testfn