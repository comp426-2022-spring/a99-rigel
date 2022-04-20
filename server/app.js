const express = require('express');
const mongodb = require('mongodb');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'jsx');

// routes
app.use(authRoutes);
