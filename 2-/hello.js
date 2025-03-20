const mission = "earn";

if (mission === "earn") {
  console.log(`It's time to get up`);
} else {
  console.log(`Is ${mission} boring?`);
}

// event object
let task1 = process.argv[0];
let task2 = process.argv[1];
let task3 = process.argv[2];
// if (task === "processing") {
//   console.log(`It's time to get up`);
// } else {
//   console.log(`Is ${mission} boring?`);
// }
console.log(`ARG_1: ${task1}`);
console.log(`ARG_2: ${task2}`);
console.log(`ARG_3: ${task3}`);

// execute this : node hello.js someName
