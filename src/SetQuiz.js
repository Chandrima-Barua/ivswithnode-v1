import React, {useEffect, useState} from "react";
import axios from "axios";
import "./App.css";
import $ from "jquery";
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";

var path = require("path");
var srcpath = path.join(__dirname, "/public");

class SetQuizs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            qus: "",
            ans1: "",
            ans2: "",
            ans3: "",
            correctans: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        // this.setState({value: event.target.value});
        const target = event.target;
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {

        const qus = this.state.qus;
        const ans1 = this.state.ans1;
        const ans2 = this.state.ans2;
        const ans3 = this.state.ans3;
        const correctans = this.state.correctans;
        console.log("Question: " + qus);
        console.log("Answer 1: " + ans1);
        console.log("Answer 2: " + ans2);
        console.log("Answer 3: " + ans3);
        console.log("Correct Answer: " + correctans);
        event.preventDefault();

        var quizdata = {
            qus: qus,
            ans1: ans1,
            ans2: ans2,
            ans3: ans3,
            correctans: correctans,
        };


        axios.post( "/api/savedata", quizdata)
            .then((res) => {
                console.log(res.data);
                $(".quizdata").val('')
                alert("Saved!")
            })
            .catch((error) => {
                console.log(error);
            });

    }

    render() {
        return (

            // <div className="container">
            //     <h2>Horizontal form</h2>
            //     <form className="form-horizontal" action="/action_page.php">
            //         <div className="form-group">
            //             <label className="control-label col-sm-2" htmlFor="email">Email:</label>
            //             <div className="col-sm-10">
            //                 <input type="email" className="form-control" id="email" placeholder="Enter email"
            //                        name="email"/>
            //             </div>
            //         </div>
            //         <div className="form-group">
            //             <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
            //             <div className="col-sm-10">
            //                 <input type="password" className="form-control" id="pwd" placeholder="Enter password"
            //                        name="pwd"/>
            //             </div>
            //         </div>
            //         <div className="form-group">
            //             <div className="col-sm-offset-2 col-sm-10">
            //                 <div className="checkbox">
            //                     <label><input type="checkbox" name="remember"/> Remember me</label>
            //                 </div>
            //             </div>
            //         </div>
            //         <div className="form-group">
            //             <div className="col-sm-offset-2 col-sm-10">
            //                 <button type="submit" className="btn btn-default">Submit</button>
            //             </div>
            //         </div>
            //     </form>
            // </div>

            <div style={{margin: "10px"}}>
            <Card >
                <CardHeader>
                    <CardTitle tag="h4"> Set Quiz Questions</CardTitle>
                </CardHeader>
                <CardBody>
                <form onSubmit={this.handleSubmit} ref={(el) => this.myFormRef = el}>
                    <div><label>
                        Question: &nbsp; <input name="qus" type="text" value={this.state.qus}
                                                class="quizdata" onChange={this.handleChange}/> </label>
                        <br/>
                        <label>Answer 1: &nbsp; <input name="ans1"
                                                       type="text"
                                                       value={this.state.ans1}
                                                       class="quizdata"  onChange={this.handleChange}/>
                        </label>
                        <br/>
                        <label>Answer 2: &nbsp; <input name="ans2" type="text" value={this.state.ans2}
                                                       class="quizdata" onChange={this.handleChange}/>
                        </label>
                        <br/>
                        <label>Answer 3: &nbsp; <input name="ans3" type="text" value={this.state.ans3}
                                                       class="quizdata" onChange={this.handleChange}/>
                        </label>
                        <br/>
                        <label>
                            Correct Answer: &nbsp; <input name="correctans" type="text" value={this.state.correctans}
                                                          class="quizdata" onChange={this.handleChange}/>
                        </label> &nbsp; <span style={{color: "red"}}>Please give number of the correct answer!</span>
                    </div>
                    <div>
                        <input type="submit" value="Submit"/>
                    </div>
                </form>
                </CardBody>
            </Card>
            </div>
        );
    }
}

export default SetQuizs;