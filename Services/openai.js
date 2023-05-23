const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getTableNameandDescription  = async (tableSchema ) => {


    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": `Provide a concise only JSON with 'tableName' and 'description' for the following table schema: ${tableSchema}. The JSON should look like { "name": "tableName", "description":"table purpose" } and be error-free.` }]
      });
      return completion.data.choices[0].message ; 
     
}
const findTableNameForSchema = async (userQuery,AllTablesAndSchema ) => {
  const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": `{
        "task": "Your task is to identify table names from the database that might be used to execute a query and retrieve data for a given user query.",
        "instructions": [
        "Guess table names for user query - ${userQuery}",
        "The output format: { tablenames : ["table1","table2"], Mongo : [field 1, field 2] }",
        "Consider all MySQL tables [${AllTablesAndSchema}]",
        "Also consider all Mongo collections [All keys name]"
        ]
        }` }]
    });
    return completion.data.choices[0].message ; 
   
}
const findActualQueryToRun = async (userQuery,selectedSchema ) => {
  const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": `{
        "task": "Finish the JavaScript code using user query ${userQuery} and schema ${selectedSchema} (PG, Mongo, or both).",
        "instructions": [
        "The code should work with no explanations needed",
        "You can use several queries to get the desired result",
        "Make sure the output is easy to read and engaging"
        ],
        "prompt": "Complete this JavaScript code: {}"
        }` }]
    });
    return completion.data.choices[0].message ; 
   
}
// const userFirendlyWayResponse = async (output ) => {
//   const completion = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{"role": "user", "content": `please give the current output of a query  in user friendly way ${output} ` }]
//     });
//     return completion.data.choices[0].message ; 
   
// }
module.exports = {getTableNameandDescription,findTableNameForSchema,findActualQueryToRun}