import React from "react";
import axios from 'axios';
import { Card, Spinner, Tabs, Tab, Badge } from "react-bootstrap";
import { withRouter } from "react-router-dom";

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
        const s1 = this.props.claim.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        const cleanClaim = s1.replace(/\s{2,}/g," ");
        console.log("clean claim is ", cleanClaim);
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
                <p>
                    Sorry, there was an error fetching the similar claims. Please refresh the page to try again.
                </p> 
            )
        } else {
            if (this.state.isLoaded) {
                this.state.items.similar_claims.sort((a, b) => (a.cosine_dist > b.cosine_dist) ? 1 : -1)
                console.log("this.state.items.similar_claims ", this.state.items.similar_claims);
                /*
                    claim: " Only certain face masks are effective and others, such as cloth masks, are not."
                    claim_source: " Facebook posts"
                    clean_claim: "Only certain face masks are effective and others such as cloth masks are not"
                    cosine_dist: 0.27986446308054846
                    date: "2020-04-02"
                    explanation: " N95 masks offer the most protection from viral particles, health officials say, but they should be reserved for health care workers who are in direct contact with infected patients. Mask effectiveness varies, but claims that cloth masks provide 0% protection aren’t accurate. More studies need to be done to examine variables such as the material and fit of the mask, the wearer, and the environment. Health officials largely agree that wearing any kind of face mask, coupled with social distancing and frequent hand-washing, is more protective than going unmasked."
                    fact_check_url: "https://www.politifact.com/factchecks/2020/may/18/facebook-posts/face-masks-including-homemade-ones-are-effective-c/"
                    label: "false"
                    sentiments: -0.30000001192092896
                    source: " PolitiFact"
                    source_label: "false"
                */
                similarClaims = this.state.items.similar_claims.slice(1,).map((item, key) => {
                    return (
                        <div key={item.claim}>
                            <br />
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        {item.claim}
                                    </Card.Title>
                                    <Card.Text>
                                        <b>Explanation</b> : {item.explanation}
                                    </Card.Text>
                                    <Card.Text>
                                        <b>Fact Check Date</b> : {item.date}
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
                                    <Card.Text>
                                        <i>Cosine Distance, Sentiment</i> : {item.cosine_dist}, {item.sentiments}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                )})
            } else {
                similarClaims = (
                    <div>
                        <br />
                        <Spinner animation="border" variant="secondary">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
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
