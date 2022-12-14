//ADD expenditure form

const mongoose = require('mongoose');



const Schema = mongoose.Schema;


var cdaForm = mongoose.model('cdaForm',{



    date:{
        type:String
    },course:{
      type:String
    },
        amount:{
       type:String
    },
   
  
       country:{
        type:String
     },
      
      
       passedByCda:{
        type:String
     },
       remark:{
        type:String
     }
})


module.exports = {cdaForm};
