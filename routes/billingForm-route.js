const { json } = require("body-parser");
const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { BillingForm } = require("../models/billingForm");

//=>localhost:3000/BillingForm

router.get("/", (req, res) => {
  BillingForm.find((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "error in retriving BillingForm api" + JSON.stringfy(err, undefined, 2)
      );
    }
  });

  //id
  router.get("/id/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res
        .status(400)
        .send("No reccord found of this id : ${req.param.id} ");

    BillingForm.findById(req.params.id, (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "error in retriving BillingForm " + JSON.stringfy(err, undefined, 2)
        );
      }
    });
  });
});
router.post("/", (req, res) => {
  var addBillingForm = new BillingForm({
    typeOfForm: req.body.typeOfForm,
    recordNumber: req.body.recordNumber,
    gcType: req.body.gcType,
    gcNumber: req.body.gcNumber,
    name: req.body.name,
    battalion: req.body.battalion,
    company: req.body.company,
    date: req.body.date,
    billNoDetails: req.body.billNoDetails,
    type: req.body.type,
    amount: req.body.amount,
  });
  addBillingForm.save((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "error in saving BillingForm " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

//update

router.put("/update/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send("No reccord found of this id : ${req.param.id} ");

  var addBillingForm = {
    recordNumber: req.body.recordNumber,
    gcType: req.body.gcType,
    gcNumber: req.body.gcNumber,
    name: req.body.name,
    battalion: req.body.battalion,
    company: req.body.company,
    date: req.body.date,
    billNoDetails: req.body.billNoDetails,
    type: req.body.type,

    amount: req.body.amount,
  };

  addBillingForm.findByIdAndUpdate(
    req.params.id,
    { $set: addBillingForm },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "error in updating BillingForm " + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});
router.delete("/update/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send("No reccord found of this id : ${req.param.id} ");

  addBillingForm.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "error in updating BillingForm " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});


///bulk delete receipt form


router.delete("/bulkDelete", (req, res) => {
    BillingForm.deleteMany(
      {
        gcNumber: {
          $gte: req.body.startingGcNumber,
          $lte: req.body.endingGcNumber,
        },
        billNoDetails: req.body.deleteBillNoDetails,
      },
      (err, data) => {
        if (!err) {
          console.log(data);
        }
      }
    );
  });
  

  ///////////////////////////bulk add
  


// router.post("/bulkAdd" , async (req, res) => {
//  const report = await ReportForm.find({ gcNumber: { $gte: req.body.startingGcNumber, $lte: req.body.endingGcNumber }, typeOfForm: "gc"})
//  console.log(report)


//   //       let gcType = req.body.gcType
//   //       let billNoDetails = req.body.billNoDetails;
//   //       let ExpenditureAmount = req.body.ExpenditureAmount;
//   //       let date = req.body.date;
//   //       for (const element of doc) {

//   //         ExpenditureForm.create({
//   //           // recordNumber : indexOf(element),
//   //           name: element.name,
//   //           gcType: gcType,
//   //           company: element.company,
//   //           battalion: element.battalion,
//   //           gcNumber: element.gcNumber,
//   //           country: element.country,
//   //           billNoDetails: billNoDetails,
//   //           ExpenditureAmount: ExpenditureAmount,
//   //           date: date

//   //         })
//   //       }
       
//   //       res.send("Successfully Added")
//   //     }
//   //   }
//   // );

// });

module.exports = router;
