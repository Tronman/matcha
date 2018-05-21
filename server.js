const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');

mangoose.connect(configDB.url);

app.use(json())
app.use(morgan('dev'));
app.use(cookieParser());

app.use(session({
    secret:'max',
    resave:false,
    saveUninitialized:false,
}));