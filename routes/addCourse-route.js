const { json } = require('body-parser');
const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Courses } = require('../models/addcourse');


//=>localhost:3000/courses

router.get('/',(req,res)=>{

    Courses.find((err,doc)=>{
        if(!err){res.send(doc); }
        else { console.log('error in retriving courses api' + JSON.stringfy(err, undefined, 2));}

    });

//id
router.get('/:id',(req,res)=>{

if(!ObjectId.isValid(req.params.id))
return res.status(400).send('No reccord found of this id : ${req.param.id} ');

Courses.findById(req.params.id,(err, doc)=>{

    if(!err){res.send(doc); }
    else { console.log('error in retriving courses ' + JSON.stringfy(err, undefined, 2));}


});

});

});
router.post('/',(req,res)=>{

 var addcourse = new Courses({

    courseName: req.body.courseName,

    dateOfCourseCommencement: req.body.dateOfCourseCommencement,

    dateOfCoursePassout: req.body.dateOfCoursePassout



 });
 addcourse.save((err,docs)=>{
    if(!err){res.send(docs); }
    else { console.log('error in saving courses ' + JSON.stringify(err, undefined, 2));}

 });

   
});

//update


router.put('/:id',(req,res)=>{

    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No reccord found of this id : ${req.param.id} ');


    var addcourse = ({

        courseName: req.body.courseName,
    
        dateOfCourseCommencement: req.body.dateOfCourseCommencement,
    
        dateOfCoursePassout: req.body.dateOfCoursePassout
    
    
    
     });
     
     addcourse.findByIdAndUpdate(req.params.id,{$set: addcourse},{new:true},(err,doc)=>{
        if(!err){res.send(doc);}
        else { console.log('error in updating courses ' + JSON.stringify(err, undefined, 2));}
    
     });
   
    });
    router.delete('/:id',(req, res)=>{


        if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No reccord found of this id : ${req.param.id} ');

        addcourse.findByIdAndRemove(req.params.id, (err, doc)=>{
            if(!err){res.send(doc);}
            else { console.log('error in updating courses ' + JSON.stringify(err, undefined, 2));}

    });
});
   
  

module.exports = router;

