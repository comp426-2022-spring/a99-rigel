# Tech Stack

Our web app uses React for the frontend and Mongo DB for the backend.

## Backend

The backend connection to the Mongo DB database is in the ```server``` directory specifically the ```db.js``` file. ```server.js``` does all the heavy lifting to combine the routes created, start the database, and launch the local server.

## API Endpoints

The actual endpoints are in the ```route``` directory under the server directory. ```default.js``` has all the function for the routes. ```main.js``` creates the actual endpoints from the functions in default. ```authRoutes.js``` handles authentication routes.

## Frontend

Frontend is in the ```client``` directory. ```src``` has most of the components and logic of the frotend.