import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var Certificate = new Schema({
    certificateName:{
        type:String
    },
    certificateImage:{ 
        type:String
    },
    certificateCourseTime:{ 
        type:String
    },
    startTime:{ 
        type:String
    }
});

var courseSchema = mongoose.Schema({
  
    courseName:{ type:String,default: 'none'},
 
    cirtificate: {type: [Certificate]},

});



module.exports = mongoose.model('course',courseSchema);