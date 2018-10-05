
// interface 接口强制类型检测
interface Person {
    firstName: string;
    lastName: string;
}

let isFinished: boolean = false

let word: string = 'Hello'


// 声明的时候可以指定类型
let list: number[] = [1, 2, 3]

let arr: Array<number> = [4, 5, 6]

let objList: object[] = [{ id: 1 }, { id: 2 }]

let stringList: string[] = ['Jason', 'Kurry']

let a: [string, number]
a = ['Jack', 10]


// any 指定不确定类型的
let notSure: any = 10

function greeter(person: Person) {
    console.log(`Hello,${person.firstName}--${person.lastName}`);
    return `${word},${person.firstName}--${person.lastName}--${isFinished}`
}

// 可选属性
interface SocpedConfig {
    width?: number;
    color?: string;
    // 初始化的时候一个只读属性，不许修改
    readonly count: number;
}
function createSquare(config: SocpedConfig): { area: number; color: string } {
    let newSquare = { color: 'blue', area: 100, count: 10 }
    if (config.color) {
        newSquare.color = config.color
    }
    if (config.width) {
        newSquare.area = config.width * config.width
    }
    return newSquare;
}

export { greeter } 