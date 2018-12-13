// 1、是否函数指定的className
function hasClass(elem, cls) {
    return elem.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
// 2、没有就追加指定className
function addClass(elem, cls) {
    if (!hasClass(elem, cls)) {
        elem.className += " " + cls;
    }
}
// 3、有就移除指定className
function removeClass(elem, cls) {
    if (hasClass(elem, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        elem.className = elem.className.replace(reg, "");
    }
}

class TestCheckbox {
    constructor() {
        this.Box = document.getElementById('array')
        this.IdList = []
        this.TextList = []
        this.startCheck()
    }
    startCheck() {
        this.Box.addEventListener('click', e => {
            let target = e.target
            let id = target.getAttribute("data-id")
            let value = target.getAttribute("data-value")
            if (!hasClass(target, 'active')) {
                addClass(target, 'active')
                this.IdList.push(id)
                this.TextList.push(value)
                console.log(this.IdList, this.TextList, `添加`)
            } else {
                removeClass(target, 'active')
                this.IdList.splice(this.IdList.indexOf(id), 1)
                this.TextList.splice(this.TextList.indexOf(value),1)
                console.log(this.IdList, this.TextList, `删除`)
            }
        })
    }
}

export { TestCheckbox }