const transporter = require('../config/nodemailer').transporter;



module.exports.sendPassword = function(email,password){
    var mailOptions = {
        from: 'vsumit698@gmail.com',
        to: email,
        subject: 'Your Password got Reset',
        html: `<h1>Your new Password is - ${password}</h1>`
    };

    transporter.sendMail(mailOptions,function(error,info){
        if (error) {
            console.log('Error Occured In Sending Mail',error);
        } else {
            req.flash('success','Password is SENT to your MAIL');
            console.log('Email sent: ' + info);
        }
    });
};