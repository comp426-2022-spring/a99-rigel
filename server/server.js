const express = require("express")
const app = express()
const { MongoClient } = require('mongodb');
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World');
});


// Make connection with mongoDB database
const uri = "mongodb+srv://rigel:q8rkIGoga1xafGmN@cluster0.l7bmq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// sanity check by listing all collection names
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

// Initialize connection once
MongoClient.connect(uri, function(err, database) {
  if(err) throw err;
  app.locals.db = database;
  listDatabases(database);
});

// Get all users (testing mongodb request)
// @max Whats the format to get one user?
app.get("/users", async (req, res) => {
  const db  = await app.locals.db.db("web")
  //console.log(db)
  const users = await db.collection("user").find({user_name: "mike"});
  console.log(users)
  //let users = app.locals.db.collection("user")
  // users.find().toArray((err, items) => {
  //   if(err) {
  //     console.log(err)
  //     res.status(500).json({err:err})
  //     return
  //   }
  //   res.status(200).json({users: items})
  // })
})


// Get all surveys (Home screen request)

// Add a survey to database (Create Survey Screen submission)


// Get all of the surveys the user has created (My surveys screen request)

// Get all the responses from a particular survey created by a particular user (Specific survey resposnes screen)

// Add a response to an existing survey (Filling out Survey screen submission)


// cleanup all database connections on EXIT
function cleanup () {
  app.locals.db.close();
  process.exit();

  setTimeout( function () {
    console.error("Could not close connections in time, forcing shut down");
    process.exit(1);
    }, 30*1000);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);


// Start the server to listen to the PROT
app.listen(PORT);
console.log(`Server running on port ${PORT}`);