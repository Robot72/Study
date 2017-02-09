// graceful shutdown demo
const {createServer} = require('http');

const server = createServer(function(req, res) {

  switch (req.url) {

  case '/shutdown':
    res.end('shutting down');

    console.log('closing, waiting for keep-alive connections to finish');

    // server.destroy(() => {
    //   console.log("closed");
    // });

    server.close(() => {
      console.log("closed");
    });

    break;

  case '/wait':
    setTimeout(() => res.end('done'), 10000);
    break;

  default:
    res.end('up and running!');
  }

});

const connections = {}
let id = 0;

// track connections
server.on('connection', function(conn) {
  connections[++id] = conn;
  conn.id = id;
  conn.on('close', function() {
    delete connections[id];
  });
});

// track is connections are busy, kill them as they finish working
server.on('request', function(req, res) {
  let conn = req.socket; // = res.socket
  conn.isIdle = false;
  res.on('finish', () => {
    conn.isIdle = true;
    conn.emit('idle');
  })
});

server.destroy = function(cb) {
  this.close(cb);
  this.isClosing = true;
  for (let key in connections) {
    let conn = connections[key];
    if (conn.isIdle) {
      conn.destroy();
    } else {
      conn.once('idle', () => conn.destroy());
    }
  }
};

server.listen(3000);


// каждые 5 сек смотрим - нет ли утечек?
// было много версий ноды с утечками, они ещё есть
// setInterval(() => {
//   console.log(Object.keys(connections));
// }, 5000).unref();
