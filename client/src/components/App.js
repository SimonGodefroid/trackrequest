import { BrowserRouter, Route } from "react-router-dom";
import React, { Component } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import RequestNew from "./requests/RequestNew";
import RequestListTest from '../RequestsListTest';
import RequestDetails from './requests/RequestDetails';
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
          <Route path={`/request/:id`} component={RequestDetails} />
          <Route path={`/test`} component={RequestListTest} />
        </div>
      </BrowserRouter>
    );
  }
}
export default connect(null, actions)(App);
