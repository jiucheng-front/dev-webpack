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
        console.log("Students1")
    }
}

module.exports = Students