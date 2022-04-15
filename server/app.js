const express = require('express');
const mongodb = require('mongodb');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(authRoutes);

app.get('./set-cookies', (req, res) => {

});

app.get('./read-cookies', (req, res) => {
    
});