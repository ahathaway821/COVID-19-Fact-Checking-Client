import React from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';

// 

class Predict extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        // const claim = "masks are useful"
        axios.get(`https://wqvhh7uvbc.execute-api.us-east-2.amazonaws.com/search?query=${this.props.location.state.claim}`)
            .then(
                (result) => {
                    console.log("result is ", result);
                    this.setState({
                        isLoaded: true,
                        items: result.data
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log("error is ", error);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        console.log("Predict this.props ", this.props);
        console.log("Predict this.state ", this.state);

        const items = this.state.items.map((item, key) =>
            <li key={item.id}>{item.fields.title} <a href={item.fields.link}>{item.fields.link}</a> </li>
        );

        return (
            <div>
                <h2>Prediction</h2>
                <h3>Claim is {this.props.location.state.claim}</h3>
                <ul>{items}</ul>
            </div>
        );
    }
}

export default withRouter(Predict);
