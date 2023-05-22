const mongoose = require('mongoose')

const dataByAi= new mongoose.Schema({
  mongooseCredentials : {
    type:Object,
  } , 

})

module.exports = mongoose.models.dataByAi || mongoose.model('dataByAi' , dataByAi);