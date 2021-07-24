class Animal {
  name: string;
  dob: Date;
  constructor(nm: string, db:Date){
    this.name= nm;
    this.dob = db;
  }

  toString(): string{
    // return 'Hi My name is ' + this.name + ' and my date of birth is ' + this.dob.toLocaleDateString();

    //string literal ${variable} inside back tick
    return `Hi My name is ${this.name}  and my date of birth is ${this.dob.toLocaleDateString()}
    And I was born in United States`;
  }
}

class Pet extends Animal {
  constructor(n: string, d: Date){
    super(n, d);
  }

}


let puppy = new Pet('Buchi', new Date());
puppy.toString()


class MyNode<T> {
  value: T;
  right: MyNode<T>;
  constructor(data: T){
    this.value = data;
    this.right = null;
  }

  // retSomething() : T {
  //   return this.value;
  // }
  retSomething = (): T => this.value;

}

let myList = new MyNode<number>(10);
let myList2 = new MyNode<{name: string}>({name: 'Tesfaye'});
myList2.retSomething()

//ECMA 6
// ES6 syntax
for(let i = 0; i < 5; i++) {
  console.log(i); // 0,1,2,3,4
}
//console.log(i); // undefined

const INTEREST = 3.5;

//INTEREST = 4; not allowed

// Iterating over array
let letters = ["a", "b", "c", "d", "e", "f"];

for(let letter of letters) {
    console.log(letter); // a,b,c,d,e,f
}

//Template Literal 

// function default value 
//Modules export/import

export {Animal, Pet, MyNode, INTEREST};