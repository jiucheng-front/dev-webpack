
/**
 *  https://www.typescriptlang.org/play/index.html
 *  面向对象特性
 *  calss
 */
class Person {
    constructor(public name: string) {
        console.log(`I am coming from Person !`)
    }
    eat() {
        console.log(`${this.name} is eating !`)
    }
}

// extends 、 super
class Employee extends Person {
    code: string;
    constructor(name: string, code: string) {
        super(name)
        this.code = code
        console.log(`I am coming from Employee !`)
    }
    // default public
    work() {
        super.eat()
        this.doWork()
    }
    // 
    private doWork() {
        console.log(`${this.name} is working after eating !`)
    }
}

// get set
const passCode = '123456'
class Worker {
    private _fullName: string;
    get fullName() {
        return this._fullName;
    }
    set fullName(newName: string) {
        if (passCode && passCode === "123456") {
            this._fullName = newName
        } else {
            console.log(`Error: Unauthorized update name!`)
        }
    }
}


export { Employee, Worker }