const fs = require("fs");

// FILE READING:
// sycn way of reading
let data = fs.readFileSync("./Notes.txt", "utf-8");
console.log(data);

//async way of reading:
fs.readFile("./Notes.txt", "utf-8", (err, data) => {
  console.log(err);
  console.log(data);
});
console.log("Random code"); // It will execute first

// FILE WRITING:
// Clear previous data and write new one
// fs.writeFileSync("./Notes.txt", "File Handling");

// To append in previous data:
// fs.appendFile("./Notes.txt", "File Handling", (err) => {
//   console.log(err);
// });

fs.unlinkSync("./fun.txt");
