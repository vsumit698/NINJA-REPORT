const passport  = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const userModel = require('../models/userModel');

const bcrypt = require('bcrypt');


passport.use(new LocalStrategy(// this is for authenticate the user with the database...
    {usernameField:'email',
    passwordField:'password',
    passReqToCallback:true },
    function(req,email,password,done){

        userModel.findOne({email:email},function(err,user){
            if(err){
                console.log("error in finding mail of user in DB",err);
                req.flash('error',err);
                done(err);
                return;
            }
            if(user){
                bcrypt.compare(password,user.password,function(err,result){
                    if(err){
                        console.log("error in comparing password",err);
                        req.flash('error',err);
                        done(err);
                        return;
                    }

                    if(result){
                        done(null,user);
                    }else{
                        req.flash('error',"Invalid username / password");
                        done(null,false);
                    }
                });
            }else {
                req.flash('error',"Invalid username / password");
                done(null,false);
            }
            
        });
    }    
));

// putting respective value of user key(below used _id key of user) in the session cookies
passport.serializeUser(function(user,done){ 
    done(null,user._id);
});

passport.deserializeUser(function(id,done){
    userModel.findById(id,function(err,user){
        if(err){
            console.log("error in finding mail of user in DB",err);
            done(err);
            return;
        }
        done(null,user);
    });
});

// if user is authenticated then providing user info to the user.ejs to display user profile
passport.setAuthenticator = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;

    }
    next();
};

module.exports = passport;