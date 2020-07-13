import React from "react";
import Container from "react-bootstrap/Container";
import { withRouter } from "react-router-dom";

// import logo from "../img/covidImage.jpg";

class About extends React.Component {
    render() {
        return (
            <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }} className="sticky-top">
                <h2>About Us</h2>
                {/* <img src={logo} /> */}
                <p>
                    Misinformation regarding COVID-19 can be dangerous for communities if it causes people to act against the best interests of the community at large, and can cause unnecessary transmission of the disease, fear rooted in misunderstanding, and potentially avoidable deaths.
                    We see in the literature that posting corrections, or identifying misinformation can be slow and have limited effectiveness given that the information has already spread. We believe that through this software, we can limit the amount of research required by an average individual to feel confident in a behavior or stance. 
                </p>
                <p>
                    Through CovidFact, our aim is to combat the spread of misinformation regarding COVID-19. Specifically, we are using automated fact checking to help verify information related to COVID-19.
                    We're currently studying in the Master of Information and Data Science (MIDS) program at the University of California, Berkeley and this is our capstone project.
                </p>
            </Container>
        );
    }
}

export default withRouter(About);
