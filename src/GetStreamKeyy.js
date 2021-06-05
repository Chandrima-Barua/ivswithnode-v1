import React, {useEffect, useState} from 'react'
import {CopyToClipboard} from "react-copy-to-clipboard";
import config from "./config";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
} from "reactstrap";
import axios from "axios";

// var AWS = require("@aws-sdk/client-ivs");

const GetSteamKey = () => {
    const [data, setData] = useState([{username: "", skey: "Loading.."}]);
    const [ivschannels, setchannels] = useState([{channel:''}]);

    const [text, setText] = useState("");

    const [isCopied, setIsCopied] = useState(false);

    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };
    const channelSubmit = (e) => {
        e.preventDefault()
        const target = e.target;
        const value = target.value;
        const name = target.name;
        console.log(target)
        console.log(value)
        console.log(name)


    };

    useEffect(() => {

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // GET All channels
        axios.get("/api/getchannel").then((res) => {
            // console.log(res.data);
            setchannels(res.data);

        });


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

                    config.getChannel(params2, function (err, getChanneldata) {
                        if (err) console.log(err, err.stack); // an error occurred
                        else
                            // console.log(getChanneldata['channel']['arn']);
                            setData([{username: getChanneldata['channel'].ingestEndpoint, skey: skey}]);

                    });
                });
            }
        });
    }, [])

    return (
        <>
            <div className="container" style={{margin: "10px"}}>
                {/*<form onSubmit={this.channelSubmit} ref={(el) => this.myFormRef = el}>*/}
                {/*<form className="form-horizontal" name="channels" onSubmit={e => channelSubmit(e)}>*/}
                <div className="form-group">
                    <label htmlFor="channels"><b>Choose a channel:</b></label> &nbsp;
                    <select id="channels" name="channels" className="form-control" style={{width: '40%'}}>
                        {
                            // console.log(ivschannels[0].ivschannel)
                            ivschannels.map((list, index) => {
                                return (
                                    <option value={list.ivschannel} id={list.ivschannel}
                                            key={list} name={list.ivschannel}>{list.ivschannel} </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <input type="submit" value="submit" className="btn btn-default"  />
                        {/*<button type="submit" className="btn btn-default" >Submit</button>*/}
                    </div>
                </div>
                {/*</form>*/}
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Live Streaming Data</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                    <tr>

                                        <th>Ingest Endpoint</th>
                                        <th>Steam Key</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        data.map((item, index) => {
                                            return (
                                                <tr className={"item"} key={index}>
                                                    <td>
                                                        <textarea disabled
                                                                  value={item.username ? 'rtmps://' + item.username + ':443/app/' : ''}
                                                                  placeholder="Loading"
                                                                  onChange={(event) => setText(event.target.value)}
                                                        />
                                                        <CopyToClipboard
                                                            text={item.username ? 'rtmps://' + item.username + ':443/app/' : ''}
                                                            onCopy={onCopyText}>
                                                            <div className="copy-area">
                                                                <button>Copy to Clipboard</button>
                                                                <span
                                                                    className={`copy-feedback ${isCopied ? "active" : ""}`}>

          </span></div></CopyToClipboard></td>
 <td>
                                                        <textarea disabled
                                                                  value={item.skey}
                                                                  placeholder="Loading"
                                                                  onChange={(event) => setText(event.target.value)}
                                                        />
                                                        <CopyToClipboard text={item.skey} onCopy={onCopyText}>
                                                            <div className="copy-area">
                                                                <button>Copy to Clipboard</button>
                                                                <span
                                                                    className={`copy-feedback ${isCopied ? "active" : ""}`}>

          </span>
                                                            </div>
                                                        </CopyToClipboard>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default GetSteamKey

