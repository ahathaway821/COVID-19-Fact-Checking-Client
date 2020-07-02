import React from "react";
import { Button, ListGroup, ListGroupItem, Accordion, Card, DropdownButton, Dropdown } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import ClaimSearch from "./ClaimSearch";

import logo from "../img/logo2.png";
import 'react-bootstrap-typeahead/css/Typeahead.css';

const imageStyle = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
};

const divStyle = {
    width: "800px",
    margin: "0 auto"
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
        this.handlePredict = this.handlePredict.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
    }

    handleChangeValue = (val, selected) => {
        console.log("handleChangeValue ", val, selected);
        if (selected === true) {
            this.setState({value: val[0].claim});
        } else {
            this.setState({value: val});
        }
        // this.setState({value: val[0].claim ? val[0].claim : val});
    }

    handlePredict(e) {
        console.log("handle predict ", e.target.value);
        this.props.history.push({
            pathname: '/predict',
            state: { claim: this.state.value }
        })
    }

    render() {
        // console.log("this.props are ", this.props);
        return (
            <div>
                <img 
                    src={logo} 
                    alt={"CovidFact"} 
                    style={imageStyle}
                    width={400}
                    height={400}
                />
                <ClaimSearch 
                    onChangeValue={this.handleChangeValue} 
                    placeHolder={"Search for a COVID-19 Fact"}
                />
                <br />
                <div className="text-center">
                    <Button variant="secondary" onClick={this.handlePredict}>Predict Claim</Button>
                </div>
                <br />
                {/* <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                            Most Searched Claims
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>Cras justo odio</Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>Dapibus ac facilisis in</Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>Morbi leo risus</Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>Porta ac consectetur acs</Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>Vestibulum at eros</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion> */}
                {/* <Card>
                    <Card.Body>
                        <Card.Title>Most Searched Claims</Card.Title>
                    </Card.Body>
                    <ListGroup defaultActiveKey="#link1" variant="flush">
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    </ListGroup>
                </Card> */}
                <b>Most Searched Claims</b>
                <ListGroup variant="flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                </ListGroup>
            </div>
        );
    }
}

export default withRouter(Home);