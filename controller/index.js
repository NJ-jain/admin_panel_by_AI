
const { findTableNameForSchema,  findActualQueryToRun } = require("../Services/openai");
const  { getAllTableNameAndDescription, getSelectedTableSchema, getUserDetailsById} =  require( "../dbServices/schemaService")
const mysql = require('mysql2/promise');
// "i want the no of failed delveried   "
 const getQueryResult = async (req, res) => {
  try {
      const userDetails = await getUserDetailsById(req.params?.id)
      const pool = mysql.createPool(userDetails?.sqlCredentails); // connect to sql 
      var AllTablesNameAnddes = await getAllTableNameAndDescription(userDetails)   
      const {content } = await findTableNameForSchema(req?.body?.userQuery,AllTablesNameAnddes)
      console.log("content",content)
      const tableNameArray = JSON.parse(content).tablenames
      const selectedTablesSchema =  await getSelectedTableSchema(userDetails , tableNameArray) ;
      console.log("selectedTablesSchema",selectedTablesSchema)
      let codeToRun = await findActualQueryToRun(req?.body?.userQuery ,selectedTablesSchema,   `async()=>{ const connection = await pool.getConnection();
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
    console.log("error",error);
     return res.status(400).json({"try again some error ":error});
  }
}


 module.exports = {getQueryResult}