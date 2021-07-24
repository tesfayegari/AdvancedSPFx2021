"use strict";

for(let i = 0; i < 5; i++) {
  console.log(i); // 0,1,2,3,4
}
console.log(i); // undefined

{

}

export function addTwoNumbers(a=0, b=0){
  return a + b;
}

addTwoNumbers(4,5);//9

addTwoNumbers();

//Arrow function 
//the above function can be written as below 

let addNumbers = (a=0,b=0) => a + b;

// spread operator 

function addAllNumbers (a,b,c,d,e,f) {
  return a + b + c + d + e + f;
}

addAllNumbers(1,2,3,4,5,6);

//The above can be re-written as 
function addAllNumbers (...args) {
  let sum =0;
  for(let item of args){
    sum += item*1;
  }
  return sum;
}


let col = [1,2,3,4,5,6];
addAllNumbers([3,6,7, ...col]);

let cal1 = [];
let cal2 = [];
let cal3 = [];

let masterCal = [...cal1, ...cal2, ...cal3]

//Destructuring 
var fruits = ["Apple", "Banana"];
let a = fruits[0];
let b = fruits[1];

let [a, b] = fruits;

// swapping two values in a variable a, b

let temp = a;
a=b;
b=temp;

[a, b] = [b, a];

