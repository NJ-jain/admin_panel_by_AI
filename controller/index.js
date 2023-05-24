
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
// const connection = mysql.createConnection({
//   host: 'mysql.test.txtapi.com',
//   user: 'reportAITest',
//   password: '4LA94QVAIah7c1JZ',
//   database: 'test_betatest'
// });
const schemass = `************************************************************
# Sequel Pro SQL dump
# Version 5446
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: mysql.test.txtapi.com (MySQL 5.7.38)
# Database: test_betatest
# Generation Time: 2023-05-12 14:33:00 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table access_list
# ------------------------------------------------------------

DROP TABLE IF EXISTS \`access_list\`;

CREATE TABLE \`access_list\` (
  \`_id\` int(11) NOT NULL AUTO_INCREMENT,
  \`access_name\` varchar(40) NOT NULL,
  \`description\` text NOT NULL,
  \`status\` int(11) NOT NULL,
  PRIMARY KEY (\`_id\`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;



# Dump of table actual_fail_delivered
# ------------------------------------------------------------

DROP TABLE IF EXISTS \`actual_fail_delivered\`;

CREATE TABLE \`actual_fail_delivered\` (
  \`date\` date NOT NULL,
  \`fake_failed\` int(11) NOT NULL,
  \`delivered\` int(11) NOT NULL,
  \`final_failed\` int(11) NOT NULL,
  PRIMARY KEY (\`date\`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table admin_auto_recharge_setting
# ------------------------------------------------------------

DROP TABLE IF EXISTS \`admin_auto_recharge_setting\`;

CREATE TABLE \`admin_auto_recharge_setting\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`panelId\` int(11) NOT NULL,
  \`type\` int(11) NOT NULL,
  \`sms\` int(11) NOT NULL,
  \`cost\` varchar(20) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;`
const insertSchema = async (req, res) => {
    try {


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
        callThirdPartyAPI();
       return res.status(201).json({"success":"ans"});
    } catch (error) {
        console.log("helllo",error)
       return res.status(400).json({"failed":error});
    }
 }
 const getQueryResult = async (req, res) => {
  try {
      var AllTablesNameAnddes = await getAllTableNameAndDescription()   
      // // console.log("AllTablesNameAnddes",AllTablesNameAnddes)
      // const {content } = await findTableNameForSchema("i want the no of failed delveried   ",AllTablesNameAnddes)
      // console.log("content",content)
      // const tableNameArray = JSON.parse(content).tablenames
      // const selectedTablesSchema =  await getSelectedTableSchema(tableNameArray) ;
      // console.log("selectedTablesSchema",selectedTablesSchema)
      // let codeToRun = await findActualQueryToRun("i want the  total no of failed delivered" ,selectedTablesSchema ,
      // `const connection = await pool.getConnection();
      // connection.release();`);
      // console.log("codeToRun",codeToRun.content)

    //  const res1 = eval(codeToRun.content
    //  )
    //  ` async () => {
      const connection = await pool.getConnection();
      // const query  = `SHOW TABLES `
      const query = `SHOW TABLES;`

      
      const results = await connection.query(query)
      console.log( "141", results[0]);
      // console.log( "142", result);
      console.log("length",results[0].length)

      // Iterate through the table names
      let ans = {}
   for(var i =0;i<results[0].length;i++) {
    var row = results[0][i]

    console.log("row",row)
      const tableName = row[`Tables_in_${connection.config.database}`];

      // Execute SHOW CREATE TABLE for each table
      const result = await connection.query(`SHOW CREATE TABLE \`${tableName}\``, )
    console.log("result",result[0])
    var createTableStatement = result[0]
    ans = {...ans ,createTableStatement }
          // const createTableStatement = result[0]?.['Create Table'];
          // ans = ans+ '`Table: ${tableName}\n${createTableStatement}\n`'
          // console.log(`Table: ${tableName}\n${createTableStatement}\n`);

        // // Close the MySQL connection when finished
        // if (tableName === results[results.length - 1][`Tables_in_${connection.config.database}`]) {
        //   connection.release();
        // }
      }
    
      connection.release();
      console.log("query executed successfully ")
    //   return result[0][0]['SUM(final_failed)'];
    // }`
        // console.log("res1",await res1())
      // codeToRun = JSON.parse(codeToRun.content).code
      // console.log("code to run ",codeToRun)

      // const connection = connection();
      // connection.connect((err) => {
      //   if (err) {
      //     console.error('Error connecting to the database:', err);
      //     return;
      //   }
      
      //   console.log('Connected to the database!');
      // });

      // var finalOutput = ""
      // await connection.query(codeToRun, (err, results) => {
      //   if (err) {
      //     console.error('Error executing the query:', err);
      //     return;
      //   }
      //   finalOutput = results;
      
      //   console.log('Retrieved data:', results);
      // });

      // connection.end((err) => {
      //   if (err) {
      //     console.error('Error closing the database connection:', err);
      //     return;
      //   }
      
      //   console.log('Connection closed.');
      // });

      
      
      // const codeOutput  = eval(codeToRun);
      // console.log("final ouptut",finalOutput)
    //   const reponseToUser  = await userFirendlyWayResponse(finalOutput);
     return res.status(201).json({"success":ans});
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



async function callThirdPartyAPI() {
 try {
  axios.post('https://dbdash-backend-h7duexlbuq-el.a.run.app/646db8fc00bb6cfd4add9029/tblwg55wg', {
    "fldwg55wg2qo": 'John Doe',
    "fldwg55wgdtl": 'johndoe@example.com',
    "fldwg55wg7n3":"schema"
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

// Call the function to make the API call


 module.exports = {insertSchema,getQueryResult}