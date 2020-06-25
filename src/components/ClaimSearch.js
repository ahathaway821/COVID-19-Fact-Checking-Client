import React from "react";
import axios from 'axios';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

console.log(process.env.ES_HOST);
const HOST = 'https://vpc-claim-match-5nmoeqwo3jokdkuptul5mkhhfm.us-west-2.es.amazonaws.com/';//process.env.ES_HOST ?? 'http://localhost:9200/';
const SEARCH_URI = `${HOST}claim-match/_search`;

class ClaimSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            options: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selected) {
        this.props.onChangeValue(selected);    
    }

    render() {
        const handleSearch = (query) => {
            this.setState({isLoading: true});

            axios.post(SEARCH_URI, {
                "query": {
                    "match": {
                    "claim": query
                    }
                },
                "sort": ["_score", {"date": "desc"}]
            })
            .then(res => {
                const options = res.data.hits.hits.map((i) => ({
                    claim: i._source.claim,
                    claim_source: i._source.claim_source,
                    label: i._source.label,
                    date: i._source.date
                }));
                this.setState({options: options, isLoading: false});
            })
        };

        console.log("this.state claimsearch are ", this.state);
        return (
            <AsyncTypeahead
                id="aync-claim-search"
                isLoading={this.state.isLoading}
                labelKey="claim"
                minLength={3}
                onSearch={handleSearch}
                onChange={this.handleChange}
                options={this.state.options}
                placeholder="Search for a COVID-19 Fact"
                renderMenuItemChildren={(option, props) => (
                <div>
                    <span>{option.label}</span>
                    <span>{" | "}</span>
                    <span>{option.claim}</span>
                    <span>{" | "}</span>
                    <span>{option.date}</span>
                </div>
                )}
            />
        );
    }
}

export default ClaimSearch;