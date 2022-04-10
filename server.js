var express = require("express")
var app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Make connection with mongoDB database

// Start server

var HTTP_PORT = 5000

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});


// Get all surveys (Home screen request)

// Add a survey to database (Create Survey Screen submission)


// Get all of the surveys the user has created (My surveys screen request)

// Get all the responses from a particular survey created by a particular user (Specific survey resposnes screen)

// Add a response to an existing survey (Filling out Survey screen submission)




