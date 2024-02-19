const http = require("http");
const fs = require("fs");
http
  .createServer((req, res) => {
    if (req.url === "/products" && req.method == "GET") {
      fs.readFile("./products.json", "utf-8", (err, data) => {
        if (err == null) {
          res.end(data);
        } else {
          res.end("some problem happened!");
        }
      });
    }
  })
  .listen(7000);
