// commonJS
// const request = require("./request");
// const response = require("./response");

// ECMAScript
// import { send } from "./internals/request.mjs";
// import { read } from "./internals/response.mjs";

// Folder import
const internals = require("./internals");

// console.log(internals.request);
function serverRequest(url, data) {
  internals.request.send(url, data);
  return internals.response.read();
}

// check what module object contains
// console.log(module);

//  calling above function here with google site
const serverData = serverRequest("https://www.google.com", "uniqueData");

console.log(serverData);
