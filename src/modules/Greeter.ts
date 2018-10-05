
/* 
* 类
*/
class Greeter {
    greeting: string;
    score: number;
    view: any;
    constructor(message: string, score: number, elem: string) {
        this.greeting = message
        this.view = document.getElementById(elem)
        this.score = score
        this.speak()
        this.getScore()
    }
    // 私有方法，不可被继承
    private speak() {
        this.view.innerHTML = this.greeting
    }
    // 公有可被继承
    public getScore() {
        console.log(`My score is ${this.score}`)
    }
}



/*
* 函数
*/
// 可以给函数参数指定类型，也可以给函数返回值指定类型
function add(x: number, y: number): number {
    return x + y;
}

// 函数的可选蚕食
function getName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName
    } else {
        return firstName;
    }
}

// 给函数参数指定默认值
function buildName(firstName: string, lastName = 'Statham') {
    return firstName + ' ' + lastName;
}


// 剩余参数,不确定蚕食的个数
function setName(firstName: string, ...restOption: string[]) {
    return firstName + ' ' + restOption.join(' ');
}


/*
*  泛型
*/
// 传入什么类型就会返回什么类型
function anyType<T>(arg: T): T {
    return arg;
}
let str = anyType('Jack')
let num = anyType(123456)


/* 
 * 枚举
 * 使用枚举我们可以定义一些有名字的数字常量
 */

enum Enum {
    A,
    B,
}
let a = Enum.A
let enumOf = Enum[Enum.A]

// 常亮枚举
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

function getEnum() {
    console.log(enumOf, directions)
}


export { Greeter, anyType, getEnum }