'use strict';

const config = require('./config');
const nlpData = require('./tmdb');
const fbeamer = require('./fbeamer')
const f = new fbeamer(config.FB) ;
const express = require ('express') ;
const bodyparser = require ('body-parser')
const weatherQueries = require('./weatherQueries')

const server = express () ;
const PORT = process .env. PORT||3000;

console.log(process.env.production)

server.listen (PORT, () => console.log(`The bot server is running on port ${PORT}`));

server.get ('/fb', (req,res) => f.registerHook(req,res));

server.post('/fb', bodyparser.json({
  verify: f.verifySignature.call(f)
  }))

server.post ('/fb', (req , res , next ) =>{
  return f.incoming (req , res , async data => {

  let response = await nlpData(data)
  if (response === "Error occured"){
    response = await weatherQueries(data.message.text)
    data = f. messageHandler ( data );
    await f.txt(data.sender, response) ;
  }else{
    data = f. messageHandler ( data );
    await f.image(data.sender,response[1])
    await f.txt(data.sender, response[0]) ;
  }
    
  
  }) ;
}) ;


