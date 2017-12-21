import MailerCtrl from './mailerCtrl';
import {Questionaire} from '../schema';

module.exports = {

    newQuestion : (req,res) => { 

        req.checkBody("email", "please enter valid input").isEmail();
        req.checkBody("phoneNo", "please enter valid input").isNumeric();

        req.checkBody("query", "please enter valid input").isLength({min:1, max: undefined});

        var errors = req.validationErrors();
        if (errors) {console.log(errors)
          res.send({success:false,message:errors[0].msg });
          return;
        } else {
          
            let {name,email,phoneNo,query,course } = req.body;  console.log(' req.body is =====  ', req.body);
            let html=`someone has a query regarding.<br><br>
                        <strong>${course}</strong><br><br>
                        name of contacter=${name} <br> email is ${email}<br>
                        <br><br>Phone no = ${phoneNo} 
                        <br><br>and the question is = 
                        ${query}`;
            
            var newContact = new Questionaire(req.body);
            newContact.save((err,saved) =>{
                if(err){  res.send({success:false,message:'server error,try again'}); }

                //////////////////////////////////////////////// change the email name 'skillstamps@gmail.com' ///////////

                res.send({success:true});
                MailerCtrl.sendMail('skillstamps@gmail.com',email,query,html, (err,mailSent) => {
                    if (err) {  res.send({success:false,message:'server error,try again'}); } 
                    console.log('mail sent');
                })
            })
        }
        
    }
}
