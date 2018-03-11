import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LinkToTrack from "../LinkToTrack";
import * as actions from "../../actions";

class RequestList extends Component {
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
        const id = requests[key]._id;
        return (
          <tr key={key}>
          <td className={"center-align white"} colSpan={1} style={{borderTopLeftRadius:'50%', borderBottomLeftRadius:'50%' }}>
              <a className="waves-effect waves-teal btn-flat">
                <i
                  className="material-icons"
                  onClick={() => this.handleUpvote(id)}
                >
                  arrow_upward
                </i>
              </a>
              <br />
              <a className="waves-effect waves-teal btn-flat">
                <i
                  className="material-icons"
                  onClick={() => this.handleDownvote(id)}
                >
                  arrow_downward
                </i>
              </a>
            </td>
            <td colSpan={1} className={'white'}>
              <span className={"center-align"} style={{color:'green'}}>{requests[key].upvotes}</span>
              <br />
              <span className={"center-align"} style={{color:'red'}}>
                {requests[key].downvotes * -1}
              </span>
            </td>
            <td
              className={"black center-align"}
              style={{ padding: "0" }}
            >
              <LinkToTrack
                id={id}
                text={requests[key].sourceTrack}
              />
            </td>
            <td
              className={"black center-align"}
              style={{ padding: "0" }}
            >
              <LinkToTrack
                id={id}
                text={requests[key].sourceArtist}
              />
            </td>
            <td
              className={"black center-align"}
              style={{ padding: "0" }}
            >
              <LinkToTrack
                id={id}
                text={`${requests[key].recipe}ed by`}
              />
            </td>
            <td
              className={"black center-align"}
              style={{ padding: "0" }}
            >
              <LinkToTrack
                id={id}
                text={requests[key].targetArtist}
              />
            </td>
            <td
              className={"black center-align"}
              style={{ padding: "0" }}
            >
              <LinkToTrack
                id={id}
                text={requests[key].flavour}
              />
            </td>
            <td className={`${{}} center-align`} style={{ padding: "0", borderTopRightRadius:'50%',borderBottomRightRadius:'50%'}}>
              <LinkToTrack id={id} text={requests[key].status} />
            </td>
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

function mapStateToProps(state) {
  return { requests: state.requests, auth: state.auth, message: state.message };
}

export default connect(mapStateToProps, actions)(RequestList);
