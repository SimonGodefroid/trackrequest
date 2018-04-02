// RequestNew shows RequestForm and RequestReview
// http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=diplo&api_key=644459a6b109d6d8d8320b2596eddb8b&format=json

// http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=diplo&api_key=644459a6b109d6d8d8320b2596eddb8b&format=json

import React, { Component } from "react";
import RequestForm from "../../components/RequestForm";
import RequestFormReview from "../../components/RequestFormReview";
class RequestNew extends Component {
  state = { showFormReview: false };
  renderContent() {
    if (this.state.showFormReview) {
      return (
        <RequestFormReview
          userid={this.props.auth._id}
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
