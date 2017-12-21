import crypto from 'crypto';
import nodemailer  from 'nodemailer';
import {Student,Token, Courses } from '../schema';
import config  from '../config/config';
import { Strategy } from "passport-local";
import jwt  from 'jsonwebtoken';
import MailerCtrl from './mailerCtrl';

let  STUDENTS = {

login : (req,res) =>{ 
    let {email,password} = req.body;  //console.log('req ',req.body);
    if(email && password){
        
        // req.checkBody("email", "please enter valid input").isEmail();
        // req.checkBody("password", "please enter valid input").isLength({min:1, max: undefined})();


        // var errors = req.validationErrors();
        // if (errors) {console.log(errors)
        //   res.send({success:false,msg:errors[0].msg });
        //   return;
        // } else {
            Student.findOne({email:email},function(err,user){  //console.log('user ',user);
                if(err){
                    console.log('err is',err);
                    res.send({message:"server is not responding right now please try after some time",success: false});
                }
                if(!user){
                    res.send({success: false,message:'this email is not registered!',code:100});
                }
                
                if(user.password!== password){
                    console.log('not valid pass');
                    res.send({success: false,message:'wrong password'});
                }else{
                    Courses.find({courseName:user.course},(err,cirtificates)=>{
                        if(err) res.send({message:"server is not responding ,please try after some time",success: false});

                        let token = jwt.sign({user}, config.secret, {expiresIn : 60*60*24});
                        console.log('cirtificates is '+cirtificates);
                        res.send({success: true,message:"welcome,you have successfully logged in",user:user,certificates:cirtificates,token: token});
                    })
                }
            });
        // }
    } else {
        res.send({success: false, message: 'valid input field required'});return
    }

},
 
/**
* POST /signup
*/
signup : (req, res) => { // console.log('new enroller/student is',req.body);

    req.checkBody("email", "please enter valid input").isEmail();

    req.checkBody("education", "please enter valid input").isLength({min:1, max: undefined});

    req.checkBody("city", "please enter valid input").isLength({min:1, max: undefined});
    req.checkBody("password", "please enter valid input").isLength({min:1, max: undefined});

    req.checkBody("phone", "please enter valid input").isNumeric();
    req.checkBody("confpassword", "please enter valid input").isAlpha();
    var errors = req.validationErrors();
    if (errors) {console.log(errors)
    res.send({success:false,message:errors[0].msg });
    return;
    } else {

        Student.findOne({ email: req.body.email },  (err, user) =>{
        
            if (user)return res.send({ success: false  });

            let newStudent = new Student(req.body);
            
            
            console.log('new student is',newStudent);
            newStudent.save( (err)=> {
                if (err) {return res.send({ success: false ,message:'this email already exist'}); 
            }

                let tokens= crypto.randomBytes(16).toString('hex');
                let token = new Token({ _userId: newStudent._id,token:tokens });
                token.save( (err)=> {
                    if (err) { return res.send({ message: 'server error! try again' }); }
        
/////////////                          change the email name and password 

                    let transporter = nodemailer.createTransport({ service: 'Gmail', auth: { user: 'emailof sender@something.com', pass: 'password for email' } });
                  
                  /////////////                          change the email name

                    let mailOptions = { from: 'skillstamps@gmail.com', to:req.body.email, subject: 'Account Verification ', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n'  };
                    
                    
                    transporter.sendMail(mailOptions, function (err) {
                        if (err) { return res.send({success: false , message: 'error while sending mail,try again..' }); }
                        console.log('mail sent');
                        res.send({success: true ,message:'Thanks for enrollinga,we sent you verification mail to ' + req.body.email + ' please confirm.'});
                    });
                });
            });
        });
    }
},

/**
* POST /confirmation
*/
confirmationPost :  (req, res)=> { 
 
    Token.findOne({ token: req.params.token }, function (err, token) {
        if (!token) return res.send({ success: false ,type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        Student.findOne({ _id: token._userId }, function (err, user) {
           
            user.save(function (err) {

                if (err) { return res.send({ msg: err.message }); }

                Courses.find({courseName:user.course},(err,certificates)=>{
                    if(err) res.send({message:"server is not responding ,please try after some time",success: false});
                    // console.log('verifiedm usr -',user);
                    console.log('certificates  -',certificates);
                    res.send( {success:true,user,certificates});

                    let html=`user- <strong>${user.firstName}${user.lastName}</strong><br>
                    has verified his email-<strong>${user.email}</strong> successfully.`
                    console.log('saved user'); 

/////////////                          change the email  

                    MailerCtrl.sendMail('skillstamps@gmail.com',user.email,'verified user',html, (err,mailSent) => {
                        if (err) { res.send({success:false,message:'server error,try again'});
                        res.send( {success:true,user,certificates});  
                        }
                    })
                    
                })
                
            });
        });
    });
},

editUser: (req,res) =>  { console.log('comin update =',req.body);
    Student.findByIdAndUpdate({_id : req.body._id},{$set:req.body},{new: true},(err, result) => {
        if(err) throw(err);
        console.log('updated=',result);
        res.send({ success:true ,user:result});
        return;
    });
}

 }
 export default STUDENTS;