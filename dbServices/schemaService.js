const { default: axios } = require("axios");
const dataSchema = require("../mongoose/dataSchema");
const mongoose = require('mongoose')
async function updateSchemaObject() {
  const mongooseURL = "mongodb+srv://Chanchal:root@cluster0.irtmyo9.mongodb.net/dbDash?retryWrites=true&w=majority"
  const conn = await mongoose.connect(mongooseURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  console.log("dataSchema",dataSchema)
  // const newDocument = new dataSchema({
  //     // mongooseCredentials: 'john.doe@example.com'
  //   });
  //   await newDocument.save()
  try {
    const insertedSchema = await dataSchema.updateOne(
      { _id: "646b13964c684c360ed71d39" },
      {
        $set: {
          "mongooseCredentials.schema":
          {
            "_id": ' ObjectId("33656b6f466c323134343938")',
            "requestID": "33656b6f466c323134343938",
            "telNum": "919039367369",
            "oppri": "0",
            "sms_length": 'NumberLong(1)',
            "crcy": "crd",
            "reportStatus": 'NumberInt(1)',
            "sentTimeReport": ' ISODate("2023-05-11T10:02:14.692+0000")',
            "providerSMSID": "S1110051111532128300291253146292",
            "user_pid": "206819",
            "senderID": "txtapi",
            "smsc": "VdconOTP9",
            "description": "id:S1110051111532128300291253146292 sub:001 dlvrd:001 submit date:230511153212 done date:230511153212 stat:DELIVRD err:000 text:",
            "requestRoute": "405",
            "campaign_name": "OTP",
            "campaign_pid": "5c0b5e2fb3c33e2abe267b40",
            "credits": 'NumberLong(1)',
            "curRoute": "106",
            "expiry": "1440",
            "isCopied": 'NumberLong(0)',
            "mobiles": "919039367369",
            "minNoLimit": "{\"REQUEST\":\"for_panel_url=control.msg91.com&authkey=206819A3BEsgV1xv5abe331d&mobile=919039367369&message=Please+note+the+OTP+for+your+MSG91+account+verification+is+8274.+Never+share+your+OTP+with+anyone.&sender=txtapi&DLT_TE_ID=1307159774884177545&PE_ID=1301158037907365932&route=106&response=json&mobiles=919039367369&otp_expiry=1440&otp=8274&isotp=1&encrypt=0&islongapi=0&insertQueueName=OTPAPI&requestid=33656b6f466c323134343938&HTTP_X_FORWARDED_FOR=54.169.148.45&HTTP_CF_CONNECTING_IP=&USER_ADDR=111.118.250.234%2C+162.158.162.45%2C&REQUEST_URI=%2Fapi%2Fsendotp.php&REQUEST_METHOD=GET&REMOTE_ADDR=10.0.0.133&SERVER_ADDR=10.1.4.199&REDIRECT_STATUS=200&CONTENT_LENGTH=&REQUEST_TIME_FLOAT=1683799332.5893&REQUEST_TIME=1683799332&sentTime=2023-05-11+15%3A32%3A12&userip=54.169.148.45&userRealIp=111.118.250.234&campaign_name=OTP\"}",
            "percentDel": 'NumberLong(100)',
            "source": 'NumberLong(0)',
            "requestDate": 'ISODate("2023-05-11T10:02:12.000+0000")',
            "msgData": "PrcfmYr2egHAbfrD593kFnUXwOJe/CgmsR6lBvj0PGCk47zRoY+M9uG+l/cjHUmZgg0ZFzCrJinU5d6eNEfE7h3Kp+1MwBkNZQO0N/wTS5EgQPy9Zy920PJBl8Qj4QDT3KIZczN/C8SGKFj7effdog==",
            "userCountryCode": "91",
            "pauseReason": "",
            "userMobile": "917999664144",
            "requestDateString": "2023-05-11 15:32:12",
            "noOfSMS": 'NumberLong(1)',
            "demo_account": 'NumberLong(0)',
            "requestType": 'NumberLong(1)',
            "requestUserid": "206819",
            "otp": "54xYqfsB93hqPfpgVSq9mw==",
            "isApi": 'NumberLong(1)',
            "actual_route_type": "dialplan",
            "isAdvanced": 'NumberLong(0)',
            "requestSender": "txtapi",
            "resend": 'NumberLong(0)',
            "sentTime": "2023-05-11 15:32:12",
            "unicode": 'NumberLong(0)',
            "page": "OTP",
            "routeCredit": {
              "830": 'NumberLong(1)'
            },
            "status": 'NumberLong(0)',
            "processedCounter": 'NumberLong(0)',
            "userCredit": 'NumberLong(1)',
            "template_id": null,
            "extra_param": null,
            "DCC": "91",
            "PE_ID": "1301158037907365932",
            "DLT_TE_ID": "1307159774884177545",
            "userRealIp": "111.118.250.234",
            "otpRetry": 'NumberLong(0)',
            "verified": 'NumberLong(0)',
            "otpVerCount": 'NumberLong(0)',
            "deliveryTime": "2023-05-11 15:32:12",
            "DTS": 'NumberLong(0)',
            "route": "830",
            "credit": "1"
          }

        }
      }
    );
    // console.log("insertSchema",insertedSchema)
    return insertedSchema;
  } catch (error) {
    throw error;
  }
}
async function insertTableNameDesinPostgres(NameDescObject) {
  try {
    const mongooseURL = "mongodb+srv://Chanchal:root@cluster0.irtmyo9.mongodb.net/dbDash?retryWrites=true&w=majority"
    const conn = await mongoose.connect(mongooseURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log("in insete")
    
    const insertedSchema = await dataSchema.updateOne(
      {
        _id: "646b13964c684c360ed71d39",
      },
      { $addToSet: { "postgresCredentials.tablesName": NameDescObject } }
    )

    console.log("insertedSchema", insertedSchema)
    return insertedSchema
  }
  catch (e) {
    console.log("e",e)

  }

}
async function insertTableNameandSchema(name , tableNameAndSchema) {
  try {
    const mongooseURL = "mongodb+srv://Chanchal:root@cluster0.irtmyo9.mongodb.net/dbDash?retryWrites=true&w=majority"
    const conn = await mongoose.connect(mongooseURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    const doc = await dataSchema.findById("646b13964c684c360ed71d39");
    var  json = doc.postgresCredentials.tablesSchema 
    json ={ ...json, ...tableNameAndSchema}
    console.log(json)
    const insertedSchema = await dataSchema.updateOne(
      
      {_id: "646b13964c684c360ed71d39",},
      { $set: { [`postgresCredentials.tablesSchema`]: json } }

    )

   
    return ;
  }
  catch (e) {
    console.log("e",e)

  }

}
async function getTableNameandDescriptionDBdash() {

  try {
 const response =   await axios.get('https://dbdash-backend-h7duexlbuq-el.a.run.app/646db8fc00bb6cfd4add9029/tblwg55wg?fields=fldwg55wg2qo,fldwg55wgdtl',
    {
     headers: {
     'auth-key': 'keyPoqWmns_6K8V'
     }
     })
    const result = response.data.data.rows
  return result ;
  } catch (error) {
   // Handle any errors that occurred during the API call
   console.error('Error:', error.message);
  }
 }

async function getAllTableNameAndDescription(name , tableNameAndSchema) {
  try {
    // const mongooseURL = "mongodb+srv://Chanchal:root@cluster0.irtmyo9.mongodb.net/dbDash?retryWrites=true&w=majority"
    // const conn = await mongoose.connect(mongooseURL, {
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true,
    // })
    // const doc = await dataSchema.findById("646b13964c684c360ed71d39");
    // var  json = doc.postgresCredentials.tablesName 
    let result = '';
    const data = await getTableNameandDescriptionDBdash()
    // console.log(await getTableNameandDescriptionDBdash())
    for (let i = 0; i < data.length; i++) {
      result += `name: '${data[i].fldwg55wg2qo}', description: '${data[i].fldwg55wgdtl}'`
    
      // Add a comma if it's not the last element
      if (i !== data.length - 1) {
        result += ', ';
      }
    }
    return result ;
  }
  catch (e) {
    console.log("e",e)

  }

}
async function getSelectedTableSchema(name) {
  try {
    const mongooseURL = "mongodb+srv://Chanchal:root@cluster0.irtmyo9.mongodb.net/dbDash?retryWrites=true&w=majority"
    const conn = await mongoose.connect(mongooseURL, { useUnifiedTopology: true , useNewUrlParser: true })
    const doc = await dataSchema.findById("646b13964c684c360ed71d39");
    var tablesSchema = ""
    for (let i = 0; i < name.length; i++) {
      console.log(name[i])
      tablesSchema +=  doc?.postgresCredentials?.tablesSchema?.['actual_fail_delivered'] + "," ;  
    }
    return tablesSchema ;
  }
  catch (e) {
    console.log("e",e)

  }

}

module.exports = { updateSchemaObject, insertTableNameDesinPostgres,insertTableNameandSchema,getAllTableNameAndDescription,getSelectedTableSchema }