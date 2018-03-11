import React, { Component } from "react";

class Presenter extends Component {
  componentDidMount() {
    this.props.fetchRequests();
  }
  handleUpvote(id) {
    this.props.upvoteRequest(this.props.auth._id, id).then(() => {
      console.log(id);
      this.props.fetchRequests();
    });
  }
  handleDownvote(id) {
    this.props.downvoteRequest(this.props.auth._id, id).then(() => {
      console.log(id);
      this.props.fetchRequests();
    });
  }
  renderRequests() {
    const { requests } = this.props;
    return Object.keys(requests)
      .reverse()
      .map(key => {
        return (
          <tr key={key} style={{ border: "1px black solid" }}>
            <td className={"center-align"} colSpan={1}>
              <a className="waves-effect waves-teal btn-flat">
                <i
                  className="material-icons"
                  onClick={() => this.handleUpvote(requests[key]._id)}
                >
                  arrow_upward
                </i>
              </a>
              <br />
              <a className="waves-effect waves-teal btn-flat">
                <i
                  className="material-icons"
                  onClick={() => this.handleDownvote(requests[key]._id)}
                >
                  arrow_downward
                </i>
              </a>
            </td>
            <td colSpan={1}>
              <span className={"center-align"}>{requests[key].upvotes}</span>
              <br />
              <span className={"center-align"}>
                {requests[key].downvotes * -1}
              </span>
            </td>
            <td className={"light-green lighten-2 center-align"}>
              {requests[key].sourceTrack}
            </td>
            <td className={"indigo lighten-5 center-align"}>
              {requests[key].sourceArtist}
            </td>
            <td className={"blue lighten-1 center-align"}>{`${
              requests[key].recipe
            }ed by`}</td>
            <td className={"red lighten-3 center-align"}>
              {requests[key].targetArtist}
            </td>
            <td className={"deep-purple lighten-4 center-align"}>
              {requests[key].flavour}
            </td>
            <td className={`${{}} center-align`}>{requests[key].status}</td>
          </tr>
        );
      });
  }
  render() {
    if (this.props.requests && Object.keys(this.props.requests).length > 0) {
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th className={"center-align"} colSpan={2}>
                  Votes
                </th>
                <th className={"center-align"}>Source Song</th>
                <th className={"center-align"}>Source Artist</th>
                <th className={"center-align"}>Recipe</th>
                <th className={"center-align"}>Target Artist</th>
                <th className={"center-align"}>Flavour</th>
                <th className={"center-align"}>Status</th>
              </tr>
            </thead>
            <tbody>{this.renderRequests()}</tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className={"container"}>
          <p style={{ color: "white", height: "100%" }}>
            No tracks requests yet
          </p>
        </div>
      );
    }
  }
}
export default Presenter;
