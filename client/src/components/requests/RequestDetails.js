import React, { Component } from 'react';

class RequestDetails extends Component {
  render() {
    return (
      <div>
        Coucou request details {this.props.match.params.id}
      </div>
    );
  }
}

export default RequestDetails;