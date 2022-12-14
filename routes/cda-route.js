const { json } = require('body-parser');
const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { cdaForm } = require('../models/cda');


//=>localhost:3000/cdaForm

router.get('/',(req,res)=>{

    cdaForm.find((err,doc)=>{
        if(!err){res.send(doc); }
        else { console.log('error in retriving cdaForm api' + JSON.stringfy(err, undefined, 2));}

    });

//id
router.get('/:id',(req,res)=>{

if(!ObjectId.isValid(req.params.id))
return res.status(400).send('No reccord found of this id : ${req.param.id} ');

cdaForm.findById(req.params.id,(err, doc)=>{

    if(!err){res.send(doc); }
    else { console.log('error in retriving cdaForm ' + JSON.stringfy(err, undefined, 2));}


});

});

});
router.post('/',(req,res)=>{

 var addcdaForm = new cdaForm({

    date:req.body.date,
    course:req.body.course,
    amount: req.body.amount,
    country :req.body.country,
    passedByCda: req.body.passedByCda,
    remark: req.body.remark,
    
   


 });
 addcdaForm.save((err,docs)=>{
    if(!err){res.send(docs); }
    else { console.log('error in saving cdaForm ' + JSON.stringify(err, undefined, 2));}

 });

   
});

//update


router.put('/:id',(req,res)=>{

    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No reccord found of this id : ${req.param.id} ');


    var addcdaForm = ({
        date:req.body.date,
    course:req.body.course,
    amount: req.body.amount,
    country :req.body.country,
    passedByCda: req.body.passedByCda,
    remark: req.body.remark,
    
    
    
    
    
     });
     
     addcdaForm.findByIdAndUpdate(req.params.id,{$set: addcdaForm},{new:true},(err,doc)=>{
        if(!err){res.send(doc);}
        else { console.log('error in updating cdaForm ' + JSON.stringify(err, undefined, 2));}
    
     });
   
    });
    router.delete('/:id',(req, res)=>{


        if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No reccord found of this id : ${req.param.id} ');

        addcdaForm.findByIdAndRemove(req.params.id, (err, doc)=>{
            if(!err){res.send(doc);}
            else { console.log('error in updating cdaForm ' + JSON.stringify(err, undefined, 2));}

    });
});
   
  

module.exports = router;

