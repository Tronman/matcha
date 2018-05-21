var express = require('express');
var router = express.Router();
var User = require('../models/user');

// GET route for reading data
router.get('/', (req, res, next)=>{
    return res.sendFile(path.join(__dirname + ' ../index.html'));
});

//POST rout for updating data
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
        User.authenticate(req.body.logemail, body.body.logpassword, (error, user)=>{
            if(error || !user){
                var err = new Error('wrong email or password');
                err.status = 401;
                return next(error);
            } else{
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });

    } else {
        var err = new Error(' All field are required.');
        err.status = 400;
        return next(err);
    }
})

//GET route after registering
router.get('/profile',(req,res,next)=>{
    User.findById(req.session.userId).exec((error,user)=>{
        if(error){
            return next(error);
        }else{
            if(user == null){
                var err = new Error('Not authorized! Go bacl!');
                err.status = 400;
                return next(err);
            }else{
                return res.send('<h1>Name: </h1>' + user.username +'<h2>Mail: </h2>'+user.email+'<br><a type="button" href="/logout">logout</a>' )
            }
        }
    });
});

//GET for logout 
router.get('/logout', (req,res,next)=>{
    if(req.session){
        req.session.destroy((err)=>{
            if(err){
                return next(err);
            } else{
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;