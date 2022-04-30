# Tech Stack

Our web app uses React.js for the front-end and Mongo DB for the database.

## Back-end

The back-end connection to the Mongo DB database is in the ```server``` directory: specifically,  ```server/db.js```. ```server/server.js``` does the heavy lifting to combine the routes created, start the database, and launch the local server.

## API Endpoints

Code for the endpoints is in ```server/routes```. ```server/routes/default.js```, ```server/routes/user.js``` and ```server/routes/devapi.js``` store the functions which handle each endpoint. ```server/routes/main.js``` defines the actual endpoints for those functions.

## Front-end

Front-end code is in the ```client``` directory. ```client/src``` stores the React components which make up most of the front-end, with ```client/src/styles``` handling the css styling of those components. The entry point of the front-end is the index.html file in ```client/public```. 