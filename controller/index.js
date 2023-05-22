
const  {insertTableNameDesinPostgres} =  require( "../dbServices/schemaService")
const insertSchema = async (req, res) => {
    try {
        const createTableQueries = separateCreateTableQueries()
        createTableQueries.forEach( async (element) => {
          const tableNameandDes =  await  getTableNameandDescription(element)  
          const ans = await  insertTableNameDesinPostgres(tableNameandDes)
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