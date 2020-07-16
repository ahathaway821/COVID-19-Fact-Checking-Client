import React from "react";
import { withRouter } from "react-router-dom";
import { Tab, Tabs, Container, Row, Col, Button } from "react-bootstrap";

import Rating from "./Rating";
import ClaimSearch from "./ClaimSearch";
import SimilarClaims from "./SimilarClaims";
import ResearchPapers from "./ResearchPapers";

import { submitFeedback, feedbackTypes } from "../shared/submitFeedback";

import '../App.css';

class Predict extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            claim: props.location.state.claim,
            isValidatedClaim: props.location.state.isValidatedClaim,
            claimIndexResult: props.location.state.claimIndexResult
        };
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleSelectedValue = this.handleSelectedValue.bind(this);
        this.handlePredict = this.handlePredict.bind(this);
        this.claimInput = React.createRef();
        this.predictButton = React.createRef();
    }

    handleChangeValue(val) {
        this.claimInput = val;
    }

    handleSelectedValue(val) {
        if (!val[0]) {
            return;
        }

        const selectedClaim = val[0].claim;
        submitFeedback(selectedClaim, true, feedbackTypes.userQuery);
        this.setState({claimIndexResult: val, claim: selectedClaim, isValidatedClaim: true });
        this.props.history.push({
            pathname: '/predict',
            state: { claimIndexResult: val, claim: selectedClaim, isValidatedClaim: true }
        })
    }

    handlePredict() {
        const newClaim = this.claimInput;
        submitFeedback(newClaim, false, feedbackTypes.userQuery);
        this.setState({ claim: newClaim, isValidatedClaim: false });
        this.props.history.push({
            pathname: '/predict',
            state: { 
                claim: newClaim, 
                isValidatedClaim: false
            }
        })
    }

    render() {
        return (
            <div>
                <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }} className="sticky-top">
                    <Row>
                        <Col xs={8} md={10}>
                            <ClaimSearch 
                                onSelectedValue={this.handleSelectedValue}                 
                                onChangeValue={this.handleChangeValue}
                                placeHolder={"Search for another COVID-19 claim"}
                                onEnter={this.handlePredict}
                                predictButton={this.predictButton}
                            />
                        </Col>
                        <Col xs={4} md={2}>
                            <Button 
                                variant="secondary" 
                                onClick={this.handlePredict}>
                                Predict
                            </Button>
                        </Col>
                    </Row>
                </Container>
                <br />
                <Rating 
                    claim={this.state.claim} 
                    isValidatedClaim={this.state.isValidatedClaim} 
                    claimIndexResult={this.state.claimIndexResult} 
                />
                <br />
                <Tabs transition={false} id="list-research-papers" defaultActiveKey="first">
                    <Tab eventKey="first" title="Relevant Research Papers">
                        <ResearchPapers claim={this.state.claim}/>
                    </Tab>
                    <Tab eventKey="second" title="Similar Claims">
                        <br />
                        <SimilarClaims claim={this.state.claim} />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default withRouter(Predict);
