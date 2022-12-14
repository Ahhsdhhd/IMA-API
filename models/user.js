const mongoose = require('mongoose');



const Schema = mongoose.Schema;



const userSchema = new Schema({

username:{type:String},
password:{type:String},

created_at:{type:Number , default:Date.now().valueOf()},
updated_at:{type:Number , default:Date.now().valueOf()}


})


module.exports = mongoose.model('user',userSchema)
