import React from "react";
import $ from "jquery";
import './App.css';
import config from "./config";
import medialive from "./medialiveConfig";
import axios from 'axios';
import {Row} from "reactstrap";

class Channel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rtmp: "",
            skey: ""
        };
        this.cstart = 'Channel Starting...'
        this.cstop = 'Channel Stopping...'
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChannelStart = this.handleChannelStart.bind(this);
        this.handleChannelStop = this.handleChannelStop.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // for updating rtmp link
    handleSubmit(event) {
        const rtmp = this.state.rtmp;
        const skey = this.state.skey;
        if(skey){
            console.log("Third-party Link: " + rtmp + '/' + skey  );
            var rtmplink = rtmp + '/' + skey;
        }else{
            console.log("Third-party Link: " + rtmp  );
            var rtmplink = rtmp;
        }

        event.preventDefault()

        var streamdata = {
            rtmp: rtmplink
        };
        axios.post( "/api/rtmp", streamdata)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChannelStart(event) {
        // console.log("Channel Starting...")
        // console.log(this.name)
        $("#cstart").val(this.cstart);
        $("#cstart").prop('disabled', true);
        const timeout = setTimeout(() => {
            console.log("waiting")
            $("#cstart").val("Start Channel");
            // $("#cstart").prop('disabled', true);
            // Timeout Logic
        }, 10000);
        event.preventDefault()
        axios.post("/api/startchannel",)
            .then((res) => {
                console.log(res.data);
                clearTimeout(timeout);

            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChannelStop(event) {
        $("#cstop").val(this.cstop);
        event.preventDefault()
        const timeout = setTimeout(() => {
            console.log("waiting")
            $("#cstop").val("Stop Channel");
            $("#cstart").prop('disabled', false);
        }, 10000);
        axios.post("/api/stopchannel",)
            .then((res) => {
                console.log(res.data);
                clearTimeout(timeout);

            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div style={{margin: "10px"}}>

                <fieldset>
                    <div>
                        <form onSubmit={this.handleSubmit}>

                            <label><b> Third-party rtmp: </b> &nbsp; <input name="rtmp" type="text"
                                                                            value={this.state.rtmp}
                                                                            onChange={this.handleChange}/>
                            </label> &nbsp; &nbsp;
                            <label><b> Stream key(If any): </b> &nbsp; <input name="skey" type="text"
                                                                            value={this.state.skey}
                                                                            onChange={this.handleChange}/>
                            </label> &nbsp; &nbsp;
                            <input type="submit" value="Submit" /><br/>
                        </form>

                        <input type="submit" value="Start Channel" id="cstart" onClick={this.handleChannelStart}/>&nbsp;  &nbsp;
                        <input type="submit" value="Stop Channel" id="cstop" onClick={this.handleChannelStop}/>
                    </div>
                </fieldset>


            </div>
        );
    }

}

export default Channel;