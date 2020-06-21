import React from "react";
import { Container } from "react-bootstrap";

class Layout extends React.Component {
    render() {
        return (
            <Container>
                {this.props.children}
            </Container>
        );
    }
}

export default Layout;