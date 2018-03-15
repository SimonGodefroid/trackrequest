import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../modules/actions";
import Presenter from './components/Presenter';

function mapStateToProps(state) {
  return {
    currentRequest: state.requests.currentRequest,
    imageSourceArtist: state.requests.imageSourceArtist,
    imageTargetArtist: state.requests.imageTargetArtist,
    auth: state.auth,
    message: state.message
  };
}

export default connect(mapStateToProps, actions)(Presenter);
