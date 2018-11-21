

// 弹框封装
class Confirm {
    title: string
    msg: string
    constructor(title: string, msg: string) {
        this.title = title
        this.msg = msg
        this.showDialog()
    }
    showDialog() {
        console.log(`${this.title}--${this.msg}`)
    }
}

export { Confirm }