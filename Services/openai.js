const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getTableNameandDescription  = async (tableSchema ) => {


    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": `please only give me short descriptiion  and tableName  in the  proper json format as  without error  { "name":
        "tableName" ,"description":"what table does" } ${tableSchema} ` }]
      });
      return completion.data.choices[0].message ; 
     
}
const findTableNameForSchema = async (userQuery,AllTablesAndSchema ) => {
  const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": `user query =  ${userQuery},    please only   give me tablesnames  that can be used for the above user query  in  json format as mention   { tablenames :  ["table1","table2"] }  based on below AllTablesNameAnddes . all table name and their des  =  ${AllTablesAndSchema} ` }]
    });
    return completion.data.choices[0].message ; 
   
}
const findActualQueryToRun = async (userQuery,selectedSchema ) => {
  const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": `user query =  ${userQuery},  as per the user query tell me the code basis on below schema ${selectedSchema} in below json format as { code : codetoExecute}  ` }]
    });
    return completion.data.choices[0].message ; 
   
}
const userFirendlyWayResponse = async (output ) => {
  const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": `please give the current output of a query  in user friendly way ${output} ` }]
    });
    return completion.data.choices[0].message ; 
   
}
module.exports = {getTableNameandDescription,findTableNameForSchema,findActualQueryToRun,userFirendlyWayResponse}