const { json } = require("body-parser");
const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { GcForm } = require("../models/gcform");

//=>localhost:3000/GcForm

router.get("/", (req, res) => {
  GcForm.find((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "error in retriving GcForm api" + JSON.stringfy(err, undefined, 2)
      );
    }
  });

  //id
  router.get("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res
        .status(400)
        .send("No reccord found of this id : ${req.param.id} ");

    GcForm.findById(req.params.id, (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "error in retriving GcForm " + JSON.stringfy(err, undefined, 2)
        );
      }
    });
  });
});
router.post("/", (req, res) => {
  var addgcform = new GcForm({
    gcNumber: req.body.gcNumber,
    gcType: req.body.gcType,
    name: req.body.name,
    battalion: req.body.battalion,
    company: req.body.company,
    dateOfJoining: req.body.dateOfJoining,
    course: req.body.course,
    bankAccount: req.body.bankAccount,
    country: req.body.country,
    status: req.body.status,
    remark: req.body.remark,
  });
  addgcform.save((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "error in saving GcForm " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

//update

router.put("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send("No reccord found of this id : ${req.param.id} ");

  var addgcform = {
    gcNumber: req.body.gcNumber,
    gcType: req.body.gcType,
    name: req.body.name,
    battalion: req.body.battalion,
    company: req.body.company,
    dateOfJoining: req.body.dateOfJoining,
    course: req.body.course,
    bankAccount: req.body.bankAccount,
    country: req.body.country,
    status: req.body.status,
    remark: req.body.remark,
  };

  addgcform.findByIdAndUpdate(
    req.params.id,
    { $set: addgcform },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "error in updating GcForm " + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});
router.delete("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send("No reccord found of this id : ${req.param.id} ");

  addgcform.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "error in updating GcForm " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

////by course
router.get('/course/:course',(req,res)=>{

 var typeOfForm="gc";
    var course = req.params.course;
    GcForm.find({course ,typeOfForm},(err, doc)=>{
    
        if(!err){res.send(doc); }
        else { console.log('error in retriving GcForm ' + JSON.stringfy(err, undefined, 2));}
    
    
    });
    
    });

module.exports = router;
