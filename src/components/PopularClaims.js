import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { withRouter } from "react-router-dom";

class PopularClaims extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(val, e) {
        let claim;
        if (val === 1) {
            claim = 'Face masks can be steamed for reuse.';
        } else if (val === 2) {
            claim = '5G mobile networks do not spread COVID-19'
        } else if (val === 3) {
            claim = 'Hydroxychloroquine (HCQ) can prevent COVID-19'
        } else {
            claim = 'Pets can transmit coronavirus'
        }

        this.props.history.push({
            pathname: '/predict',
            state: { 
                claim: claim,
                validatedClaim: false
            }
        })
    }

    render() {
        return (
            <div>
                <b>Most Searched Claims</b>
                <ListGroup variant="flush">
                    <ListGroup.Item action onClick={(e) => this.handleClick(1, e)}>Face masks can be steamed for reuse</ListGroup.Item>
                    <ListGroup.Item action onClick={(e) => this.handleClick(2, e)}>5G mobile networks do not spread COVID-19</ListGroup.Item>
                    <ListGroup.Item action onClick={(e) => this.handleClick(3, e)}>Hydroxychloroquine (HCQ) can prevent COVID-19</ListGroup.Item>
                    <ListGroup.Item action onClick={(e) => this.handleClick(4, e)}>Pets can transmit coronavirus</ListGroup.Item>
                </ListGroup>
            </div>
        );
    }
}

export default withRouter(PopularClaims);
