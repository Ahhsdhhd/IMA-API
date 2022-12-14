//ADD COURSE SCHEMA

const mongoose = require('mongoose');



const Schema = mongoose.Schema;


var GcForm = mongoose.model('GcForm', {


  typeOfForm: {
    type: String,
    default: "gc"
  },
  gcNumber: {
    type: String
  },
  gcType: {
    type: String
  },
  name: {
    type: String
  },
  battalion: {
    type: String
  },
  company: {
    type: String
  },
  dateOfJoining: {
    type: String
  },
  course: {
    type: String
  },
  bankAccount: {
    type: String
  },
  country: {
    type: String
  },
  status: {
    type: String,
    default: "active"
  },
  remark: {
    type: String
  }
}, "Form")


module.exports = { GcForm };
