//ADD expenditure form

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var ReportForm = mongoose.model(
  "ReportForm",
  {
    typeOfForm: {
      type: String,
    },
    gcNumber: {
      type: String,
    },
    gcType: {
      type: String,
    },
    name: {
      type: String,
    },
    battalion: {
      type: String,
    },
    company: {
      type: String,
    },
    dateOfJoining: {
      type: String,
    },
    course: {
      type: String,
    },
    bankAccount: {
      type: String,
    },
    country: {
      type: String,
    },
    status: {
      type: String,
    },
    remark: {
      type: String,
    },
    recordNumber: {
      type: String,
    },
    gcType: {
      type: String,
    },
    gcNumber: {
      type: String,
    },

    type: {
      type: String,
    },
    amount: {
      type: String,
    },
    date: {
      type: String,
    },

    billNoDetails: {
      type: String,
    },

    ExpenditureAmount: {
      type: String,
    },
  },
  "Form"
);

module.exports = { ReportForm };
