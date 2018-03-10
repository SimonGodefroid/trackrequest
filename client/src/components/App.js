import { BrowserRouter, Route } from "react-router-dom";
import React, { Component } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import RequestNew from "./requests/RequestNew";
import { connect } from "react-redux";
import * as actions from "../actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div className={`blue`}>
          <Header />
          <Route exact path={`/`} component={Landing} />
          <Route exact path={`/requests`} component={Dashboard} />
          <Route path={`/requests/new`} component={RequestNew} />
        </div>
      </BrowserRouter>
    );
  }
}
export default connect(null, actions)(App);
