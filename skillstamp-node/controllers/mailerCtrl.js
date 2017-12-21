import nodemailer from 'nodemailer';
import config from '../config/config';

module.exports = {
    sendMail: (to, from, subject, text,cb)=> {


        // set the email and password for sending email
        var mailOpts, smtpTrans;
        smtpTrans = nodemailer.createTransport( {
            service: 'Gmail',
            auth: {
                user: 'emailofsender@something.com',
                pass: 'password of email'
            }
        });
        //Mail options
        mailOpts = {
            from: from , //grab form data from the request body object
            to: to,
            subject: subject,
            html: text
        };
        smtpTrans.sendMail(mailOpts, (error, response) => {
            if (error) {
                cb(error, null);
            } else {
                cb( null,response)
            }
        });
    }
}
