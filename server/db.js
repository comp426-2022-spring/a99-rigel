import { MongoClient, ServerApiVersion } from 'mongodb';

const DB_NAME = process.env.DB_NAME || 'web';

// Make connection with mongoDB database
const uri = "mongodb+srv://rigel:q8rkIGoga1xafGmN@cluster0.l7bmq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// sanity check by listing all collection names
async function listDatabases(client){
    let databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

// Initialize connection once
function setDB(app) {
    MongoClient.connect(uri, async (err, database) => {
        if(err) throw err;
        app.set('db_connection', database);
        app.set('db', database.db(DB_NAME));
        console.log("Database is successfully connected.");
        listDatabases(database);
    });
}

export default setDB;

