require("dotenv").config();
const express = require("express");
var path = require("path");
const cors = require("cors");
const db = require("./db");
const app = express();
app.use(cors());
var srcpath = path.join(__dirname, "../public");
app.use(express.static("public"));
var bodyParser = require("body-parser");
app.use(bodyParser.json());

//dor production
// const PORT =  process.env.PORT || 3000;

//for local
const PORT =  process.env.PORT || 3001;

//server config
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.listen(PORT , 'localhost', console.log(`Server is running in http://localhost:${PORT}`));


//ivs and medialive config
var AWS = require("@aws-sdk/client-ivs");
const { MediaLive } = require("@aws-sdk/client-medialive");
let cred = {
    accessKeyId: process.env.REACT_APP_AccessKey,
    secretAccessKey: process.env.REACT_APP_SecretKey
}
const ivs = new AWS.Ivs({
    apiVersion: "2020-07-14",
    region: 'us-east-1',
    credentials: cred
});
const medialive = new MediaLive({ region: "us-east-1", credentials: cred });


//database
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var quizSchema = new Schema({
    qus: { type: String },
    ans1: { type: String },
    ans2: { type: String },
    ans3: { type: String },
    correctans: { type: String },
}, { versionKey: false });

var channelSchema = new Schema({
    ivschannel: { type: String },
}, { versionKey: false });

var quizmodel = mongoose.model("quiz", quizSchema, "quiz");
var channelmodel = mongoose.model("ivschannel", channelSchema, "ivschannel");


//api for starting medialive channel
app.post('/api/startchannel', function(req, res){
    var params = {
        ChannelId: '8786510'
    }
    medialive.startChannel(params, function(err, data){
        if (err)  console.log(err)
        else
            console.log(data)

    });
});

//api for stopping medialive channel
app.post('/api/stopchannel', function(req, res){

    var params = {
        ChannelId: '8786510' /* required */
    };
    medialive.stopChannel(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
});

//api for updating rtmp link
app.post('/api/rtmp', function(req, res){
console.log(req.body.rtmp)
    res.send("Hello");
    var input_url = req.body.rtmp;

    var params = {
        InputId: '8046669', /* required */
        Sources: [
            {
                // Url: 'https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8'
                Url: input_url

            },
        ]
    };
    medialive.updateInput(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });

});


//api for posting quiz
app.post("/api/savedata", function(req, res) {
    console.log(req.body);
    var mod = new quizmodel(req.body);
    mod.save(function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

//api for fetching quiz
app.get("/api/getdata", function(req, res) {
    quizmodel.find({}, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});


//api for storing channels name from mongodb
app.post("/api/savechannel", function(req, res) {
    console.log(req.body);
    var cmod = new channelmodel(req.body);
    cmod.save(function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });


});

//api for fetching channels name from mongodb
app.get("/api/getchannel", function(req, res) {

    channelmodel.find({}, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });

});


//api for getting selected channel stream key
app.post('/api/getchanneldata', function(req, res){
    console.log(req.body.name);
    var params = {
        filterByName: req.body.name
    };
    ivs.listChannels(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else
        var params = {
            channelArn: data['channels'][0]['arn']
        };
        var params2 = {
            arn: data['channels'][0]['arn']
        };
            ivs.listStreamKeys(params, function (err, data) {
                if (err) console.log(err, err.stack);
                else {
                    // console.log(data)
                    let streamKeyArn = data.streamKeys[0].arn;

                    ivs.getStreamKey({arn: streamKeyArn}, function (err, channeldata) {
                        if (err) console.log(err, err.stack);
                        else
                            var skey = channeldata.streamKey.value;
                            ivs.getChannel(params2, function (err, getChanneldata) {
                                if (err) console.log(err, err.stack); // an error occurred
                                else
                                    console.log(getChanneldata['channel'].ingestEndpoint);
                                // res.send([{ingestEndpoint:  'rtmps://' +  getChanneldata['channel'].ingestEndpoint + ':443/app/', skey: skey}]);
                                res.send([{ingestEndpoint: getChanneldata['channel'].ingestEndpoint , skey: skey}]);
                            });


                    });
                }
            });

    });
});









