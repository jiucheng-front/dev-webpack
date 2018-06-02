
// School-Students父子模块通信
import Students from "./students"

class School {
    constructor({
        parentHandle,
        sendScore,
    }) {
        // 方式1、外部传入
        // this.parentHandle = parentHandle
        this.sendScore = sendScore
        this._init()
    }
    _init() {
        // this=School
        console.log(this, "1")
        this.studentsOne = new Students({
            parentHandle: this.parentHandle,
            getStudentInfo: this._getUserInfo,
            _this: this,
        })
    }
    // 方式、2声明在内部
    parentHandle(status) {
        // this= Students
        console.log(this, "2")
        if (status == 1) {
            console.log("打开！")
        } else {
            console.log("关闭！")
        }
    }
    // 从子组件传递信息过来
    _getUserInfo(_this, info) {
        // this= Students
        console.log(this, "3")
        if (info) {
            console.log(info)
            console.log(this, "123")
            _this._testing(info)
        }
    }
    // 考试
    _testing(info) {
        // this= School
        if (info.id == 1) {
            info.score = 96
            if (info && info.score) {
                this.sendScore(info)
            }
        }
    }
}

module.exports = School