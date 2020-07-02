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
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(selected) {
        console.log("handleInputChange ", selected);
        this.props.onChangeValue(selected, false);    
    }

    handleChange(selected) {
        console.log("handleChange ", selected);
        this.props.onChangeValue(selected, true);    
    }

    render() {
        const handleSearch = (query) => {
            console.log("handleSearch query ", query);
            this.setState({isLoading: true});
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
                const body = isLocal ? res.data : JSON.parse(res.data.body)
                const opts = body.hits.hits.map((i) => ({
                    claim: i._source.claim,
                    claim_source: i._source.claim_source,
                    label: i._source.label,
                    date: i._source.date,
                }));
                this.setState({options: opts, isLoading: false});
            })
        };

        return (
            <div className="sticky-top">
                <AsyncTypeahead
                    id="aync-claim-search"
                    isLoading={this.state.isLoading}
                    minLength={3}
                    labelKey={option => `${option.claim}`}
                    onSearch={handleSearch}
                    // onInputChange={this.handleInputChange}
                    onChange={this.handleChange}
                    options={this.state.options}
                    placeholder={this.props.placeHolder}
                    filterBy={(option, props) => option}
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
                {/* <br />
                <hr
                    style={{
                        color: "black",
                        marginTop: "0px"
                    }}
                /> */}
            </div>
        );
    }
}

export default ClaimSearch;