
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
const  session = require('express-session');

var MongoStore = require('connect-mongodb-session')(session);
//var configDB = require('./config/database.js');
var app = express();

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/db');
var db = mongoose.connection;

db.once('error', console.error.bind(console, 'connection error: '));
db.once('open', ()=>{
    console.log('Database connections success!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use(session({
    secret:'my-secret',
    resave:false,
    saveUninitialized:false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(express.static(__dirname + '/templates'));

var routes = require('./routes/router');
app.use('/',routes);
app.use((req,res,next)=>{
    var err = new Error('File not found');
    err.status = 404;
    next(err);
});

app.use((err, req,res,next)=>{
    res.status(err.status || 500);
    res.send(err.message);
});

app.listen(port, ()=>{
    console.log('Express app listening on port', port);
})