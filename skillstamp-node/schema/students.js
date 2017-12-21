import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

var Schema = mongoose.Schema;

var studentSchema = new Schema({
    
    firstName:{ type:String },
    lastName:{ type:String },

    country:{ type:String },
    education:{ type:String },
    city:{ type:String },

    password:{ type:String },
    reference:{ type:String, lowercase: true },

    phone:{ type:String },
    email:{ type:String,lowercase: true },

    course:{ type:String },
    createDate:{
        type:String,
        required:false,
        default: Date.now
    }
});


module.exports = mongoose.model('student',studentSchema);