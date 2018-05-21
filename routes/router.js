var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', (req, res, next)=>{
    return res.sendFile(path.join(__dirname + ' ../index.html'));
});

router.post('/', (req, res, next)=>{
    if(req.body.password !== res.body.passwordConf){
        var err = new Error('Password do not match');
        err.status = 400;
        res.send("password dont match");
        return next(err);
    }

    if(req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf){
        var UserData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf:req.body.passwordConf
        }
        User.create(UserData, (error, user)=>{
            if(error){
                return next(error);
            }else{
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
    
        });
    }else if(req.body.logemail && req.body.logpassword){
        
    }
    


})