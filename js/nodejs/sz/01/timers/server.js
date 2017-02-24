const {createServer} = require('http');

const server = createServer(function(req, res) {

  switch (req.url) {

  case '/shutdown':
    res.end('shutting down');

    console.log('closing, waiting for keep-alive connections to finish');

    server.destroy(() => {
      console.log("closed");
    });

    break;

  default:
    res.end('up and running!');
  }

});

const connections = {}

server.on('connection', function(conn) {
  const key = conn.remoteAddress + ':' + conn.remotePort;
  connections[key] = conn;
  conn.on('close', function() {
    delete connections[key];
  });
});

server.destroy = function(cb) {
  server.close(cb);
  for (const key in connections)
    connections[key].destroy();
};

// server.timeout = 6000;

server.listen(3000);

/*
// каждые 5 сек смотрим - нет ли утечек?
// было много версий ноды с утечками, они ещё есть
const timer = setInterval(() => {
  console.log(process.memoryUsage());
}, 5000);
*/
