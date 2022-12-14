//ADD COURSE SCHEMA

const mongoose = require('mongoose');

var Courses = mongoose.model('Courses',{

  
    
        courseName:{
            type:String  
        },

        dateOfCourseCommencement:{
            type:String
        },
        dateOfCoursePassout:{
            type:String
        }
    


});




module.exports = {Courses};
