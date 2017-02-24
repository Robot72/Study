const { Server } = require('http');

const server1 = new Server((req, res) => {
  switch (req.url) {

  case '/shutdown':
    res.end('shutting down');

    server1.close(() => {
      console.log("closed");
    });

    break;
  default:
    res.end("hello world")
  }
});

server1.listen(3000);

const server2 = new Server((req, res) => {
  res.end(JSON.stringify(process.memoryUsage()));
});

server2.listen(3333);

server2.unref()
