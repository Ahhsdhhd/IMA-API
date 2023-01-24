//ADD expenditure form

const mongoose = require('mongoose');



const Schema = mongoose.Schema;


var BillingForm = mongoose.model('BillingForm',{


   typeOfForm:{
      type:String,
      default:"billing"
        },
    recordNumber:{
        type:String
    },
    gcType:{
      type:String
      
    },
    gcNumber:{
       type:String
    },
   
    name:{
       type:String
    },
      battalion:{
        type:String
     },
       company:{
        type:String
     },
       date:{
        type:String
     },
      
       billNoDetails:{
        type:String
     },
     type:{
      type:String
   },
      amount:{
        type:String
     },
     ExpenditureAmount: {
      type: Number,
      default:"0.00"
   }
},"Form")


module.exports = {BillingForm};
