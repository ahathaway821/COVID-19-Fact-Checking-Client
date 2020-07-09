import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
    .navbar {
        background-color: #222;
    }

    .navbar-brand, .navbar-nav .nav-link {
        color: black;

        &:hover {
            color: black;
        }
    }
`;

// const Styles2 = styled.div`
//     .navbar {
//         background-color: #222;
//     }

//     .navbar-brand, .navbar-nav .nav-link {
//         color: white;

//         &:hover {
//             color: white;
//         }
//     }
// `;

const divStyle = {
    width: "1200px",
    margin: "0 auto"
};

class Header extends React.Component {
    render() {
        return (
            <div style={divStyle}>
                <Styles>
                    <Navbar expand="lg" bg="white">
                        <Navbar.Brand href="/">CovidFact</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Item><Nav.Link href="/about">About Us</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link href="/data">Our Data</Nav.Link></Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Styles>
                <hr
                    style={{
                        color: "black",
                        marginTop: "0px"
                    }}
                />
            </div>
        );
        // return (
        //     <div>
        //         <Styles2>
        //             <Navbar expand="lg" bg="dark" sticky="top">
        //                 <Navbar.Brand href="/">CovidFact</Navbar.Brand>
        //                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //                 <Navbar.Collapse id="basic-navbar-nav">
        //                     <Nav className="ml-auto">
        //                         <Nav.Item><Nav.Link href="/about">About Us</Nav.Link></Nav.Item>
        //                         <Nav.Item><Nav.Link href="/data">Our Data</Nav.Link></Nav.Item>
        //                     </Nav>
        //                 </Navbar.Collapse>
        //             </Navbar>
        //         </Styles2>
        //         <hr
        //             style={{
        //                 color: "black",
        //                 marginTop: "0px"
        //             }}
        //         />
        //     </div>
        // );
    }
}

export default Header;