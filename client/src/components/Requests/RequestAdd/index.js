// RequestNew shows RequestForm and RequestReview
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import RequestFormReview from "../components/RequestFormReview";
import Presenter from './components/Presenter';

export default reduxForm({
  form: "requestForm",
  destroyOnUnmount: true,
})(Presenter);
