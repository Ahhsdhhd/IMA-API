const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { ReportForm } = require("../models/report");
var { ExpenditureForm } = require("../models/expenditureForm");
var { BillingForm } = require("../models/billingForm");
const e = require("express");

//=>localhost:3000/BillingForm

//get all 
router.get("/", (req, res) => {
  ReportForm.find((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "error in retriving ExpenditureForm api" +
          JSON.stringfy(err, undefined, 2)
      );
    }})
  });



////////////////

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
/////////////////////////////////////////search by date////////////////////////////////////
router.get("/bydate", (req, res) => {
  ReportForm.find(
    {
      date: {
        $gte: req.body.startingDate,
        $lte: req.body.endingDate,
      },
    },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "error in retriving Form api" + JSON.stringfy(err, undefined, 2)
        );
      }
    }
  );
});

////-----------------------------------------             BULK ADD EXPENDITURE FORM           ------------------------------------------------------------

router.post("/bulkAdd", async (req, res) => {
  ReportForm.find(
    {
      gcNumber: {
        $gte: req.body.startingGcNumber,
        $lte: req.body.endingGcNumber,
      },
      typeOfForm: "gc",
    },
    (err, doc) => {
      if (!err) {
        let gcType = req.body.gcType;
        let billNoDetails = req.body.billNoDetails;
        let ExpenditureAmount = req.body.ExpenditureAmount;
        let ExpenditureLength = req.body.recordNumber;
        let date = req.body.date;
        let i = 0;
        for (const element of doc) {
          i = i + 1;
          ExpenditureForm.create({
            recordNumber: ExpenditureLength + i,
            name: element.name,
            gcType: gcType,
            company: element.company,
            battalion: element.battalion,
            gcNumber: element.gcNumber,
            country: element.country,
            billNoDetails: billNoDetails,
            ExpenditureAmount: ExpenditureAmount,
            date: date,
          });
        }

        res.send("Successfully Added");
      }
    }
  );
});

////-------------------------------------------------------------------------search by country-----------------------//////////////////////////////////////////////////

////------------------search by gcType prefix---------------------------------

router.get("/prefix/:prefix", (req, res) => {
  ReportForm.find({ prefix: req.params.gcType }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "error in retriving Form api" + JSON.stringfy(err, undefined, 2)
      );
    }
  });
});

//////----------------------------------------------------------------------------
router.get("/country/:country", (req, res) => {
  ReportForm.find({ country: req.params.country }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "error in retriving Form api" + JSON.stringfy(err, undefined, 2)
      );
    }
  });
});

////////////////-------------------------------------------------------search  by battalion--------------------------//////////////////////////////////////////////

router.get("/battalion/:battalion", (req, res) => {
  ReportForm.find({ battalion: req.params.battalion }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "error in retriving Form api" + JSON.stringfy(err, undefined, 2)
      );
    }
  });
});

///////////////////-------------------------------------------------search by status -------------------------/////////////////////////////////////////////////////

router.get("/status/:status", (req, res) => {
  ReportForm.find({ status: req.params.status }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "error in retriving Form api" + JSON.stringfy(err, undefined, 2)
      );
    }
  });
});
/////////////////////////////////------------------------------------search by billNoDetails-----------------------////////////////////////////
router.get("/billNoDetails/:billNoDetails", (req, res) => {
  ReportForm.find({ billNoDetails: req.params.billNoDetails }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "error in retriving Form api" + JSON.stringfy(err, undefined, 2)
      );
    }
  });
});

///----------------search by company*---------------------------------------------------------/////////////////////////

router.get("/company/:company", (req, res) => {
  ReportForm.find({ company: req.params.company }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "error in retriving Form api" + JSON.stringfy(err, undefined, 2)
      );
    }
  });
});
///////////////////////////////------------------------------------search by Month ---------------------------------////////////////////////////////

router.get("/month/:month", (req, res) => {
  ReportForm.find(
    {
      month: {
        $gte: req.params.startingDate,
        $lte: req.params.endingDate,
      },
    },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "error in retriving Form api" + JSON.stringfy(err, undefined, 2)
        );
      }
    }
  );
});
/////////////////////------------------------------search api END-----------------------------------------------------------------
////receipt form
router.post("/bulkReceiptAdd", async (req, res) => {
  ReportForm.find(
    {
      gcNumber: {
        $gte: req.body.startingGcNumber,
        $lte: req.body.endingGcNumber,
      },
      typeOfForm: "gc",
      country: "req.body.country",
    },
    (err, doc) => {
      if (!err) {
        let gcType = req.body.gcType;
        let billNoDetails = req.body.billNoDetails;
        let amount = req.body.amount;
        let recordNumber = req.body.recordNumber;
        let date = req.body.date;
        let i = 0;
        for (const element of doc) {
          i = i + 1;
          BillingForm.create({
            recordNumber: recordNumber + i,
            name: element.name,
            gcType: gcType,
            company: element.company,
            battalion: element.battalion,
            gcNumber: element.gcNumber,
            country: element.country,
            billNoDetails: billNoDetails,
            amount: amount,
            date: date,
          });
        }

        res.send("Successfully Added ");
      }
    }
  );
});

module.exports = router;
