const http = require("http");

const server = http.createServer((req, res) => {
  //   console.log(req.url);
  if (req.url === "/") {
    res.end("This is the home page");
  } else if (req.url === "/about") {
    res.end("This is the about page");
  } else if (req.url === "/contact") {
    res.end("this is the contact page");
  } else {
    res.writeHead(404);
    res.end("Page not found");
  }
});

server.listen(3000);
