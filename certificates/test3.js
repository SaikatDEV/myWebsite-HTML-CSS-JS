const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Got the results");
    if (resolve === false) {
      resolve({ userName: "John" });
    } else {
      reject(new Error("Error has been received"));
    }
  }, 3000);
});

promise
  .then((resultUser) => {
    console.log("Print the user:   " + resultUser.userName);
  })
  .catch((err) => {
    console.log("Error: " + err);
  });
