module.exports.setFlash = function(req,res,next){
    //console.log("after Setting in middleWare",req.flash('success'));
    // able to access req.flash('keyType') only once after it gets deleted
    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error')
    }
    
    next();
}