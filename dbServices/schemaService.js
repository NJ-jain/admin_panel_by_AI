const { default: axios } = require("axios");
const dataSchema = require("../mongoose/dataSchema");
const mongoose = require('mongoose')
async function getTableNameandDescriptionDBdash(userDetails) {

  try {
    const response = await axios.get(`https://dbdash-backend-h7duexlbuq-el.a.run.app/${userDetails.dbdashId}/${userDetails.tableId}?fields=${userDetails.TableNames},${userDetails.description}` ,
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
async function getAllTableNameAndDescription(userDetails) {
  try {
    let result = '';
    const data = await getTableNameandDescriptionDBdash(userDetails)
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      if(data[i].userDetails.description)
          result += `name: '${data[i].userDetails.TableNames}', description: '${data[i].userDetails.description}'`
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
async function getSelectedTableSchema(userDetails , name) {
  const resultArray = name.map(element =>`${userDetails.TableNames}='${element}'`);
const dersiredArray = resultArray.join('||');
// console.log("dersiredArray" , dersiredArray)
  try {
    try {
      console.log("first")
      const response = await axios.get(`https://dbdash-backend-h7duexlbuq-el.a.run.app/${userDetails.dbdashId}/${userDetails.tableId}?fields=${userDetails.schema}&filter=${dersiredArray}`,
        {
          headers: {
            'auth-key': 'keyPoqWmns_6K8V'
          }
        })
      const result = response.data.data.rows
      const values = result.map(obj => obj.userDetails.schema).join(',');
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
  const doc = await dataSchema.findById(id);
  return doc;
}
module.exports = { getUserDetailsById , getAllTableNameAndDescription, getSelectedTableSchema }
