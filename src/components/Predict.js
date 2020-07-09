import React from "react";
import { withRouter } from "react-router-dom";
import { Card, Tab, Tabs, Container, ProgressBar, Popover, Row, Col, Button } from "react-bootstrap";
import ReactSpeedometer from "react-d3-speedometer"

import Rating from "./Rating";
import ClaimSearch from "./ClaimSearch";
import SimilarClaims from "./SimilarClaims";
import ResearchPapers from "./ResearchPapers";

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
        this.myRef = React.createRef();
    }

    handleChangeValue(val) {
        this.myRef = val;
    }

    handleSelectedValue(val) {
        if (!val[0]) {
            return;
        }

        this.setState({claimIndexResult: val, claim: val[0].claim, isValidatedClaim: true });
        this.props.history.push({
            pathname: '/predict',
            state: { claimIndexResult: val, claim: val[0].claim, isValidatedClaim: true }
        })
    }

    handlePredict() {
        const newClaim = this.myRef;
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
                                placeHolder={"Search for another claim"}
                            />
                        </Col>
                        <Col xs={4} md={2}>
                            <Button variant="secondary" onClick={this.handlePredict}>Predict</Button>
                        </Col>
                    </Row>
                </Container>
                <br />
                {/* <Row>
                    <Col>
                        <Card style={{ height: '10rem' }}>
                            <Card.Header>Claim</Card.Header>
                            <Card.Body>
                                <Card.Title>{this.state.claim}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ height: '10rem' }}>
                            <Card.Header>
                                Rating
                            </Card.Header>
                            <Card.Body>
                                <center>
                                    <ReactSpeedometer
                                        width={200}
                                        minValue={0}
                                        maxValue={100}
                                        needleHeightRatio={0.6}
                                        value={95}
                                        customSegmentStops={[0, 25, 75, 100]}
                                        segmentColors={["#dc3545", "#ffc107", "#28a745"]}
                                        currentValueText="COVIDFact Rating"
                                        customSegmentLabels={[
                                        {
                                            text: "False",
                                            position: "OUTSIDE",
                                            color: "#000000",
                                        },
                                        {
                                            text: "Not enough evidence",
                                            position: "OUTSIDE",
                                            color: "#000000",
                                        },
                                        {
                                            text: "True",
                                            position: "OUTSIDE",
                                            color: "#000000",
                                        },
                                        ]}
                                        ringWidth={20}
                                        needleTransitionDuration={3333}
                                        needleTransition="easeElastic"
                                        needleColor={"#a7ff83"}
                                        textColor={"#000000"}
                                        labelFontSize={12}
                                    />
                                </center>
                                <br />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row> */}
                <Card>
                    <Card.Header>Claim</Card.Header>
                    <Card.Body>
                        <Card.Title>{this.state.claim}</Card.Title>
                    </Card.Body>
                </Card>
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
