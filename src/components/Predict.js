import React from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { Card, Tab, Tabs, ProgressBar, Popover } from "react-bootstrap";

import ClaimSearch from "./ClaimSearch";
import SimilarClaims from "./SimilarClaims";
import ResearchPapers from "./ResearchPapers";

import '../App.css';

class Predict extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        axios.get(`https://wqvhh7uvbc.execute-api.us-east-2.amazonaws.com/search?query=${this.props.location.state.claim}`)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.data
                    });
                },
                (error) => {
                    console.log("error is ", error);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const progressBarPercentage = 80;
        // const rating = "True";
        const rating = "False";
        let variant;
        if (rating === "True") {
            variant = "success"
        } else {
            variant = "danger"
        }

        // const popover = (
        //     <Popover id="popover-basic">
        //         <Popover.Title as="h3">Popover right</Popover.Title>
        //         <Popover.Content>
        //             And here's some <strong>amazing</strong> content. It's very engaging.
        //             right?
        //         </Popover.Content>
        //     </Popover>
        // );

        return (
            <div>
                <ClaimSearch 
                    onChangeValue={this.handleChangeValue} 
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
                <Card>
                    <Card.Header>Our Rating</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            {rating}
                            {/* {' '} */}
                            {/* <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                <Button variant="info" size="sm"><FiInfo /></Button>
                            </OverlayTrigger> */}
                        </Card.Title>
                        <ProgressBar 
                            now={progressBarPercentage} 
                            label={`${progressBarPercentage}% ${rating}`} 
                            variant={variant}
                        />
                        <br />
                    </Card.Body>
                </Card>
                <br />
                <Tabs transition={false} id="list-research-papers" defaultActiveKey="first">
                    <Tab eventKey="first" title="Relevant Research Papers">
                        <ResearchPapers
                            isLoaded={this.state.isLoaded}
                            items={this.state.items}
                        />
                    </Tab>
                    <Tab eventKey="second" title="Similar Claims">
                        <br />
                        <SimilarClaims />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default withRouter(Predict);
