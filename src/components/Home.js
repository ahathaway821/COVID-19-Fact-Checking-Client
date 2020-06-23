import React from "react";
import logo from "../img/logo.png";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { ClaimSearch } from '.'

import 'react-bootstrap-typeahead/css/Typeahead.css';

/*
Examples: 
1. https://codesandbox.io/s/react-bootstrap-typeahead-async-pagination-example-qg895?file=/src/index.js:2538-2915
2. http://ericgio.github.io/react-bootstrap-typeahead/#asynchronous-searching
*/

const imageStyle = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handlePredict = this.handlePredict.bind(this);
    }

    handlePredict() {
        this.props.history.push("/predict");
    }

    render() {
        return (
            <div>
                <img 
                    src={logo} 
                    alt={"CovidFact"} 
                    style={imageStyle} 
                />
                <ClaimSearch/>
                <br />
                <div className="text-center">
                    <Button variant="secondary" onClick={this.handlePredict}>Predict Claim</Button>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);