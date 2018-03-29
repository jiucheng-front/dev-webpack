class Students {
    constructor({
        resetCallback
    }) {
        this.resetCallback = resetCallback
        this.container = document.getElementById("school")
        this.status = 1
        this._init()
    }
    _init() {
        this.container.innerHTML = "点击测试"
        this.container.addEventListener("click", e => {
            this._testClick(this.status)
        })
        console.log("from students moudule!")
    }
    _testClick(status) {
        console.log(status)
        let resetStatus = this.status == 1 ? 1 : 0
        // console.log(resetStatus)
        // 抛出回调
        this.resetCallback(resetStatus)
        // 重置当前状态
        this.status = 0
    }
}

module.exports = Students