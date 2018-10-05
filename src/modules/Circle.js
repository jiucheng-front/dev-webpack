class Circle {
    constructor(radius) {
        this.radius = radius
    }
    static draw(circle, canvas) {
        // 繪製
    }
    static get circleMade() {
        return !this._count ? 0 : this._count
    }
    static set circleMade(val) {
        this._count = val
    }
    area() {
        return Math.pow(this.radius, 2) * Math.PI
    }
    get radius() {
        return this._radius
    }
    set radius(radius) {
        if (!Number.isInteger(radius)) throw new Error("半徑必須是整數！")
        this._radius = radius
    }
}

export {
    Circle
}