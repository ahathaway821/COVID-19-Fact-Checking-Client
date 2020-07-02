import React from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';
import { Card, Tab, Button, Tabs, Spinner, Badge, ListGroup, CardGroup, ProgressBar, OverlayTrigger, Popover } from "react-bootstrap";
// import { FiInfo } from "react-icons/fi"
import ClaimSearch from "./ClaimSearch";
import '../App.css';

const divStyle = {
    width: "800px",
    margin: "0 auto"
};

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
        // const claim = "masks are useful"
        axios.get(`https://wqvhh7uvbc.execute-api.us-east-2.amazonaws.com/search?query=${this.props.location.state.claim}`)
            .then(
                (result) => {
                    console.log("result is ", result);
                    this.setState({
                        isLoaded: true,
                        items: result.data
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
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
        // console.log("Predict this.props ", this.props);
        // console.log("Predict this.state ", this.state);

        // const abstractStyle = {
        //     maxWidth: "100%"
        // };

        const progressBarPercentage = 80;
        // const rating = "True";
        const rating = "False";
        let variant;
        if (rating === "True") {
            variant = "success"
        } else {
            variant = "danger"
        }

        const items = this.state.isLoaded ? this.state.items.map((item, key) => {
            return (
                <div key={item.id}>
                    <br />
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                {item.fields.title ? item.fields.title.replace( /(<([^>]+)>)/ig, '') : ""}
                            </Card.Title>
                            {/* <span class="d-inline-block text-truncate" style={abstractStyle}>
                                {item.fields.abstract.replace( /(<([^>]+)>)/ig, '')}
                            </span> */}
                            <Card.Text>
                                <b>Absract: </b> 
                                {item.fields.abstract ? item.fields.abstract.replace( /(<([^>]+)>)/ig, '').substring(0,500) + "..." : ""}
                            </Card.Text>
                            <Card.Text>
                                <b>Keywords: </b>
                                {item.fields.keywords_ml ? item.fields.keywords_ml.slice(0,5).map( keyword =>
                                    <span>
                                        <Badge variant="info" key={`${keyword}`}>
                                            {keyword}
                                        </Badge>{' '}
                                    </span>
                                ) : ""}
                            </Card.Text>
                            <Card.Text>
                                <b>Categories: </b>
                                {item.fields.tags ? item.fields.tags.map( tag =>
                                    <span>
                                        <Badge variant="secondary" key={`${tag}`}>
                                            {tag}
                                        </Badge>{' '}
                                    </span>
                                ) : ""}
                            </Card.Text>
                            <Button variant="primary" href={item.fields.link} target="__blank" size="sm">Link to Paper</Button>
                        </Card.Body>
                    </Card>
                </div>
        )}): (
            <div>
                <br />
                <Spinner animation="border" variant="secondary">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );

        const popover = (
            <Popover id="popover-basic">
                <Popover.Title as="h3">Popover right</Popover.Title>
                <Popover.Content>
                    And here's some <strong>amazing</strong> content. It's very engaging.
                    right?
                </Popover.Content>
            </Popover>
        );

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
                {/* <h4>Claim</h4>
                <ListGroup variant="flush">
                    <ListGroup.Item>{this.props.location.state.claim}</ListGroup.Item>
                </ListGroup>
                <h4>Our Verdict</h4>
                <ListGroup variant="flush">
                    <ListGroup.Item>{"True"}</ListGroup.Item>
                </ListGroup>
                <CardGroup>
                    <Card>
                        <Card.Body>
                            <Card.Title>Claim</Card.Title>
                            <Card.Text>
                                {this.props.location.state.claim}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Our Verdict</Card.Title>
                            <Card.Text>
                                {"Partly True"}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardGroup> */}
                <br />
                <Tabs id="list-research-papers" defaultActiveKey="first" className="myClass">
                    <Tab eventKey="first" title="Relevant Research Papers">
                        {items}
                    </Tab>
                    <Tab eventKey="second" title="Similar Claims">
                        <br />
                        <Card>
                            <Card.Body>List of Similar Claims</Card.Body>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default withRouter(Predict);
