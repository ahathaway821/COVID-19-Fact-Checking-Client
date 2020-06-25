import React from "react";
import { withRouter } from "react-router-dom";

class Predict extends React.Component {
    render() {
        console.log("Predict this.props ", this.props);
        return (
            <div>
                <h2>Prediction</h2>
                <h3>Claim is {this.props.location.state.claim}</h3>
            </div>
        );
    }
}

export default withRouter(Predict);
