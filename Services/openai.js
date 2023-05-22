const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const schemaQuery  = async (columnData , operation ) => {


    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": ` need Postgres query to create a new column type GENERATED COLUMN, current columns -  (${columnData}).  ${operation} , give query without explanation in below json format -
        {
            "alter_table": "table_name",
            "add_column": {
                "new_column_name": {
                    "data_type": "type",
                    "generated": {
                        "expression": " || ' ' || ",
                        "stored": true,
                        "always": true
                    }
                }
            }
        }`}],
        // messages: [{"role": "user", "content": `columns ${columnData}. ${operation} in another generated column generate the postgress query for that without explaination please generate in this example format numeric GENERATED ALWAYS AS (kilometer || age || speed) STORED  Instructions: generate query only if possible according to rules of postgressql otherwisw say not possible only without explaination\n\n `}],
      });
      return completion.data.choices[0].message ; 
     
}
module.exports = {generateColumnQuery}