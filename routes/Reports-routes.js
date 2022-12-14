const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { ReportForm } = require("../models/report");
var { ExpenditureForm } = require("../models/expenditureForm");
var {BillingForm} = require ("../models/billingForm");
const e = require("express");

//=>localhost:3000/BillingForm

router.get("/gcNumber/:gcNumber", (req, res) => {
  ReportForm.find({ gcNumber: req.params.gcNumber }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "error in retriving Form api" + JSON.stringfy(err, undefined, 2)
      );
    }
  });
});

////-----------------------------------------             BULK ADD EXPENDITURE FORM           ------------------------------------------------------------


router.post("/bulkAdd", async (req, res) => {
  ReportForm.find({ gcNumber: { $gte: req.body.startingGcNumber, $lte: req.body.endingGcNumber }, typeOfForm: "gc"},
    (err, doc) => {
      if (!err) {
        let gcType = req.body.gcType
        let billNoDetails = req.body.billNoDetails;
        let ExpenditureAmount = req.body.ExpenditureAmount;
        let ExpenditureLength = req.body.recordNumber;
        let date = req.body.date;
         let i=0
        for (const element of doc) {
          i = i+1
         ExpenditureForm.create({
            recordNumber : ExpenditureLength + i,
            name: element.name,
            gcType: gcType,
            company: element.company,
            battalion: element.battalion,
            gcNumber: element.gcNumber,
            country: element.country,
            billNoDetails: billNoDetails,
            ExpenditureAmount: ExpenditureAmount,
            date: date

          }
                
          )
        }
       
        res.send("Successfully Added")
      }
    }
  );

});

////receipt form
router.post("/bulkReceiptAdd", async (req, res) => {
  ReportForm.find({ gcNumber: { $gte: req.body.startingGcNumber, $lte: req.body.endingGcNumber }, typeOfForm: "gc"},
    (err, doc) => {
      if (!err) {
        let gcType = req.body.gcType
        let billNoDetails = req.body.billNoDetails;
        let amount = req.body.amount;
        let recordNumber = req.body.recordNumber;
        let date = req.body.date;
         let i=0
        for (const element of doc) {
          i = i+1
         BillingForm.create({
            recordNumber : recordNumber + i,
            name: element.name,
            gcType: gcType,
            company: element.company,
            battalion: element.battalion,
            gcNumber: element.gcNumber,
            country: element.country,
            billNoDetails: billNoDetails,
            amount: amount,
            date: date

          }
                
          )
        }
       
        res.send("Successfully Added")
      }
    }
  );

});

module.exports = router;
