const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
//var configDB = require('./config/database.js');

mangoose.connect('mongod:localhost/testForAuth');
var db = mongoose.connection;

db.once('error', console.error.bind(console, 'connection error: '));
db.once('open', ()=>{
    console.log('Database connections success!');
});

app.use(json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'));
app.use(cookieParser());

app.use(session({
    secret:'my-secret',
    resave:false,
    saveUninitialized:false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

app.use(express.static(__dirname + '/templates'));

var routes = require('./routes/router');
app.use('/',routes);

app.use((req,res,next)=>{
    var err = new Error('File not found');
    res.status = 404;
    next(err);
});

app.use((err, req,res,next)=>{
    res.status(err.status || 500);
    ers.send(err.message);
})

app.listen(port, ()=>{
    console.log('Express app listening on port', port);
})