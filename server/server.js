import express from "express";
import http from 'http';

import router from './routes/main.js';
import setDB from './db.js';

const app = express()
const PORT = process.env.PORT || 5000;

setDB(app);
app.set('port', PORT);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);

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