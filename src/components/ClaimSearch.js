import React from "react";
import { useState } from 'react';
import axios from 'axios';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

const HOST = process.env.ES_HOST ?? 'http://localhost:9200/';
const SEARCH_URI = `${HOST}claim-match/claims/_search`;

const ClaimSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query) => {
    setIsLoading(true);

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
        setOptions(options);
        setIsLoading(false);
    })
  };

  return (
    <AsyncTypeahead
      id="aync-claim-search"
      isLoading={isLoading}
      labelKey="claim"
      minLength={3}
      onSearch={handleSearch}
      options={options}
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
};

export default ClaimSearch;