import React from "react";
import { Card } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class SimilarClaims extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <Card.Body>List of Similar Claims</Card.Body>
                </Card>
            </div>
        );
    }
}

export default withRouter(SimilarClaims);
