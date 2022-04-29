const express = require('express')
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json()); 
app.use(cookieParser());

// view engine
app.set('view engine', 'jsx');

// routes
app.use(authRoutes);
