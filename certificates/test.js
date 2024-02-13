//Sync code example
// function otherfunc() {
//   console.log("We are in another func");
//   console.log("Do some actions");
// }

// console.log("Start");
// otherfunc();
// console.log("End");
// ----------------------------------------------------------------
// Async code
// call back functions also can be sync like forEach
// Javascript is a single threaded programming language, So it goes line by line
// Where JAVA is a multi threaded programming language
console.log("Start");
// This below method is an async operation
setTimeout(() => {
  console.log("We are in the Timeout2.......");
}, 5000);

setTimeout(() => {
  console.log("We are in the Timeout1.......");
}, 2000);

console.log("End");
