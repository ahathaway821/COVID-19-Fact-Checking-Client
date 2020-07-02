import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { withRouter } from "react-router-dom";

class PopularClaims extends React.Component {
    render() {
        return (
            <div>
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

export default withRouter(PopularClaims);
