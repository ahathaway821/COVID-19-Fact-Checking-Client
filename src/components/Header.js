import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
    .navbar {
        background-color: #222;
    }

    .navbar-brand, .navbar-nav .nav-link {
        color: white;

        &:hover {
            color: white;
        }
    }
`;

class Header extends React.Component {
    render() {
        return (
            <Styles>
                <Navbar expand="lg">
                    <Navbar.Brand href="/">CovidFact</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="/about">About Us</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="/data">Our Data</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="/contact">Contact Us</Nav.Link></Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Styles>
        );
    }
}

export default Header;