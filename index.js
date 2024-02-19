const http = require("http");

//create server:
http
  .createServer((req, res) => {
    // console.log(request);
    // Response
    // res.end("Response from server");

    //console.log(req.url);
    // We may create diferent routes:
    if (req.url === "/add" && req.method == "GET") {
      res.end("data added");
    } else if (req.url === "/update" && req.method == "POST") {
      res.end("Data updated");
    } else if (req.url === "/users" && req.method == "POST") {
      res.end("Users added");
    }
    res.end("This is first Response");
  })
  .listen(8000);

// To reach to this server:
// 127.0.0.1:8000
