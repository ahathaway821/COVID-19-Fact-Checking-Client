import React from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import ClaimSearch from "./ClaimSearch";

import logo from "../img/logo.png";
import 'react-bootstrap-typeahead/css/Typeahead.css';

const imageStyle = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
        this.handlePredict = this.handlePredict.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
    }

    handleChangeValue = (val) => {
        this.setState({value: val[0].claim});
    }

    handlePredict() {
        this.props.history.push({
            pathname: '/predict',
            state: { claim: this.state.value }
        })
    }

    render() {
        console.log("this.props are ", this.props);
        return (
            <div>
                <img 
                    src={logo} 
                    alt={"CovidFact"} 
                    style={imageStyle} 
                />
                <ClaimSearch onChangeValue={this.handleChangeValue} />
                <br />
                <div className="text-center">
                    <Button variant="secondary" onClick={this.handlePredict}>Predict Claim</Button>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);