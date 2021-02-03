'use strict'
const crypto = require ('crypto') ;
const request = require ('request') ;
const apiVersion = 'v9.0';



class FBeamer {

constructor ({ PageAccessToken , VerifyToken }) {
  try {
    if(PageAccessToken != "" && VerifyToken != "")
    {
      this.pageAccessToken = PageAccessToken
      this.verifyToken = VerifyToken
    }
    else{
      throw("give valide page access token AND verify token ")
    }
  }
  catch{
    console.log('error')
  }
}
registerHook (req , res ) {
const params = req. query ;
const mode = params ['hub.mode'],
token = params ['hub.verify_token'],
challenge = params ['hub.challenge'];
try {
  console.log(mode)
  console.log(token)
  console.log(this.verifyToken)
if ( mode == 'subscribe' && token == this.verifyToken ) { 
 return res.send ( challenge ) ;
} else {
 console.log ("Could not register webhook !") ;
 return res . sendStatus (200) ;
 }
 } catch (e) {
 console.log (e) ;
 }
}


verifySignature (req , res , buf) 
  {
      return (req , res , buf ) => {
        if(req . method === 'POST') {
        try {
          // get x-hub - signature here
          /* this code generates a hash using the given
          appSecret */
          let tempo_hash = crypto.createHmac ('sha1', this.verifyToken).update (buf , 'utf-8') ;
          let hash = hash . digest ('hex') ;
          // complete the rest of code by yourself
        } 
        catch (e) 
        {
          console .log (e) ;
        }
      }
    }
  }
  incoming (req , res , cb) {
  res.sendStatus (200) ;

   // Extract the body of the POST request
  if(req.body.object === 'page' && req.body.entry ) {
  let data = req.body;
  
  if( data.entry[0].messaging.postback ) {
  // handle postbacks
  }
else {
  return cb(data.entry[0].messaging[0])
  }

}
}



sendMessage ( payload ) {
  return new Promise (( resolve , reject ) => {
  request ({
    uri : `https://graph.facebook.com/${apiVersion}/me/messages`,
    qs :{ access_token : this.pageAccessToken } , method : 'POST', json : payload }, 
    (error , response , body ) => {
        if (! error && response.statusCode === 200) 
        {
          resolve ({
          mid: body . message_id
          }) ;

        } 
        else {
          reject ( error ) ;
        }
        
    }) ;
  }) ;
}

messageHandler ( obj ) {
  let sender = obj . sender .id;
  let message = obj. message ;
  if ( message . text ) {
  let obj = {
  sender ,  
    type : 'text ',
content : message . text
  }
 return obj;
  }
}

txt(id,text,messaging_type = 'RESPONSE') {
 /* this is an object for creating the payload according
to Table 1 in the following .*/
  let obj = {
    messaging_type ,
    recipient :{
      id:id
      } ,
    message : {
      text:text,
      }
    }
  return this.sendMessage (obj ) ;
  }

image(id,messaging_type = 'RESPONSE') {
 /* this is an object for creating the payload according
to Table 1 in the following .*/
  let obj = {
    messaging_type ,
   recipient :{
      id:id
      } ,   
      message : {
        attachment : {
          type:"image",
          payload:{
            url: "https://www.solutions-magazine.com/wp-content/uploads/2019/03/CHATBOT.jpg.png",
            is_reusable:true,
            }
        }
      }
  }
  return this.sendMessage (obj ) ;
  }
}

module.exports = FBeamer ;

