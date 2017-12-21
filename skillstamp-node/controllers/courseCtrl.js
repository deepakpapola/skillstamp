
import { Courses } from '../schema';

module.exports = {

    newCourse : (req,res) => {  // console.log(' req.body is =====  ',req.files, req.body);

    let body = req.body;
    
    var newCourse = new Courses();
    newCourse.courseName = body.courseName;
     
    let certicates={}
    certicates.certificateName = body.certificateName;
    certicates.certificateCourseTime = body.certificateCourseTime;
    certicates.startTime = body.startTime
    certicates.certificateImage = req.files[0].path;
   
    

    Courses.findOne({courseName:body.courseName},(err,course)=> {  console.log('course ',course);
    if(err){
        console.log('err is',err);
        res.send({error:"server is not responding right now please try after some time"});
    }
    if(course){
        course.cirtificate.push(certicates);
        course.save((err,cirtificate) => {
            if(err) {
                throw err;
                res.send({ success:false, message:'Error while uploading,Try again' })
            } else {
                console.log('new cirtificate added',cirtificate);
                res.send({ success:true, message:`New cirtificate uploaded in --- ${course.courseName}` });
            }
            return;
        })
    }else{

        newCourse.cirtificate.push(certicates);
        newCourse.save((err,course) => {
            if(err) {
                throw err;
                res.send({ success:false, message:'Error while uploading,Try again' })
            } else {
                console.log('new course added',course);
                res.send({ success:true, message:'New course uploaded ' });
            }
            return;
        })
            
    }
    });


       
    }
}
