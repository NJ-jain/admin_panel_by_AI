const { default: axios } = require("axios");
const dataSchema = require("../mongoose/dataSchema");
const mongoose = require('mongoose')
async function getTableNameandDescriptionDBdash() {

  try {
    const response = await axios.get('https://dbdash-backend-h7duexlbuq-el.a.run.app/646db8fc00bb6cfd4add9029/tblwg55wg?fields=fldwg55wg2qo,fldwg55wgdtl' ,
      {
        headers: {
          'auth-key': 'keyPoqWmns_6K8V'
        }
      })
    const result = response.data.data.rows
    return result;
  } catch (error) {
    // Handle any errors that occurred during the API call
    console.error('Error:', error.message);
  }
}
async function getAllTableNameAndDescription(useDetailObj) {
  try {
    let result = '';
    const data = await getTableNameandDescriptionDBdash(useDetailObj)
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      if(data[i].fldwg55wgdtl)
          result += `name: '${data[i].fldwg55wg2qo}', description: '${data[i].fldwg55wgdtl}'`
      if (i !== data.length - 1) {
        result += ', ';
      }
    }
    console.log(result)
    return result;
  }
  catch (e) {
    console.log("e", e)

  }

}
async function getSelectedTableSchema(name) {
  let tableName = "fldwg55wg2qo"
  const resultArray = name.map(element =>`${tableName}='${element}'`);
const dersiredArray = resultArray.join('||');
// console.log("dersiredArray" , dersiredArray)
  try {
    try {
      console.log("first")
      const response = await axios.get(`https://dbdash-backend-h7duexlbuq-el.a.run.app/646db8fc00bb6cfd4add9029/tblwg55wg?fields=fldwg55wg7n3&filter=${dersiredArray}`,
        {
          headers: {
            'auth-key': 'keyPoqWmns_6K8V'
          }
        })
      const result = response.data.data.rows
      const values = result.map(obj => obj.fldwg55wg7n3).join(',');
      return values;
    } 
    catch (error) {
      // Handle any errors that occurred during the API call
      console.error('Error:', error);
    }
    // return tablesSchema;
  }

  catch (e) {
  console.log("e", e)
}
}
async function getUserDetailsById(id){
  console.log("id",id)
  console.log("id",dataSchema)
  const doc = await dataSchema.findById(id);
  return doc._doc || doc;
}
module.exports = { getUserDetailsById , getAllTableNameAndDescription, getSelectedTableSchema }