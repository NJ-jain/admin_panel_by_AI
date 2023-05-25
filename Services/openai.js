const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getTableNameandDescription = async (tableSchema) => {
  console.log("first",
    { "role": "user", "content": `Provide a concise only array of JSON with 'tableName' and 'description' for the following table schema: ${tableSchema}. The JSON should look like [{ "name": "tableName", "description":"table purpose" ,schema : "create table "} ] and be error-free.` }
  )

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ "role": "user", "content": `Provide a array of JSON with 'tableName' and 'description and schema' for the followings table schema: ${tableSchema}. The JSON should look like [{ "name": "tableName", "description":"table purpose" ,schema : "create table "},{"name": "tableName1", "description":"table purpose1" ,schema : "create table "} ] and be error-free.` }]
  });
  return completion.data.choices[0].message;

}
const findTableNameForSchema = async (userQuery, AllTablesAndSchema) => {
  var prompt = `{
    "task": "Your task is to identify table names of the database that might be used to execute a db query to retrieve data for a given user_query.",
    "user_query": '${userQuery}',
    "instructions": [
      "The output format: { tablenames: ['table1', 'table2'], Mongo: [field1, field2] }",
      "Consider all MySQL tables [${AllTablesAndSchema}]",
      "Also consider all Mongo collections [All keys name]"
    ]
  }`
  console.log("second", {
    "role": "user",
    "content": prompt
  });
  try {
    var completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": prompt
        }]
    });
  }
  catch (e) {
    console.log(e.message)

  }
  // console.log("second result" ,completion.data.choices[0].message)
  console.log("second result", completion.data.choices[0].message)

  return completion.data.choices[0].message;
}

const findActualQueryToRun = async (userQuery, selectedSchema, code) => {
  var prompt = `{
    "task": "Complete the current JavaScript code considering User_query and considering given DB schemas.",
     "user_query": "${userQuery}",
     "SQl_schema": "${selectedSchema}",
     "Mongo_schema": "",
     "instructions": [
       "Use arrow functions exclusively like this - 'async(...args)=>{return result;}'",
       "Do not assign new function to any variables.",
       "Query result contains 2 dimensional array.",
       "Don't escape double quoted characters inside function",
       "Ensure code is  encoded, stringified, and prefer double quotes over single quotes.",
       "created code is very important and make sure it works",
       "You may use one or multiple queries to get the desired result",
       "Form final output in English sentence which is easy to read for humans and engaging"
     ],
     "Current_code": ${code}  } 
     Return only code without explanations`
     console.log(prompt)
  try {
    var completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": prompt
        }]
    });
    return completion?.data?.choices[0]?.message;
  } catch (error) {
    console.log("errorr", error.message)
    return error
  }



}
// const userFirendlyWayResponse = async (output ) => {
//   const completion = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{"role": "user", "content": `please give the current output of a query  in user friendly way ${output} ` }]
//     });
//     return completion.data.choices[0].message ; 

// }
module.exports = { getTableNameandDescription, findTableNameForSchema, findActualQueryToRun }