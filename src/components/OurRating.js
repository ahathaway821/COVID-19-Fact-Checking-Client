import React from "react";
import axios from 'axios';
import { Card, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import ReactSpeedometer from "react-d3-speedometer"

class OurRating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            score: 0
        };

        this.threshold = .5;
    }

    getConfidenceLevel = (score, threshold) => {
        const truthfulPercentage = +(score * 100).toFixed(2);
        if (score > threshold) {
            return truthfulPercentage
        }
        else {
            return 100 - truthfulPercentage;
        }
    }

    getRatingLabel = (score, threshold) => {
        return score > threshold ? "True" : "False";
    }

    getProgressBarVariant = (score, threshold) => {
        return score > threshold ? "success" : "danger";
    }

    componentDidUpdate(prevProps) {
        if (prevProps.claim !== this.props.claim) {
            this.getPredictionRating(this.props.claim);
        }
    }

    getPredictionRating(claim) {
        this.setState({isLoaded: false, error: null})
        axios.get(`https://eqx0uj4n69.execute-api.us-west-2.amazonaws.com/dev/bert-cnn?claim=${this.props.claim}`)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        score: result.data
                    });
                }
            )
            .catch(error => {
                console.log(error.response);
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }

    componentDidMount() {
        this.getPredictionRating(this.props.claim)
    }

    render() {
        if (this.state.isLoaded === true) {
            let progressBarPercentage = this.getConfidenceLevel(this.state.score, this.threshold)
            const ratingLabel = this.getRatingLabel(this.state.score, this.threshold);

            let value;
            if(ratingLabel === "False") {
                value = 100 - progressBarPercentage
            } else {
                value = progressBarPercentage
            }
            return (
                <Card style={{ height: '18rem' }}>
                    <Card.Header>
                        Our Rating ({progressBarPercentage}% {ratingLabel})
                    </Card.Header>
                    <Card.Body>
                        <Card.Text><i>This rating was predicted by our algorithm</i></Card.Text>
                        <center>
                            <ReactSpeedometer
                                width={250}
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
                                ringWidth={25}
                                needleTransitionDuration={3333}
                                needleTransition="easeElastic"
                                needleColor={"#a7ff83"}
                                textColor={"#000000"}
                                labelFontSize={"13"}
                            />
                        </center>
                        <br />
                    </Card.Body>
                </Card>
            );
        }

        return  (
            <div>
                <br />
                <center>
                    <Spinner animation="border" variant="secondary">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </center>
            </div>
        );
    }    
}


export default withRouter(OurRating);
