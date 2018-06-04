
// School - Family 兄弟模块通信(相对于JS的回调函数)
class Family {
    constructor({
        userInfo,
    }) {
        this.userInfo = userInfo
        this.message = "成绩太差！"
        if (this.userInfo) {
            this._getScore()
        }
    }
    _getScore() {
        console.log(this.userInfo, "考试有结果了")
        this.curryScore = this.userInfo.score || 0
        if (this.curryScore) {
            if (this.curryScore == 100) {
                this.message = "成绩满分"
            } else if (this.curryScore >= 90 && this.curryScore < 100) {
                this.message = "成绩优秀"
            } else if (this.curryScore >= 80 && this.curryScore < 90) {
                this.message = "成绩良好"
            } else if (this.curryScore >= 70 && this.curryScore < 80) {
                this.message = "成绩中等"
            } else if (this.curryScore >= 60 && this.curryScore < 70) {
                this.message = "成绩一般"
            } else {
                this.message = "成绩没及格"
            }
        }
        this._getMessage()
    }
    _getMessage() {
        console.log("Curry 家长收到信息：" + this.message)
    }
}

module.exports = Family