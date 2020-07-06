import React from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { Card, Tab, Tabs, ProgressBar, Popover, Row, Col } from "react-bootstrap";

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
            isPaperLoaded: false,
            items: []
        };
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handlePaperSearch = this.handlePaperSearch.bind(this);
        this.handleSelectedValue = this.handleSelectedValue.bind(this);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        this.handlePaperSearch(this.props.location.state.claim);
    }

    handlePaperSearch(claim) {
        axios.get(`https://wqvhh7uvbc.execute-api.us-east-2.amazonaws.com/search?query=${claim}`)
            .then(
                (result) => {
                    this.setState({
                        isPaperLoaded: true,
                        items: result.data
                    });
                },
                (error) => {
                    console.log("error is ", error);
                    this.setState({
                        isPaperLoaded: true,
                        error
                    });
                }
            )
            .catch(error => {
                console.log(error.response);
                this.setState({
                    isPaperLoaded: true,
                    error
                });
            });
    }

    handleChangeValue(val) {
        this.myRef = val;
    }

    handleSelectedValue(val, searchAgain) {
        if (searchAgain === true) {
            this.setState({ isPaperLoaded: false, items: [] });
            this.handlePaperSearch(val[0].claim);
        }

        this.setState({ value: val[0].claim, validatedClaim: true });
        this.props.history.push({
            pathname: '/predict',
            state: { result: val, claim: val[0].claim, validatedClaim: true }
        })
    }

    render() {
        /*
            1. If claim is already fact-checked,
                - mention that
                - show explanation
                - show date0
                - show fact check URL
            2. If claim is not a pre-checked claim,
                - run the prediction algorithm endpoint
        */

        console.log("render again, ", this.state);

        const { validatedClaim, result } = this.props.location.state;

        return (
            <div>
                <ClaimSearch 
                    onSelectedValue={this.handleSelectedValue}                 
                    onChangeValue={this.handleChangeValue}
                    searchAgain={true}
                    placeHolder={"Search for another claim"}
                />
                <br />
                <Card>
                    <Card.Header>Claim</Card.Header>
                    <Card.Body>
                        <Card.Title>{this.props.location.state.claim}</Card.Title>
                    </Card.Body>
                </Card>
                <br />
                <Rating validatedClaim={validatedClaim} result={result} />
                <br />
                <Tabs transition={false} id="list-research-papers" defaultActiveKey="first">
                    <Tab eventKey="first" title="Relevant Research Papers">
                        <ResearchPapers
                            isLoaded={this.state.isPaperLoaded}
                            items={this.state.items}
                            error={this.state.error}
                        />
                    </Tab>
                    <Tab eventKey="second" title="Similar Claims (ordered by closeness)">
                        <br />
                        <SimilarClaims claim={this.props.location.state.claim} />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default withRouter(Predict);
