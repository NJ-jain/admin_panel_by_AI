
const { getTableNameandDescription } = require("../Services/openai");
const  {insertTableNameDesinPostgres} =  require( "../dbServices/schemaService")
const insertSchema = async (req, res) => {
    try {
        const createTableQueries = separateCreateTableQueries() // getting  array of individual table query 
        createTableQueries.forEach( async (element) => {     // element = single table schema
          const tableNameandDes =  await  getTableNameandDescription(element)  // tablename and description
          const ans = await  insertTableNameDesinPostgres(tableNameandDes)  // ,mongoose me insert name and des 
                                                                                // insert table object ke andar  { tablename :  schema} 
        });
      
       return res.status(201).json({"success":ans});
    } catch (error) {
       return res.status(400).json("failed");
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
 module.exports = {insertSchema}