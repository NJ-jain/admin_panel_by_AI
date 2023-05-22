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
        messages: [{"role": "user", "content": `please give me short descriptiion  and tableName in the json format  { "name":
        "tableName" ,"description":"what table does" } ${tableSchema}` }],
      });
      return completion.data.choices[0].message ; 
     
}
module.exports = {schemaQuery,getTableNameandDescription}