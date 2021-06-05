import React from "react";
import './App.css';
import config from "./config";
import axios from "axios";
import $ from "jquery";

class Channel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {cname: '', lmode: 'LOW', authorized: false, ctype: 'STANDARD'}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // Form submitting logic, prevent default page refresh
    handleSubmit(event) {
        const {cname, lmode, authorized, ctype} = this.state
        event.preventDefault()

        // creates channel with API
        // fetch("https://ivs.us-east-1.amazonaws.com/CreateChannel", {
        //     "method": "POST",
        //     "headers": {
        //         'AccessKey': process.env.REACT_APP_AccessKey,
        //         'SecretKey': process.env.REACT_APP_SecretKey,
        //         "Content-Type": "application/json",
        //         "Accept": "application/json",
        //     },
        //     "body": JSON.stringify({
        //         authorized: authorized,
        //         latencyMode: lmode,
        //         name: cname,
        //         tags: {
        //             "test": "IVS test",
        //         },
        //         type: ctype
        //     })
        // })
        //     .then(response => response.json())
        //     .then(response => {
        //         console.log(response)
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });


        //for saving channel name in mongodb
        var channeldata = {
            ivschannel: cname
        };

        axios.post( "/api/savechannel", channeldata)
            .then((res) => {
                console.log(res.data);
                $("#cname").val('')
            })
            .catch((error) => {
                console.log(error);
            });


        //using SDK
        var params = {
            authorized: authorized,
            latencyMode: lmode,
            name: cname,
            tags: {
                "test": "uptech",
            },
            type: ctype
        };

        config.createChannel(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
            } else {
                alert("Channel Created Successfully!")
                console.log(data);
                console.log(data.channel);
            }
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
    return (
        <div style={{margin: "10px"}}>
       <form onSubmit={this.handleSubmit}>
            <fieldset>
                <label>
                    <p>Channel Name <input  name="cname" type="text" id="cname" value={this.state.cname}
                                onChange={this.handleChange} /></p>
                </label>
            <div>
            <input type="submit" value="Submit" />

    </div>
</fieldset>

</form>
        </div>
       );
    }
}
export default Channel;