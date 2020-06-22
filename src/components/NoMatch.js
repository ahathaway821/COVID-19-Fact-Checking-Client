import React from "react";
import { withRouter } from "react-router-dom";

class NoMatch extends React.Component {
    render() {
        return (
            <div>
                <h2>No Match Found</h2>
            </div>
        );
    }
}

export default withRouter(NoMatch);
