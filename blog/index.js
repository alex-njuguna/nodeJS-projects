// const http = require("http");
// const fs = require("fs");

// const homePage = fs.readFileSync("index.html");
// const aboutPage = fs.readFileSync("about.html");
// const contactPage = fs.readFileSync("contact.html");
// const notFound = fs.readFileSync("notFound.html");

// const server = http.createServer((req, res) => {
//   //   console.log(req.url);
//   if (req.url === "/") {
//     res.end(homePage);
//   } else if (req.url === "/about") {
//     res.end(aboutPage);
//   } else if (req.url === "/contact") {
//     res.end(contactPage);
//   } else {
//     res.writeHead(404);
//     res.end(notFound);
//   }
// });

// server.listen(3000);

const express = require("express");

const app = express();

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
