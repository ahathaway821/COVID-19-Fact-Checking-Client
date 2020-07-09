import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Image, Button } from "react-bootstrap";

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
            isValidatedClaim: false,
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
        this.setState({ value: val[0].claim, isValidatedClaim: true });
        this.props.history.push({
            pathname: '/predict',
            state: { claimIndexResult: val, claim: val[0].claim, isValidatedClaim: true }
        })
    }

    handlePredict() {
        this.props.history.push({
            pathname: '/predict',
            state: { 
                claim: this.myRef,
                isValidatedClaim: false,
            }
        })
    }

    render() {
        return (
            <div>              
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Image src={logo} width={350} height={350} rounded />
                    </Col>
                </Row>
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