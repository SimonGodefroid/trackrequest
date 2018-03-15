import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
// https://api.qwant.com/api/search/images?count=10&offset=1&q=diplo
class RequestDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.fetchCurrentRequest(this.props.match.params.id);
    // .then(() => this.props.fetchSourceArtistImage(this.props.currentRequest))
    // .then(() => this.props.fetchTargetArtistImage(this.props.currentRequest));
  }
  componentWillUnmount() {
    this.props.clearCurrentRequest(this.props.match.params.id);
  }
  handleChange(evt) {
    evt.preventDefault();
    this.setState({ comment: evt.target.value });
  }
  handleSubmit() {
    console.log("handleSubmit coucou");
  }
  render() {
    console.log("this.state.comment", this.state.comment);
    if (this.props.currentRequest) {
      return (
        <div className="row">
          <div className="col s12 m12">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title center">
                  Coucou request details {this.props.match.params.id}
                </span>
                {/*<p className="center">
                  <img
                    src={this.props.imageSourceArtist[0].media}
                    height={"100px"}
                  />
                </p>
                <p className="center">
                  <img
                    src={this.props.imageTargetArtist[0].media}
                    height={"100px"}
                  />
      </p>*/}
              </div>
              <div className="card-content">
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="textarea"
                    value={this.state.comment}
                    onChange={this.handleChange}
                  />
                  <input type="submit" value="Submit" />
                </form>
                <span className="card-title center">
                  Coucou request details{" "}
                  {this.props.currentRequest.sourceArtist}
                </span>
                <p className="center">lol</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
function mapStateToProps(state) {
  return {
    currentRequest: state.requests.currentRequest,
    imageSourceArtist: state.requests.imageSourceArtist,
    imageTargetArtist: state.requests.imageTargetArtist,

    auth: state.auth,
    message: state.message
  };
}

export default connect(mapStateToProps, actions)(RequestDetails);
