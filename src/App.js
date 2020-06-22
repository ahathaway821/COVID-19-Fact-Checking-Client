import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
  } from "react-router-dom";

import {
  About,
  Header,
  OurData,
  Contact,
  Jumbotron,
  Layout,
  Home,
  Predict,
  NoMatch,
} from "./components";

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