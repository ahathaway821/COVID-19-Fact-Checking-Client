import React from "react";
import axios from 'axios';
import { Card, Badge, Button, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import ShowMoreText from 'react-show-more-text';

class ResearchPapers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
            error: null
        };
    }

    componentDidMount() {
        this.getResearchPapers(this.props.claim);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.claim !== this.props.claim) {
            this.getResearchPapers(this.props.claim);
        }
    }

    getResearchPapers(claim) {
        this.setState({ isLoaded: false, items: [], error: null});
        axios.get(`https://wqvhh7uvbc.execute-api.us-east-2.amazonaws.com/search?query=${claim}`)
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.data
                });
            },
        )
        .catch(error => {
            console.log(error.response);
            this.setState({
                isLoaded: true,
                error: error
            });
        });
        

    }

    render() {
        let items;
        if (this.state.error !== null) {
            items = (
                <div>
                    <br/>
                    <p> Sorry, there was an error fetching the results. Please refresh the page to try again. </p>
                </div>
            )
        } else {
            items = this.state.isLoaded ? this.state.items.map((item, key) => {
                return (
                    <div key={item.id}>
                        <br />
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    {item.fields.title ? item.fields.title.replace( /(<([^>]+)>)/ig, '') : ""}
                                </Card.Title>
                                <b>Absract: </b>
                                <ShowMoreText
                                    lines={3}
                                    more='Show more'
                                    less='Show less'
                                    anchorClass=''
                                    onClick={this.executeOnClick}
                                    expanded={false}
                                >
                                    {item.fields.abstract ? item.fields.abstract.replace( /(<([^>]+)>)/ig, '') : ""}
                                </ShowMoreText>
                                <br />
                                <Card.Text>
                                    <b>Keywords: </b>
                                    {item.fields.keywords_ml ? item.fields.keywords_ml.slice(0,5).map( keyword =>
                                        <span key={`${keyword}`}>
                                            <Badge variant="info" key={`${keyword}`}>
                                                {keyword}
                                            </Badge>{' '}
                                        </span>
                                    ) : ""}
                                </Card.Text>
                                <Card.Text>
                                    <b>Categories: </b>
                                    {item.fields.tags ? item.fields.tags.map( tag =>
                                        <span key={`${tag}`}>
                                            <Badge variant="secondary" key={`${tag}`}>
                                                {tag}
                                            </Badge>{' '}
                                        </span>
                                    ) : ""}
                                </Card.Text>
                                <Button variant="primary" href={item.fields.link} target="__blank" size="sm">Link to Paper</Button>
                            </Card.Body>
                        </Card>
                    </div>
            )}): (
                <div>
                    <br />
                    <center>
                        <Spinner animation="border" variant="secondary">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </center>
                </div>
            );
        }

        return (
            <div>
                {items}
            </div>
        );
    }
}

export default withRouter(ResearchPapers);
