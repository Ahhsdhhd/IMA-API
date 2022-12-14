const { json } = require("body-parser");
const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { ExpenditureForm } = require("../models/expenditureForm");

//=>localhost:3000/ExpenditureForm-----------------------------------------------------------------------------------------------------------------------

router.get("/", (req, res) => {
  ExpenditureForm.find((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "error in retriving ExpenditureForm api" +
          JSON.stringfy(err, undefined, 2)
      );
    }
  });

  //GET ID   ----------   *****   -------------------------------------------------------------------------------------------------------------------

  router.get("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res
        .status(400)
        .send("No reccord found of this id : ${req.param.id} ");

    ExpenditureForm.findById(req.params.id, (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "error in retriving ExpenditureForm " +
            JSON.stringfy(err, undefined, 2)
        );
      }
    });
  });
});

//POST--------------------------------------------------------------------------*-------------------------------------------------------------------
router.post("/", (req, res) => {
  var addExpenditureForm = new ExpenditureForm({
    recordNumber: req.body.recordNumber,
    gcType: req.body.gcType,
    gcNumber: req.body.gcNumber,
    name: req.body.name,
    battalion: req.body.battalion,
    company: req.body.company,
    date: req.body.date,
    billNoDetails: req.body.billNoDetails,
    ExpenditureAmount: req.body.ExpenditureAmount,
  });
  addExpenditureForm.save((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "error in saving ExpenditureForm " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

//------------------------------------UPDATE------------------------------------------------------------------------------------------------------------

router.put("/:gcNumber", (req, res) => {
  if (!ObjectId.isValid(req.params.gcNumber))
    return res
      .status(400)
      .send("No reccord found of this id : ${req.param.id} ");

  var addExpenditureForm = {
    recordNumber: req.body.recordNumber,
    gcType: req.body.gcType,
    gcNumber: req.body.gcNumber,
    name: req.body.name,
    battalion: req.body.battalion,
    company: req.body.company,
    date: req.body.date,
    billNoDetails: req.body.billNoDetails,

    ExpenditureAmount: req.body.ExpenditureAmount,
  };

  addExpenditureForm.findByIdAndUpdate(
    req.params.gcNumber,
    { $set: addExpenditureForm },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "error in updating ExpenditureForm " +
            JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});
//////----------------------------------------------------DELETE BY GC NUMBER------------------------------------------------------------------------------------------
router.delete("/gcNumber/:gcNumber", (req, res) => {
  if (!ObjectId.isValid(req.params.gcNumber))
    return res
      .status(400)
      .send("No reccord found of this id : ${req.param.id} ");

  ExpenditureForm.findByIdAndRemove(req.params.gcNumber, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "error in updating ExpenditureForm " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

///------------------------------------------------  BULK POST EXPENDITURE FORM -------------------------------------------------------------------

// router.post("/bulkAdd", (req, res) => {
//   var bulkExpenditureForm = new ExpenditureForm({
//     recordNumber: req.body.recordNumber,

//     gcType: req.body.gcType,
//     gcNumber: req.body.gcNumber,
//     name: req.body.name,
//     battalion: req.body.battalion,
//     company: req.body.company,
//     date: req.body.date,
//     billNoDetails: req.body.billNoDetails,
//     ExpenditureAmount: req.body.ExpenditureAmount,
//   });

//   bulkExpenditureForm.save((err, docs) => {
//     if (!err) {
//       res.send(docs);
//     } else {
//       console.log(
//         "error in saving ExpenditureForm " + JSON.stringify(err, undefined, 2)
//       );
//     }
//   });
// });

///  -------------------------------------- BULK DELETE EXPENDITURE FORM -------------------------------------------------------------------

router.delete("/bulkDelete", (req, res) => {
  ExpenditureForm.deleteMany(
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

///------------------------------------search by date-----------------------------------------------------------------------------------




router.post("/search/date", (req, res) => {
  ReportForm.find(
    {
      date: req.body.date
     
    },
    (err, doc) => {
      if (!err) {
       
       

      } else {
        console.log(
          "error in retriving Form api" + JSON.stringfy(err, undefined, 2)
        );
      }
    }
  );
});
////----------------------------------------- BULK ADD EXPENDITURE FORM  -----------------------------------------------------------------
/*
router.post("/bulkAdd", (req, res) => {
  const body = req.body;
  console.log(body);

  var bulkExpenditureForm = new ExpenditureForm({
    gcType: req.body.gcType,
    gcNumber: {
      $gte: req.body.startingGcNumber,
      $lte: req.body.endingGcNumber,
    },
    name: req.body.name,
    battalion: req.body.battalion,
    company: req.body.company,
    date: req.body.date,
    billNoDetails: req.body.billNoDetails,
    ExpenditureAmount: req.body.ExpenditureAmount,
  });

  ExpenditureForm.Save(bulkExpenditureForm, function (error, inserted) {
    if (error) {
      console.error(error);
    } else {
      console.log("Successfully inserted: ", inserted);
    }
  }); // end of insert
});
*/
module.exports = router;
