import React from "react";
import axios from 'axios';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

const isLocal = process.env.IS_LOCAL ?? false;
let SEARCH_URI = ''
let config = {};

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
            }, config)
            .then(res => {
                const body = isLocal? res.data : JSON.parse(res.data.body)
                const options = body.hits.hits.map((i) => ({
                    claim: i._source.claim,
                    claim_source: i._source.claim_source,
                    label: i._source.label,
                    date: i._source.date
                }));
                this.setState({options: options, isLoading: false});
            })
        };

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