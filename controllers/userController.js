const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const mailers = require('../mailersFunctions/sendPassword');

module.exports.signUp = function(req,res,next){// Sign up Controller
    if(req.isAuthenticated()){
        res.redirect('/');
        return;
    }

    res.render('signUp',{title:"Ninjas Report"});
}

module.exports.signIn = function(req,res,next){//Sign In Controller
    if(req.isAuthenticated()){
        res.redirect('/');
        return ;
    }
    res.render('signIn',{title:"Ninjas Report"});
}


module.exports.createUser = async function(req,res,next){ // create user Controller
    try {
        // password and confirm password are not same
        if(req.body.password != req.body.confirmPassword){
            req.flash('error','Password and Confirm Password are Same');
            res.redirect('back');
            return;
        }

        var userFound = await userModel.findOne({email:req.body.email});

        if(userFound){
            req.flash('error','Email Already Registered');
            console.log("Email already exists");
            res.redirect('back');
            return;
        }
        // for encrypting password
        var encPass = await bcrypt.hash(req.body.password,10);

        await userModel.create({name : req.body.name, email : req.body.email, password : encPass});

        req.flash('success','Account Created Successfuly');
        res.redirect('/user/sign-in');

    } catch (error) {
        console.log("error in Server Occured",error);
    }
}

module.exports.createSession = function(req,res,next){ //create session Controller
    // console.log("before Setting",req.flash('success'));
    req.flash("success","logged in successfuly");// setting msg for success key in flash msg.
    
    res.redirect('/'); // taking to the home of Authentication
}

module.exports.deleteSession = function(req,res){// log-out controler
    if(req.isAuthenticated()){
        req.logout();
        req.flash("success","logged out !");
        res.redirect('/');
        return;
    }
    res.redirect('back'); // taking to the home page
}

module.exports.resetPassword = function(req,res){//  resetPassword page
    if(req.isAuthenticated()){
        res.render('reset',{title:"Ninjas Report"});
    }
}
module.exports.updatePassword = async function(req,res){//  update Password controller
    try {
        if(req.isAuthenticated()){
            var same = await bcrypt.compare(req.body.password,req.user.password);
            if(!same || (req.body.newPassword != req.body.confirmNewPassword) ){
                req.flash("error","Passwords are invalid");
                res.redirect('/user/reset-password');
                return;
            }
            // ready to update password
            var user = await userModel.findById(req.user.id);
            var encryptPassword = await bcrypt.hash(req.body.newPassword,10);
            user.password = encryptPassword;
            user.save();
            req.flash("success","Password Updated");
        }    
        res.redirect('/');
    } catch (error) {
        console.log("error in Server Occured",error);
    }
}

module.exports.forgotPassword = function(req,res){
    if(!(req.isAuthenticated())){
        res.render('forgotPassword',{title:"Ninjas Report"});
        return;
    }
    res.redirect('/user/sign-in');
}
module.exports.setupForgotPassword = async function(req,res){
    try {
        if(!(req.isAuthenticated())){
        var foundMail = await userModel.findOne({email : req.body.email});

        if(!foundMail){
            req.flash('error','Mail Not Registered');
            res.redirect('/user/forgot-password');
            return;
        }
        console.log('Mail Found SuccessFully');
       
        var resetPassword = getRandomPassword();

        mailers.sendPassword(req.body.email,resetPassword);
        // update password in database
        var user = await userModel.findOne({email : req.body.email});

        user.password = await bcrypt.hash(resetPassword,10);
        user.save();

        req.flash('success','Mail Sent Successfully :)');
        };

        res.redirect('/user/sign-in');

    } catch (error) {
        console.log("error in Server Occured",error);
    }
}

// function to generate random password
function getRandomPassword(){
    var password = "";
    for(let i=0;5>i;i++){
        password += Math.floor(Math.random()*10);
    }
    return password;
}