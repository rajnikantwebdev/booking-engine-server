const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200);
    res.write("server is running");
    res.end();
  })
  .listen(8000);
