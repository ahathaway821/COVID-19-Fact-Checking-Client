import React from "react";
import axios from 'axios';
import { Card, Spinner, Badge } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import ShowMoreText from 'react-show-more-text';

class SimilarClaims extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
            error: null
        };
    }

    componentDidMount() {
        this.getSimilarClaims(this.props.claim);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.claim !== this.props.claim) {
            this.getSimilarClaims(this.props.claim);
        }
    }

    getSimilarClaims(claim) {
        if (!claim) return;

        this.setState({
            isLoaded: false,
            items: [],
            error: null
        });
        
        // eslint-disable-next-line no-useless-escape
        const s1 = claim.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        const cleanClaim = s1.replace(/\s{2,}/g," ");

        axios.get(`https://88rrgid4rl.execute-api.us-west-2.amazonaws.com/similar-claims?claim=${cleanClaim}`)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.data
                    });
                },
                (error) => {
                    console.log("error is ", error);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
            .catch(error => {
                console.log(error.response);
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }

    render() {
        let similarClaims;
        if (this.state.error !== null) {
            similarClaims = (
                <div>
                    <br/>
                    <p> Sorry, there was an error fetching the results. Please refresh the page to try again. </p>
                </div>
            )
        } else {
            if (this.state.isLoaded) {
                this.state.items.similar_claims.sort((a, b) => (a.cosine_dist > b.cosine_dist) ? 1 : -1)
                similarClaims = this.state.items.similar_claims.slice(1,).map((item, key) => {
                    return (
                        <div key={item.claim}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <ShowMoreText
                                            lines={3}
                                            more='Show more'
                                            less='Show less'
                                            anchorClass=''
                                            onClick={this.executeOnClick}
                                            expanded={false}
                                        >
                                            {item.claim}
                                        </ShowMoreText>
                                    </Card.Title>
                                    <b>Explanation</b> : 
                                    <ShowMoreText
                                        lines={3}
                                        more='Show more'
                                        less='Show less'
                                        anchorClass=''
                                        onClick={this.executeOnClick}
                                        expanded={false}
                                    >
                                        {item.explanation}
                                    </ShowMoreText>
                                    <br />
                                    <Card.Text>
                                        <b>Fact Check Date</b> : {item.date}
                                    </Card.Text>
                                    <Card.Text>
                                        <b>Fact Check URL</b> : <a href={item.fact_check_url}>{item.fact_check_url}</a>
                                    </Card.Text>
                                    <Card.Text>
                                        <b>Fact Checked by</b> : {item.source}
                                    </Card.Text>
                                    <Card.Text>
                                        <b>Source of Claim</b> : {item.claim_source}
                                    </Card.Text>
                                    {item.label.includes('false') ? (
                                        <Card.Text>
                                            <b>Rating</b> : <Badge variant="danger">{item.label.charAt(0).toUpperCase() + item.label.slice(1)}</Badge>
                                        </Card.Text>
                                    ) : (
                                        <Card.Text>
                                            <b>Rating</b> : <Badge variant="success">{item.label.charAt(0).toUpperCase() + item.label.slice(1)}</Badge>
                                        </Card.Text>
                                    )}
                                    {/* <Card.Text>
                                        <i>Cosine Distance, Sentiment</i> : {item.cosine_dist}, {item.sentiments}
                                    </Card.Text> */}
                                </Card.Body>
                            </Card>
                            <br />
                        </div>
                )})
            } else {
                similarClaims = (
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
        }

        return (
            <div>
                {similarClaims}
            </div>
        );
    }
}

export default withRouter(SimilarClaims);
