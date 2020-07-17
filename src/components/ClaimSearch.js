import React from "react";
import axios from 'axios';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

// require('dotenv').config()

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

class ClaimSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            options: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.pdiv = React.createRef();
    }

    handleInputChange(val) {
        this.props.onChangeValue(val);    
    }

    handleChange(selected) {
        this.props.onSelectedValue(selected);
    }

    keyPress(e) {
        // On enter key
        if(e.keyCode === 13){
            this.pdiv.current.click(); // hide search results right after search
            this.props.onEnter();
        }
     }

    handleSearch = (query) => {
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
                explanation: i._source.explanation,
                clean_claim: i._source.clean_claim,
                source: i._source.source,
                source_label: i._source.source_label,
                fact_check_url: i._source.fact_check_url
            }));
            this.setState({options: opts, isLoading: false});
        })
    }

    render() {
        return (
            <div className="sticky-top" ref={this.pdiv}>
                <AsyncTypeahead
                    id="aync-claim-search"
                    isLoading={this.state.isLoading}
                    minLength={3}
                    labelKey={option => `${option.claim}`}
                    onSearch={this.handleSearch}
                    onInputChange={this.handleInputChange}
                    // onKeyDown={this.handleKeyDown}
                    onChange={this.handleChange}
                    onKeyDown={this.keyPress}
                    options={this.state.options}
                    placeholder={this.props.placeHolder}
                    filterBy={(option, props) => option}
                    renderMenuItemChildren={(option, props) => (
                    <div>
                        <span>{option.claim}</span>
                    </div>
                    )}
                />
            </div>
        );
    }
}

export default ClaimSearch;