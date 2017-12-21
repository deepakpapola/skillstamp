import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var askSchema = new Schema({
    
    name:String,
    email:{ type:String, lowercase: true},

    phoneNo:String,
    query:String,
    course:String,
    createDate:{
        type:String,
        required:false,
        default: Date.now
    }
});



module.exports = mongoose.model('queries',askSchema);