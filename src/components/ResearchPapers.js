import React from "react";
import { Card, Badge, Button, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class ResearchPapers extends React.Component {
    render() {
        const items = this.props.isLoaded ? this.props.items.map((item, key) => {
            return (
                <div key={item.id}>
                    <br />
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                {item.fields.title ? item.fields.title.replace( /(<([^>]+)>)/ig, '') : ""}
                            </Card.Title>
                            {/* <span class="d-inline-block text-truncate" style={abstractStyle}>
                                {item.fields.abstract.replace( /(<([^>]+)>)/ig, '')}
                            </span> */}
                            <Card.Text>
                                <b>Absract: </b> 
                                {item.fields.abstract ? item.fields.abstract.replace( /(<([^>]+)>)/ig, '').substring(0,500) + "..." : ""}
                            </Card.Text>
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
                <Spinner animation="border" variant="secondary">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );

        return (
            <div>
                {items}
            </div>
        );
    }
}

export default withRouter(ResearchPapers);
