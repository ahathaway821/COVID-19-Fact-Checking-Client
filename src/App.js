import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
  } from "react-router-dom";

import About from "./components/About";
import Header from "./components/Header";
import OurData from "./components/OurData";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Predict from "./components/Predict";
import NoMatch from "./components/NoMatch";
import Layout from "./components/Layout";
import Jumbotron from "./components/Jumbotron";

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<Jumbotron />
				<Layout>
					<Router>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/about" component={About} />
						<Route path="/data" component={OurData} />
						<Route path="/contact" component={Contact} />
						<Route path="/predict" component={Predict} />
						<Route component={NoMatch} />
					</Switch>
					</Router>
				</Layout>
			</React.Fragment>
		)
	}
}

export default App;