import React from "react";
import axios from 'axios';
import ListGroup from "react-bootstrap/ListGroup";
import { withRouter } from "react-router-dom";

let isLocal = process.env.IS_LOCAL ?? false;
let SEARCH_URI = ''
let config = {};

isLocal = false;

if (isLocal) {
  const HOST = process.env.ES_HOST ?? 'http://localhost:9200/';
  SEARCH_URI = `${HOST}claim-match/_search`;
}
else {
  SEARCH_URI = 'https://dth721wco0.execute-api.us-west-2.amazonaws.com/dev';
  config = {
    headers: {
      'x-api-key': 'Atw9UJtWiftiOggtm5HnauIs2lzQXsI4yzpUwTmf',
      'Content-Type': 'application/json'
    }
  }
}

class PopularClaims extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch = (query, isValidatedClaim) => {
        if (isValidatedClaim) {
            console.log("query is ", query);
            axios.post(SEARCH_URI, {
                "query": {
                    "match": {
                    "claim": {
                        "query": query,
                        "operator": "or",
                        "fuzziness": 1
                    }
                    }
                },
                "sort": ["_score", {"date": "desc"}]
            }, config)
            .then(res => {
                console.log("res is ", res);
                const body = isLocal ? res.data : JSON.parse(res.data.body)
                const opts = body.hits.hits.map((i) => ({
                    claim: i._source.claim,
                    claim_source: i._source.claim_source,
                    label: i._source.label,
                    date: i._source.date,
                    explanation: i._source.explanation,
                    clean_claim: i._source.clean_claim,
                    source: i._source.source,
                    source_label: i._source.source_label,
                    fact_check_url: i._source.fact_check_url
                }));
                this.props.history.push({
                    pathname: '/predict',
                    state: { 
                        claim: body.hits.hits[0]['_source']['claim'],
                        isValidatedClaim: true,
                        claimIndexResult: opts
                    }
                })
            })
        } else {
            this.props.history.push({
                pathname: '/predict',
                state: { 
                    claim: query,
                    isValidatedClaim: false,
                }
            })
        }
    }

    handleClick(val, e) {
        let claim, isValidatedClaim;
        if (val === 1) {
            claim = ' Face masks can be steamed for reuse.'
            isValidatedClaim = true
        } else if (val === 2) {
            claim = '5G mobile networks DO NOT spread COVID-19'
            isValidatedClaim = true
        } else if (val === 3) {
            claim = ' Hydroxychloroquine (HCQ) can prevent COVID-19.'
            isValidatedClaim = true
        } else {
            claim = 'Hypertension is a common comorbidity seen in COVID-19 patients'
            isValidatedClaim = false
        }

        this.handleSearch(claim, isValidatedClaim);
    }

    render() {
        return (
            <div>
                <b>Try out these claims!</b>
                <ListGroup variant="flush">
                    <ListGroup.Item action onClick={(e) => this.handleClick(1, e)}>Face masks can be steamed for reuse.</ListGroup.Item>
                    <ListGroup.Item action onClick={(e) => this.handleClick(2, e)}>5G mobile networks do not spread COVID-19</ListGroup.Item>
                    <ListGroup.Item action onClick={(e) => this.handleClick(3, e)}>Hydroxychloroquine (HCQ) can prevent COVID-19</ListGroup.Item>
                    <ListGroup.Item action onClick={(e) => this.handleClick(4, e)}>Hypertension is a common comorbidity seen in COVID-19 patients</ListGroup.Item>
                </ListGroup>
            </div>
        );
    }
}

export default withRouter(PopularClaims);
