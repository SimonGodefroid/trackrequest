// RequestNew shows RequestForm and RequestReview
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import RequestForm from "../../components/RequestForm";
import RequestFormReview from "../../components/RequestFormReview";
class RequestNew extends Component {
  state = { showFormReview: false };
  renderContent() {
    if (this.state.showFormReview) {
      return (
        <RequestFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <RequestForm
        onRequestSubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default RequestNew;
