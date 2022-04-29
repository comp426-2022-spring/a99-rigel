import express from "express";
import http from 'http';
import cors from "cors";

import router from './routes/main.js';
import setDB from './db.js';

const app = express()
const PORT = process.env.PORT || 5000;

setDB(app);
app.set('port', PORT);

app.use(cors({}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(function (req, res, next) {
//   const log = req.app.get('db').collection('log');

  const data = {
    remoteaddr: req.ip,
    user_id: req.user,
    time: Date.now(),
    method: req.method,
    url: req.url,
    protocol: req.protocol,
    httpversion: req.httpVersion,
    status: res.statusCode,
    referer: req.headers['referer'],
    useragent: req.headers['user-agent']
  };
  /*
  log.insertOne(data, (err, resdb) => {
    if (err) res.send({
      status: 'error',
      debug: resdb
    });
    else res.send({
      status: 'sucess',
      result: resdb
    });
  });*/

//   next()
// })
app.use('/', router);


/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
// Handle the get for this route
});

app.post('/', function(req, res, next) {
// Handle the post for this route
});*/

// cleanup all database connections on EXIT
function cleanup () {
  console.log("\nStart to clean up...");
  app.get('db_connection').close(() => {
    console.log("Database connection closed.");
    process.exit();
  });

  setTimeout( function () {
    console.error("Could not close connections in time, forcing shut down");
    process.exit(1);
    }, 30*1000);
}
// register to system signals
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

app.set('server', http.createServer(app));
app.get('server').listen(PORT, () => console.log(`Server started on http://localhost:${PORT} successfully...`));
export default app;