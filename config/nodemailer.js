const nodemailer = require('nodemailer');

module.exports.transporter = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    service : 'gmail',
    port : '587',
    secure : false,
    auth : {
        user : 'vsumit698@gmail.com',
        pass : '********'
    }
});

module.exports.renderTemplate = (data,releativePath) => {
    let mailHTML;
    require('ejs').renderFile(
        require('path').join(__dirname,'../views/mailers',releativePath),
        data,
        function(error,template){
            if (err){console.log('error in rendering template'); return}
         
            mailHTML = template;
        }
    );
    return mailHTML;
}
