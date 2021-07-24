import { INTEREST } from "./Animal";

interface IStudent {
  name: string ;
  phone: string;
  age: number;
  //readData (greeting): void;
}

class Student {
  name: string = "Tesfaye";
  phone: string;
  age: number;
  
  constructor(st: IStudent){}

  readData (greeting){
    this.name = "Tesfaye Gari";
    console.log(greeting, this.name)
  }

}


class AnotherStudent extends Student {
  name2;
  constructor(st){
    super(st);
    this.name = st.name;
  }
}

let st: IStudent;
st = {name: 'Tesfaye Gari', age: 21, phone: ''}

let st2: Student;
st2 = new Student(st);
st2 =  new AnotherStudent(st);

let a: number; 
a=8;
//a="eight";


class Test<T>{

  getTest(param: T){
    console.log('Your Data is ', JSON.stringify(param));
  }
}


var test:Test<string> = new Test();

test.getTest('Something');

var test2 = new Test<{name:string, age: number}>();
test2.getTest({name: 'Tesfaye', age: 21});
// test2.getTest('Something');

// this.domElement.innerHTML = `
//                             <h1>This is a text too</h1>
//                             <div class="class1>${this.properties.fullName}</div>
//                             `;



let i = INTEREST;








