import React, { useCallback } from "react";
import fetch from 'isomorphic-fetch';
import { AsyncTypeahead } from 'react-bootstrap-typeahead'; // ES2015
import logo from "../img/logo.png";
import { Button } from "react-bootstrap";
import { withRouter, Redirect } from "react-router-dom";

import 'react-bootstrap-typeahead/css/Typeahead.css';

/*
Examples: 
1. https://codesandbox.io/s/react-bootstrap-typeahead-async-pagination-example-qg895?file=/src/index.js:2538-2915
2. http://ericgio.github.io/react-bootstrap-typeahead/#asynchronous-searching
*/

const imageStyle = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
};

const PER_PAGE = 50;
const SEARCH_URI = 'https://api.github.com/search/users';

function makeAndHandleRequest(query, page = 1) {
  return fetch(`${SEARCH_URI}?q=${query}+in:login&page=${page}&per_page=50`)
    .then(resp => resp.json())
    .then(({ items, total_count }) => {
        /* eslint-disable-line camelcase */
        const options = items.map(i => ({
            avatar_url: i.avatar_url,
            id: i.id,
            login: i.login,
        }));
        return { options, total_count };
    });
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            options: [],
            query: ''
        }
        this.handlePredict = this.handlePredict.bind(this);
    }

    _cache = {};

    handlePredict() {
        this.props.history.push("/predict");
    }

    render() {
        
        /*
        return (
            <AsyncTypeahead
                {...this.state}
                id="async-pagination-example"
                labelKey="login"
                maxResults={PER_PAGE - 1}
                minLength={2}
                onInputChange={this._handleInputChange}
                onPaginate={this._handlePagination}
                onSearch={this._handleSearch}
                paginate
                placeholder="Search for a Github user..."
                renderMenuItemChildren={option => (
                    <div key={option.id}>
                        <img
                            alt={option.login}
                            src={option.avatar_url}
                            style={{
                                height: '24px',
                                marginRight: '10px',
                                width: '24px',
                            }}
                        />
                        <span>{option.login}</span>
                    </div>
                )}
                useCache={false}
            />
        );
        */

        return (
            <div>
                <img 
                    src={logo} 
                    alt={"CovidFact"} 
                    style={imageStyle} 
                />
                <AsyncTypeahead
                    {...this.state}
                    id="async-example"
                    isLoading={this.state.isLoading}
                    labelKey="login"
                    maxResults={PER_PAGE - 1}
                    minLength={3}
                    onSearch={this._handleSearch}
                    onPaginate={this._handlePagination}
                    options={this.state.options}
                    paginate
                    placeholder="Search for a Github user..."
                    renderMenuItemChildren={(option, props) => (
                        <div key={option.id}>
                            <img
                                alt={option.login}
                                src={option.avatar_url}
                                style={{
                                    height: '24px',
                                    marginRight: '10px',
                                    width: '24px',
                                }}
                            />
                            <span>{option.login}</span>
                        </div>
                    )}
                    useCache={false}
                />
                <br />
                <div className="text-center">
                    <Button variant="secondary" onClick={this.handlePredict}>Predict Claim</Button>
                </div>
            </div>
        );
    }

    _handlePagination = (e, shownResults) => {
        // console.log("_handlePagination shownResults ", shownResults);
        // console.log("_handlePagination this.state ", this.state);
        // console.log("_handlePagination cachedQuery ", this._cache[this.state.query]);

        const { query } = this.state;
        const cachedQuery = this._cache[query];

        // Don't make another request if:
        // - the cached results exceed the shown results
        // - we've already fetched all possible results
        if (
            cachedQuery.options.length > shownResults ||
            cachedQuery.options.length === cachedQuery.total_count
        ) {
            return;
        }
    
        this.setState({ isLoading: true });
    
        const page = cachedQuery.page + 1;
        // console.log("_handlePagination page ", page);
    
        makeAndHandleRequest(query, page).then(resp => {
            const options = cachedQuery.options.concat(resp.options);
            this._cache[query] = { ...cachedQuery, options, page };
            this.setState({
                isLoading: false,
                options,
            });
        });
    };

    _handleSearch = (query) => {
        // console.log("_handleSearch query ", query, this._cache[query]);

        if (this._cache[query]) {
            this.setState({ options: this._cache[query].options });
            return;
        }
    
        this.setState({ isLoading: true, query: query });
        makeAndHandleRequest(query).then(resp => {
            this._cache[query] = { ...resp, page: 1 };
            this.setState({
                isLoading: false,
                options: resp.options,
            });
        });
    };
}

export default withRouter(Home);