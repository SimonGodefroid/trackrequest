import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../modules/actions";
import Presenter from './components/Presenter';

const mapStateToProps = (state) => {
  return {
    currentRequest: state.requests.currentRequest,
    imageSourceArtist: state.requests.imageSourceArtist,
    imageTargetArtist: state.requests.imageTargetArtist,
    comments: state.requests.comments,
    auth: state.auth,
    message: state.message,
  };
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...actionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Presenter);
