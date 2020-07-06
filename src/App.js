import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
  } from "react-router-dom";

import {
  About,
  Header,
  Data,
  Contact,
  Layout,
  Home,
  Predict,
  NoMatch,
  Model
} from "./components";
import './App.css';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<Layout>
					<Router>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/about" component={About} />
						<Route path="/data" component={Data} />
						<Route path="/model" component={Model} />
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