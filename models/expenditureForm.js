//ADD expenditure form

const mongoose = require('mongoose');



const Schema = mongoose.Schema;


var ExpenditureForm = mongoose.model('ExpenditureForm', {

   typeOfForm: {
      type: String,
      default: "expenditure"
   },

   recordNumber: {
      type: String
   },
   gcType: {
      type: String
   },
   gcNumber: {
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
   date: {
      type: String
   },

   billNoDetails: {
      type: String
   },
   ExpenditureAmount: {
      type: String
   }
}, "Form")


module.exports = { ExpenditureForm };
