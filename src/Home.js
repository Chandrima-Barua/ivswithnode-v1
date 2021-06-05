import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Channel from './Channel';
import GetKey from './GetStreamKey';
import GetQuizs from './GetQuiz';
import SetQuizs from "./SetQuiz";
import StreamThirdParty from "./StreamThirdParty";
// var AWS = require("@aws-sdk/client-ivs");

class SteamKey extends React.Component {
    render()
    {
        return (
            <Router>
            <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
                {/*<a className="navbar-brand" href="/">Home</a>*/}
                {/*<Link className="navbar-brand" to="/">Home</Link>*/}
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/create_channel">Create Channel</Link>
                            {/*<a className="nav-link" href="/create_channel">Create Channel <span className="sr-only">(current)</span></a>*/}
                        </li>
                        <li className="nav-item">
                            {/*<a className="nav-link" href="#">Link</a>*/}
                            <Link className="nav-link" to="/getstreamkey">Get Stream Key</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/setquiz">Set Quiz</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/getquiz">Get Quiz</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/thirdpartystream">Third Party Stream</Link>
                        </li>
                    </ul>

                </div>
            </nav>
                <Switch>
                    {/*<Route exact path="/">*/}
                    {/*    <Home/>*/}
                    {/*</Route>*/}
                    <Route path="/create_channel">
                        <CreateChannel/>
                    </Route>
                    <Route path="/getstreamkey">
                        <StreamKey/>
                    </Route>
                    <Route path="/setquiz">
                        <SetQuiz/>
                    </Route>
                    <Route path="/getquiz">
                        <Quiz/>
                    </Route>
                    <Route path="/thirdpartystream">
                        <ThirdParty/>
                    </Route>
                </Switch>
            </Router>
            // <Router>
            //     <div>
            //         <ul>
            //             <li>
            //                 <Link to="/">Home</Link>
            //             </li>
            //             <li>
            //                 <Link to="/create_channel">Create Channel</Link>
            //             </li>
            //             <li>
            //                 <Link to="/getstreamkey">Get Stream Key</Link>
            //             </li>
            //             <li>
            //                 <Link to="/setquiz">Set Quiz</Link>
            //             </li>
            //             <li>
            //                 <Link to="/getquiz">Get Quiz</Link>
            //             </li>
            //             <li>
            //                 <Link to="/thirdpartystream">Third Party Stream</Link>
            //             </li>
            //         </ul>
            //
            //         <hr/>
            //
            //         <Switch>
            //             <Route exact path="/">
            //                 <Home/>
            //             </Route>
            //             <Route path="/create_channel">
            //                 <CreateChannel/>
            //             </Route>
            //             <Route path="/getstreamkey">
            //                 <StreamKey/>
            //             </Route>
            //             <Route path="/setquiz">
            //                 <SetQuiz/>
            //             </Route>
            //             <Route path="/getquiz">
            //                 <Quiz/>
            //             </Route>
            //             <Route path="/thirdpartystream">
            //                 <ThirdParty/>
            //             </Route>
            //         </Switch>
            //     </div>
            // </Router>
        );
    }
}

// function Home() {
//     return (
//         <div>
//            Home
//         </div>
//
//     );
// }

function CreateChannel() {
    return (
        <Channel />
    );
}

function StreamKey() {
    return (
        <GetKey />
    );
}
function SetQuiz() {
    return (
        <SetQuizs />
    );
}
function Quiz() {
    return (
        <GetQuizs />
    );
}
function ThirdParty() {
    return (
        <StreamThirdParty />
    );
}
export default SteamKey;