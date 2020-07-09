import React from "react";
import axios from 'axios';
import { Card, Spinner, ProgressBar } from "react-bootstrap";
import { withRouter } from "react-router-dom";

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
        const truthfulPercentage = (score * 100).toFixed(2);
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
            const progressBarPercentage = this.getConfidenceLevel(this.state.score, this.threshold)
            const ratingLabel = this.getRatingLabel(this.state.score, this.threshold);
            return (
                <Card style={{ height: '10rem' }}>
                <Card.Header>Our Rating</Card.Header>
                <Card.Body>
                    <Card.Title>
                        {ratingLabel}
                    </Card.Title>
                    <ProgressBar 
                        now={progressBarPercentage} 
                        label={`${progressBarPercentage}% ${ratingLabel}`} 
                        variant={this.getProgressBarVariant(this.state.score, this.threshold)}
                    />
                </Card.Body>
                </Card>
            );
        }

        return  (
            <div>
                <br />
                <Spinner animation="border" variant="secondary">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }    
}


export default withRouter(OurRating);
