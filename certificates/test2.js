// async code simulation
// Here below we dont have the data, which is an issue
// console.log("Start");

// function loginuser(email, pass) {
//   setTimeout(() => {
//     console.log("asd------------------");
//     return { userEmail: email };
//   }, 3000);
// }

// const lu = loginuser("asdasdadd.com", 123422);
// console.log(lu);

// console.log("End");
// This below is the solution for above issue
console.log("Start");

function loginuser(email, pass, callback) {
  setTimeout(() => {
    callback({ userEmail: email });
  }, 3000);
}

const lu = loginuser("asdasdadd.com", 123422, (result) => {
  console.log("--------------------" + result.userEmail);
});

console.log("End");
