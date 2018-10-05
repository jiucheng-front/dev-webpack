
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    console.log(`Hello,${person.firstName}--${person.lastName}`);
    return `Hello,${person.firstName}--${person.lastName}`
}

export { greeter } 