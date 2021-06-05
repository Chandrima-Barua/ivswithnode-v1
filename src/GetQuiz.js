
import React, {useEffect, useState} from "react";
import axios from 'axios';
import './App.css';
import config from "./config";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle
} from "reactstrap";
// var path = require("path");
// var srcpath  = path.join(__dirname,'/public') ;


class GetQuizs extends React.Component {

    state = {
        tickets: [],
    };

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        // GET All Quiz Data
        axios.get("/api/getdata").then((res) => {
            console.log(res.data);
            this.setState({ tickets: res.data });
        });

    }

    handleSubmit( event, id) {

        event.preventDefault();
        console.log(this.state['tickets'][id])

        var metadata = {
            "question": this.state['tickets'][id]['qus'],
            "answers": [
                this.state['tickets'][id]['ans1'],
                this.state['tickets'][id]['ans2'],
                this.state['tickets'][id]['ans3']? this.state['tickets'][id]['ans3'] : '',
                ],
            "correctIndex": this.state['tickets'][id]['correctans'] - 1
        }

        console.log(JSON.stringify(metadata))

        var params = {
            channelArn: "arn:aws:ivs:us-east-1:671606321211:channel/dKHcJpR5S9Ut",
        };
        var params2 = {
            arn: "arn:aws:ivs:us-east-1:671606321211:channel/dKHcJpR5S9Ut",
        };

        var skey = '';

        config.listStreamKeys(params, function (err, data) {
            if (err) console.log(err, err.stack);
            else {
                let streamKeyArn = data.streamKeys[0].arn;
                config.getStreamKey({arn: streamKeyArn}, function (err, channeldata) {
                    if (err) console.log(err, err.stack);
                    else
                        skey = channeldata.streamKey.value;

                    config.getChannel(params2, function(err, getChanneldata) {
                        if (err) console.log(err, err.stack); // an error occurred
                        else
                            console.log(getChanneldata['channel']['arn']);

                        var paramdata = {
                            channelArn: getChanneldata['channel']['arn'], /* required */
                            metadata: JSON.stringify(metadata) /* required */
                        };

                        //for pushing  metadata in live channel
                        config.putMetadata(paramdata, function(err, putdata) {
                            if (err) console.log(err, err.stack); // an error occurred
                            else
                            console.log(putdata);           // successful response
                        });

                    });
                });
            }
        });

    }

    render() {
        return (
            <div style={{marginTop:'50px'}}>
                {
                    this.state.tickets.map((ticket,index)=>(

                    <Card  key={index}>
                    <CardHeader>
                    <CardTitle tag="h4"> {index + 1}</CardTitle>
                    </CardHeader>
                    <CardBody>
                    <div> <b>Question:</b> &nbsp;  {ticket.qus}</div>

                    <div> <b>Answer 1: </b>&nbsp;  {ticket.ans1}</div>

                    <div> <b> Answer 2:</b> &nbsp; {ticket.ans2}</div>

                    <div> <b> Answer 3:</b> &nbsp; {ticket.ans3  ? ticket.ans3: '' }</div>

                    <div> <b> Correct Answer :</b> &nbsp; {ticket.correctans}</div>

                    <input type="submit" value="Show" id={index} onClick={e => this.handleSubmit(e, index)} />

                    </CardBody>
                    </Card>
                    ))}
            </div>
        );
    }
}

export default GetQuizs
