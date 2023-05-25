
const { findTableNameForSchema,  findActualQueryToRun } = require("../Services/openai");
const  { getAllTableNameAndDescription, getSelectedTableSchema, getUserDetailsById} =  require( "../dbServices/schemaService")
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'mysql.test.txtapi.com',
    user: 'reportAITest',
    password: '4LA94QVAIah7c1JZ',
    database: 'test_betatest'
});
 const getQueryResult = async (req, res) => {
  try {
      const userDetails = await getUserDetailsById(req.params.id)
      var AllTablesNameAnddes = await getAllTableNameAndDescription(userDetails)   
      const {content } = await findTableNameForSchema("i want the no of failed delveried   ",AllTablesNameAnddes)
      console.log("content",content)
      const tableNameArray = JSON.parse(content).tablenames
      const selectedTablesSchema =  await getSelectedTableSchema(tableNameArray) ;
      console.log("selectedTablesSchema",selectedTablesSchema)
      let codeToRun = await findActualQueryToRun("i want the  total no of failed delivered" ,selectedTablesSchema,   `async()=>{ const connection = await pool.getConnection();
        // your code goes here 
        connection.release();
        // return finaloutput in  human friendly
      }`)
      console.log("codeToRun",codeToRun.content)

     const res1 = eval(codeToRun.content
     )
    //  const res1 = eval( async () => {
    //   const connection = await pool.getConnection();
    //   const query = "SELECT SUM(final_failed) as total_failed FROM actual_fail_delivered";
    //   const result = await connection.query(query);
    //   connection.release();
    //   return `The total number of failed delivered is ${result[0][0].total_failed}.`;
    // }
    //  )
    const userFriendlyResponse  =  await res1();
      
     return res.status(201).json({"success":userFriendlyResponse});
  } catch (error) {
      console.log("helllo",error)
     return res.status(400).json({"failed":error});
  }
}


 module.exports = {getQueryResult}