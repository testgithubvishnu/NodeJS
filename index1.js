const http = require("http");
const fs = require("fs");
const url = require("url");
const { parse } = require("node:path/win32");

http
  .createServer((req, res) => {
    //     if (req.url === "/products" && req.method == "GET") {
    //       fs.readFile("./products.json", "utf-8", (err, data) => {
    //         if (err == null) {
    //           res.end(data);
    //         } else {
    //           res.end("some problem happened!");
    //         }
    //       });
    //     }

    let parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl);
    let products = fs.readFileSync("./products.json", "utf-8");

    //console.log(parsedUrl.query.id);

    if (
      parsedUrl.pathname == "/products" &&
      req.method == "GET" &&
      parsedUrl.query.id == undefined
    ) {
      res.end(products);
    } else if (
      parsedUrl.pathname == "/products" &&
      req.method == "GET" &&
      parsedUrl.query.id != undefined
    ) {
      let productArray = JSON.parse(products);

      let product = productArray.find((product) => {
        return product.id == parsedUrl.query.id;
      });

      if (product != undefined) {
        res.end(JSON.stringify(product));
      } else {
        res.end(JSON.stringify({ massage: "product not found" }));
      }
    } else if (req.method == "POST" && parsedUrl.pathname == "/products") {
      let product = "";

      req.on("data", (chunk) => {
        console.log(chunk);
        product += chunk;
      });
      // console.log(req);
      req.on("end", () => {
        //console.log(product);
        let productArray = JSON.parse(products);
        let newproduct = JSON.parse(product);
        productArray.push(newproduct);
        fs.writeFile("./products.json", JSON.stringify(productArray), (err) => {
          if ((err = null)) {
            res.end(JSON.stringify("New product created"));
          } else {
            res.end("");
          }
        });
      });
      res.end("post request working");
    }
  })
  .listen(7000);
