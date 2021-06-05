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
import $ from "jquery";
import axios from "axios";

class GetKey extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            channels: [],
            selectValue: '',
            ingestendpoint:'',
            key:'',
            isCopied:false,
            setIsCopied:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePrint = this.handlePrint.bind(this);

        axios.get("/api/getchannel").then((res) => {
            console.log(res.data);
            this.setState({ channels: res.data });
        }).catch((error) => {
            console.log(error);
        });
    }


    handlePrint() {
        if (this.state.selectValue) {
            console.log(this.state.selectValue);
            var name = this.state.selectValue;
            var channelname = {
                name: name
            };
                axios.post("/api/getchanneldata", channelname)
                    .then((res) => {
                        console.log(res.data);
                        this.setState({ ingestendpoint: res.data[0]['ingestEndpoint'] , key:res.data[0]['skey'] });

                    })
                    .catch((error) => {
                        console.log(error);
                    });
        }
    }

    onCopyText(e) {
        this.state.setIsCopied(true);
        setTimeout(() => {
            this.state.setIsCopied(false);
        }, 1000);
    };

    handleChange(e) {
        this.setState({ selectValue: e.target.value });
        console.log(this.state.selectValue)

    }
    render() {
        return (
            <div className="container" style={{margin: "10px"}}>
                    <div className="form-group">
                        <label htmlFor="channels"><b>Choose a channel:</b></label> &nbsp;
                        <select id="channels" name="channels" className="form-control" style={{width: '40%'}} onChange={this.handleChange}>
                            <option>Select Channel</option>
                            {
                                // console.log(ivschannels[0].ivschannel)
                                // ivschannels.map((list, index) => {
                                    this.state.channels.map((list,index)=>(

                                        <option value={list.ivschannel} id={list.ivschannel}
                                                key={list} name={list.ivschannel}>{list.ivschannel} </option>
                                    ))}

                            }
                        </select> <br/>
                        <button  onClick={this.handlePrint}>Submit</button>
                    </div>
                <br/>
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                    <tr>
                                        <th>Ingest Endpoint</th>
                                        <th>Steam Key</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                   <tr>
                                       <td>{this.state.ingestendpoint ? 'rtmps://' + this.state.ingestendpoint + ':443/app/' : ''}
                                           <CopyToClipboard text={this.state.ingestendpoint ? 'rtmps://' + this.state.ingestendpoint + ':443/app/' : ''}  onClick={this.onCopyText}><div className="copy-area">
                                            <button>Copy</button>
                                                <span className={`copy-feedback ${this.state.isCopied ? "active" : ""}`}>
                                                 </span>
                                           </div>
                                           </CopyToClipboard>
                                       </td>
                                       <td> {this.state.key}
                                           <CopyToClipboard text={this.state.key} onClick={this.onCopyText}>
                                               <div className="copy-area">
                                                      <button>Copy</button>
                                                           <span className={`copy-feedback ${this.state.isCopied ? "active" : ""}`}></span></div>
                                             </CopyToClipboard>
                                       </td>
                                   </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default GetKey;