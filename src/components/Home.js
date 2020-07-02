import React from "react";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

import ClaimSearch from "./ClaimSearch";
import PopularClaims from "./PopularClaims";

import logo from "../img/logo2.png";
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
            value: '',
            validatedClaim: false,
        }
        this.handlePredict = this.handlePredict.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleSelectedValue = this.handleSelectedValue.bind(this);
        this.myRef = React.createRef();
    }

    handleChangeValue(val) {
        this.myRef = val;
    }

    handleSelectedValue(val) {
        this.setState({ value: val[0].claim, validatedClaim: true });
        this.props.history.push({
            pathname: '/predict',
            state: { claim: val[0].claim, validatedClaim: true }
        })
    }

    handlePredict() {
        this.props.history.push({
            pathname: '/predict',
            state: { claim: this.state.value === "" ? this.myRef : this.state.value, validatedClaim: false }
        })
    }

    render() {
        return (
            <div>
                <img 
                    src={logo} 
                    alt={"CovidFact"} 
                    style={imageStyle}
                    width={400}
                    height={400}
                />
                <ClaimSearch 
                    onSelectedValue={this.handleSelectedValue} 
                    onChangeValue={this.handleChangeValue}
                    placeHolder={"Search for a COVID-19 Fact"}
                />
                <br />
                <div className="text-center">
                    <Button variant="secondary" onClick={this.handlePredict}>Predict Claim</Button>
                </div>
                <br />
                <PopularClaims />
            </div>
        );
    }
}

export default withRouter(Home);