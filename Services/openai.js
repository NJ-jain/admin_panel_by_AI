const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const schemaQuery  = async (columnData , operation ) => {


    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": `` }],
      });
      return completion.data.choices[0].message ; 
     
}
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
      messages: [{"role": "user", "content": `user query =  ${userQuery},    please only   give me tablesnames  that can be used for the above user query  in  array format as tablenames = []  based on below AllTablesNameAnddes . all table name and their des  =  ${AllTablesAndSchema} ` }]
    });
    return completion.data.choices[0].message ; 
   
}
module.exports = {schemaQuery,getTableNameandDescription,findTableNameForSchema}