import React from "react";
import { withRouter } from "react-router-dom";

class Contact extends React.Component {
    // props are icon, label, action, disabled
    render() {
        return (
            <div>
                <h2>Contact Us page</h2>
            </div>
        );
    }
}

export default withRouter(Contact);
