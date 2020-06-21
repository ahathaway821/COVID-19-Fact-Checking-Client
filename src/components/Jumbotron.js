import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import covidImage from '../img/covidImage.jpg';

const Styles = styled.div`
  .jumbo {
    background: url(${covidImage}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 300px;
    position: relative;
    z-index: -2;
  }
  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

class Jumbotron extends React.Component {
    render() {
        return (
            <Styles>
                <Jumbo fluid className="jumbo">
                    <div className="overlay"></div>
                </Jumbo>
            </Styles>
        );
    }
}

export default Jumbotron;