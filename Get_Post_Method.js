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

    // Reading the file as string:
    let products = fs.readFileSync("./products.json", "utf-8");

    //console.log(parsedUrl.query.id);

    //fetch all the products:
    if (
      parsedUrl.pathname == "/products" &&
      req.method == "GET" &&
      parsedUrl.query.id == undefined
    ) {
      res.end(products);
    }
    // Fetch product based on the id:
    else if (
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
    }

    // Create a new product:
    else if (req.method == "POST" && parsedUrl.pathname == "/products") {
      let product = "";

      // This event is called for every chunk received:
      req.on("data", (chunk) => {
        console.log(chunk);
        product += chunk;
      });
      // console.log(req);

      //This event id called at the end of stream and converts bytes to readable string:
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
    // end point to delete a product based on id:
    else if (req.method == "DELETE" && parsedUrl.pathname == "/products") {
      let productsArray = JSON.parse(product);

      let index = productsArray.findIndex((product) => {
        return product.id == parsedUrl.query.id;
      });
      productsArray.splice(index, 1);

      // a=[23,75,94,69]
      // a.splice(1,1) -> remove 75
      // a.splice(1,2) -> remove 75,94
    }
  })
  .listen(7000);
