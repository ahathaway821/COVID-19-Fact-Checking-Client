import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Image, Button } from "react-bootstrap";

import ClaimSearch from "./ClaimSearch";
import PopularClaims from "./PopularClaims";

import { submitFeedback, feedbackTypes } from "../shared/submitFeedback";

import logo from "../img/logo2.png";
import 'react-bootstrap-typeahead/css/Typeahead.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isValidatedClaim: false,
            isButtonDisabled: true,
        }
        this.handlePredict = this.handlePredict.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleSelectedValue = this.handleSelectedValue.bind(this);
        // this.handleEnter = this.handleEnter.bind(this);
        this.myRef = React.createRef();
    }

    handleChangeValue(val) {
        this.myRef = val;
    }

    handleSelectedValue(val) {
        const selectedClaim = val[0].claim;
        submitFeedback(selectedClaim, true, feedbackTypes.userQuery)

        this.setState({ value: selectedClaim, isValidatedClaim: true });
        this.props.history.push({
            pathname: '/predict',
            state: { claimIndexResult: val, claim: selectedClaim, isValidatedClaim: true }
        })
    }

    handlePredict() {
        if(this.myRef.current !== null) {
            submitFeedback(this.myRef, false, feedbackTypes.userQuery);

            this.props.history.push({
                pathname: '/predict',
                state: { 
                    claim: this.myRef,
                    isValidatedClaim: false,
                }
            })
        }
    }

    // handleEnter() {
    //     if(this.myRef.current !== null) {
    //         console.log("handle enter ", this.myRef);
    //         this.props.history.push({
    //             pathname: '/predict',
    //             state: { 
    //                 claim: this.myRef,
    //                 isValidatedClaim: false,
    //             }
    //         })
    //     }
    // }

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
                    // onEnter={this.handleEnter}
                    placeHolder={"Search for a COVID-19 Claim"}
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