import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./modules/actions";
import Presenter from './components/Presenter';
const mapStateToProps = (state) =>{
  return { 
    requests: state.requests, 
    auth: state.auth, 
    message: state.message 
  };
}

export default connect(mapStateToProps, actions)(Presenter);
