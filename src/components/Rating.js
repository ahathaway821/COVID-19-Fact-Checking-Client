import React from "react";
import { Row, Col, Card} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import OurRating from './OurRating';
import Feedback from './Feedback';
import ReactSpeedometer from "react-d3-speedometer"

class Rating extends React.Component {
    render() {
        // If claim is pre-checked or not
        if (this.props.isValidatedClaim === true) {
            console.log("this.props", this.props.claimIndexResult);
            const { claim_source, date, explanation, label, source, source_label, fact_check_url } = this.props.claimIndexResult[0];

            let value;
            if (label === "true") {
                value = 95;
            } else {
                value = 5;
            }

            return (
                <div>
                    <Row>
                        <Col>
                            <Card style={{ height: '18rem' }}>
                                <Card.Header>Claim</Card.Header>
                                <Card.Body>
                                    <Card.Title>{this.props.claim}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ height: '18rem' }}>
                                <Card.Header>
                                    Rating
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text><i>This claim was fact-checked by {source}</i></Card.Text>
                                    <center>
                                        <ReactSpeedometer
                                            width={250}
                                            minValue={0}
                                            maxValue={100}
                                            needleHeightRatio={0.6}
                                            value={value}
                                            customSegmentStops={[0, 25, 75, 100]}
                                            segmentColors={["#dc3545", "#ffc107", "#28a745"]}
                                            currentValueText="Rating"
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
                                            ringWidth={25}
                                            needleTransitionDuration={3333}
                                            needleTransition="easeElastic"
                                            needleColor={"#a7ff83"}
                                            textColor={"#000000"}
                                            labelFontSize={"13"}
                                        />
                                    </center>
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
                                {date !== "1970-01-01" ? date : "-"}
                            </Card.Text>
                            <Card.Title>
                                Fact Check URL
                            </Card.Title>
                            <Card.Text>
                                {fact_check_url ? <a href={fact_check_url}>{fact_check_url}</a> : "-"}
                            </Card.Text>
                            <Card.Title>
                                Source of Claim
                            </Card.Title>
                            <Card.Text>
                                {claim_source.trim() ? <a href={claim_source}>{claim_source}</a> : "-"}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                   <Feedback claim={this.props.claim} isValidatedClaim={this.props.isValidatedClaim} />
                </div>      
            );
        } else {
            return (
                <div>
                    <Row>
                        <Col>
                            <Card style={{ height: '18rem' }}>
                                <Card.Header>Claim</Card.Header>
                                <Card.Body>
                                    <Card.Title>{this.props.claim}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <OurRating claim={this.props.claim}/>
                        </Col>
                    </Row>
                    <br />
                    <Feedback claim={this.props.claim} isValidatedClaim={this.props.isValidatedClaim}/>
                </div>
            );
        }
    }
}

export default withRouter(Rating);
