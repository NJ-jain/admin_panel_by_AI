
const { getTableNameandDescription, findTableNameForSchema,  findActualQueryToRun } = require("../Services/openai");
const  {insertTableNameDesinPostgres, insertTableNameandSchema, getAllTableNameAndDescription, getSelectedTableSchema} =  require( "../dbServices/schemaService")
// const mysql = require('mysql');
const axios = require('axios');

const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'mysql.test.txtapi.com',
    user: 'reportAITest',
    password: '4LA94QVAIah7c1JZ',
    database: 'test_betatest'
});
const insertSchema = async (req, res) => {
    try {
        const tableNameandDes = await getTableNameandDescription(req?.body?.schemaData);
        var data  = JSON.parse(tableNameandDes.content)
        for (let index = 0; index < data.length; index++) {
          await callThirdPartyAPI(data[index].name,data[index].description,data[index].schema);
        }
        console.log("tableNameandDes",tableNameandDes)

        // const createTableQueries = separateCreateTableQueries(schemass) // getting  array of individual table query 
        // for (const element of createTableQueries) {
        //     const tableNameandDes = await getTableNameandDescription(element);
        //     console.log("tableNameandDes", tableNameandDes.content);
        //    const  tableNameandDes1 = JSON.parse(tableNameandDes.content)
        //     const ans = await insertTableNameDesinPostgres(tableNameandDes1);
        //     const tableData = {
        //         [tableNameandDes1.name]: element,
        //       };
        //     await insertTableNameandSchema(tableNameandDes1.name , tableData);
        //     // Perform any other asynchronous operations here
        //   }
       return res.status(201).json({"success":"ans"});
    } catch (error) {
        console.log("helllo",error)
       return res.status(400).json({"failed":error});
    }
 }
 const getQueryResult = async (req, res) => {
  try {
      var AllTablesNameAnddes = await getAllTableNameAndDescription()   
      const {content } = await findTableNameForSchema("i want the no of failed delveried   ",AllTablesNameAnddes)
      console.log("content",content)
      const tableNameArray = JSON.parse(content).tablenames
      const selectedTablesSchema =  await getSelectedTableSchema(tableNameArray) ;
      console.log("selectedTablesSchema",selectedTablesSchema)
      let codeToRun = await findActualQueryToRun("i want the  total no of failed delivered" ,selectedTablesSchema ,
      `const connection = await pool.getConnection();
      connection.release();`);
      console.log("codeToRun",codeToRun.content)

     const res1 = eval(codeToRun.content
     )
      
     return res.status(201).json({"success":res1});
  } catch (error) {
      console.log("helllo",error)
     return res.status(400).json({"failed":error});
  }
}
function separateCreateTableQueries(sqlDump) {
    let queries = sqlDump.split('\n\n'); // Split the dump into individual queries
    let createTableQueries = [];
    let createTableQuery = '';
    
    for (let query of queries) {
        if (query.startsWith('CREATE TABLE')) {
             createTableQuery += query;
        } else if (createTableQuery) {
            createTableQueries.push(createTableQuery);
             createTableQuery = '';
        }
    }
    
    return createTableQueries;
}



async function callThirdPartyAPI(tableName,description,schema) {
 try {
  console.log(tableName,description,schema)
  await axios.post('https://dbdash-backend-h7duexlbuq-el.a.run.app/646db8fc00bb6cfd4add9029/tblwg55wg', {
    "fldwg55wg2qo": tableName,
    "fldwg55wgdtl": description,
    "fldwg55wg7n3":schema
    }, {
    headers: {
    'Content-Type': 'application/json',
    'auth-key': 'keyPoqWmns_6K8V'
    }
    })
    .then(response => {
    console.log(response.data);
    })
    .catch(error => {
    // Handle any errors
    console.error(error.message);
    });
 } catch (error) {
  // Handle any errors that occurred during the API call
  console.error('Error:', error.message);
 }
}



 module.exports = {insertSchema,getQueryResult}