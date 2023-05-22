const mongoose = require('mongoose')

const dataByAi= new mongoose.Schema({
  mongooseCredentials: {
    type: Object,
    documentsName: {
      type: Array,
    },
  },
  postgresCredentials: {
    type: Object,
    tablesName: {
      type: Array,
    },
  },
})

module.exports = mongoose.models.dataByAi || mongoose.model('dataByAi' , dataByAi);