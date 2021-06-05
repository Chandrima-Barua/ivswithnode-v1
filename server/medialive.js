require("dotenv").config();
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT =  process.env.PORT || 3001;
app.listen(PORT , 'localhost', console.log(`Server is running in http://localhost:${PORT}`));
const axios = require('axios');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//for starting medialive channel with API in node js
app.get('/channelapi', function(req, res){
    res.send("Hello World!");
    axios.post('https://medialive.us-east-1.amazonaws.com/prod/channels/8786510/start', {
        headers: {
            'AccessKey': process.env.REACT_APP_AccessKey,
            'SecretKey': process.env.REACT_APP_SecretKey,
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    })
        .then((res) => {
            console.log(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
   //  axios.post('https://medialive.us-east-1.amazonaws.com/prod/channels/8786510/start')
   // .then(response => {
   //          console.log("No error")
   //          console.log(response);
   //      })
   //      .catch(error => {
   //          console.log(error);
   //      });
});