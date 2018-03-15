// RequestNew shows RequestForm and RequestReview
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import RequestForm from "./RequestForm";
import RequestFormReview from "./RequestFormReview";
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

export default reduxForm({
  form: "requestForm",
  destroyOnUnmount: true,
})(RequestNew);
