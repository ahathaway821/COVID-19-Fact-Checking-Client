import React from "react";
import { Row, Col, Card, ProgressBar, Form, Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
// import { HandThumbsUp, HandThumbsDown, CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import RangeSlider from 'react-bootstrap-range-slider';
import OurRating from './OurRating';
import ReactSpeedometer from "react-d3-speedometer"

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showYes: false,
            showNo: false
        };
        this.handleShowYes = this.handleShowYes.bind(this);
        this.handleCloseYes = this.handleCloseYes.bind(this);
        this.handleShowNo = this.handleShowNo.bind(this);
        this.handleCloseNo = this.handleCloseNo.bind(this);
    }

    handleShowYes() {
        this.setState({ showYes: true });
    }

    handleCloseYes() {
        this.setState({ showYes: false });
    }

    handleShowNo() {
        this.setState({ showNo: true });
    }

    handleCloseNo() {
        this.setState({ showNo: false });
    }

    render() {
        // console.log("validatedClaim is ", this.props.isValidatedClaim);
        // console.log("result is ", this.props.claimIndexResult);
        
        // If claim is pre-checked or not
        if (this.props.isValidatedClaim === true) {
            const { claim_source, date, explanation, label } = this.props.claimIndexResult[0];

            // let variant;
            let value;
            if (label === "true") {
                value = 90;
                // variant = "success"
            } else {
                value = 10;
                // variant = "danger"
            }

            return (
                <div>
                    <Row>
                        <Col>
                            <Card style={{ height: '18rem' }}>
                                <Card.Header>
                                    Rating
                                    {/* Add info popover to indicate this was checked by a human */}
                                </Card.Header>
                                <Card.Body>
                                    {/* <b>{label.charAt(0).toUpperCase() + label.slice(1)} */}
                                    {/* <ProgressBar 
                                        now={100} 
                                        label={`${100}% ${label}`} 
                                        variant={variant}
                                    /> */}
                                    <center>
                                        <ReactSpeedometer
                                            width={300}
                                            minValue={0}
                                            maxValue={100}
                                            needleHeightRatio={0.6}
                                            value={value}
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
                                            ringWidth={45}
                                            needleTransitionDuration={3333}
                                            needleTransition="easeElastic"
                                            needleColor={"#a7ff83"}
                                            textColor={"#000000"}
                                        />
                                    </center>
                                    <br />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ height: '18rem' }}>
                                <Card.Header>Feedback</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        Was this page helpful to you?
                                        {' '}
                                        <Button variant="link" onClick={this.handleShowYes}>
                                            YES
                                        </Button>
                                        <Button variant="link" onClick={this.handleShowNo}>
                                            NO
                                        </Button>
                                        {/* <Button variant="link" size="lg">
                                            <CheckCircleFill size="1.25em" />
                                        </Button>
                                        <Button variant="link" size="lg">
                                            <XCircleFill size="1.25em" />
                                        </Button> */}
                                        <Modal show={this.state.showYes} onHide={this.handleCloseYes}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Glad you found CovidFact helpful</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                Thanks for the positive feedback. <br />
                                                Please answer a couple of questions below to tell us what you liked about our product
                                                <hr />
                                                <Form>
                                                    <Form.Group controlId="formBasicRange">
                                                        <Form.Label><b>From a scale of 1 - 10, how easy was it to navigate the website</b></Form.Label>
                                                        <RangeSlider
                                                            value={2}
                                                            min={1}
                                                            max={5}
                                                            tooltip={'on'}
                                                            // onChange={changeEvent => this.setState({value: (Number(changeEvent.target.value))}
                                                        />
                                                        <br />
                                                    </Form.Group>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label><b>What did we do well?</b></Form.Label>
                                                        <Form.Check 
                                                            type={'checkbox'}
                                                            id={`default-checkbox`}
                                                            label={`Easy to use`}
                                                        />
                                                        <Form.Check 
                                                            type={'checkbox'}
                                                            id={`default-checkbox`}
                                                            label={`Research Papers were helpful`}
                                                        />
                                                        <Form.Check 
                                                            type={'checkbox'}
                                                            id={`default-checkbox`}
                                                            label={`Helped validate my opinion`}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label><b>Any other comments?</b></Form.Label>
                                                        <Form.Control as="textarea" rows="3" />
                                                        <Form.Text className="text-muted">
                                                            <i>This feedback is anonymous</i>
                                                        </Form.Text>
                                                    </Form.Group>
                                                </Form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={this.handleCloseYes}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={this.handleCloseYes}>
                                                    Submit
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <Modal show={this.state.showNo} onHide={this.handleCloseNo}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Modal heading</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={this.handleCloseNo}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={this.handleCloseNo}>
                                                    Save Changes
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <br />
                    <Card>
                        <Card.Header>More Details</Card.Header>
                        <Card.Body>
                            <Card.Title>
                                Explanation
                            </Card.Title>
                            <Card.Text>
                                {explanation ? explanation : "-"}
                            </Card.Text>
                            <Card.Title>
                                Fact Check Date
                            </Card.Title>
                            <Card.Text>
                                {date ? date : "-"}
                            </Card.Text>
                            <Card.Title>
                                Source of Claim
                            </Card.Title>
                            <Card.Text>
                                {claim_source ? <a href={claim_source}>{claim_source}</a> : "-"}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>      
            );
        } else {
            return (
                <div>
                    <Row>
                        <Col>
                            <OurRating claim={this.props.claim}/>
                        </Col>
                        <Col>
                            <Card style={{ height: '10rem' }}>
                                <Card.Header>Feedback</Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Was this page helpful to you?</Form.Label>
                                            <Form.Control as="select" size="sm">
                                                <option>Yes</option>
                                                <option>No</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

export default withRouter(Rating);
