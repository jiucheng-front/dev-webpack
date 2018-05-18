class Students {
    constructor({
        parentHandle
    }) {
        this.parentHandle = parentHandle
        this.container = document.getElementById("school")
        this.status = 1
        this._init()
    }
    _init() {
        this.container.innerHTML = "点击测试父組件的方法"
        this.container.addEventListener("click", e => {
            this._testClick(this.status)
        })
        console.log("from students moudule!")

    }
    _testClick(status) {
        // console.log(status)
        let resetStatus = this.status ? 1 : 0
        console.log(resetStatus)
        // 重置当前状态
        this.status = !this.status
        // 抛出回调
        this.parentHandle(resetStatus)
    }
}

module.exports = Students