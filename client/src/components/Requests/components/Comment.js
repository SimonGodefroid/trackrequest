import React, { Component } from 'react';
import get from 'lodash/get';
import Reply from './Reply';
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { showReplyForm: false, reply: '' };
  }

  handleClick = evt => {
    evt.preventDefault();
    this.setState({ showReplyForm: !this.state.showReplyForm });
    this.setState({ reply: '' });
  };

  handleChange = evt => this.setState({ reply: evt.target.value });

  handleUpvote = () =>
    this.props.handleUpvoteCommentFn(
      this.props.comment._id,
      this.props.auth._id,
      this.props.requestId,
    );

  handleDownvote = () =>
    this.props.handleDownvoteCommentFn(
      this.props.comment._id,
      this.props.auth._id,
      this.props.requestId,
    );

  handleSubmitReply = evt => {
    this.handleClick(evt);
    this.props.handleSubmitReplyFn(
      this.props.auth._id,
      this.props.requestId,
      this.props.comment._id,
      this.state.reply,
    );
  };

  handleDeleteComment = evt => {
    evt.preventDefault();
    this.props.handleDeleteCommentFn(
      this.props.comment._id,
      this.props.requestId,
    );
  };

  renderReplies = props => {
    if (props.comment.replies) {
      const replies = props.comment.replies.map((rep, index) => (
        <Reply key={index} {...rep} />
      ));
      return replies;
    }
    return null;
  };

  render() {
    const showDeleteButton =
      this.props.comment.author._id === this.props.auth._id;
    return (
      <div className="col s12 m8 offset-m0 l10 offset-l0">
        <div className="card-panel grey lighten-5 z-depth-1">
          <div className="row valign-wrapper">
            <div>
              <span style={{ color: 'green' }}>
                {
                  Object.keys(get(this.props.comment, 'votes.upvotes', {}))
                    .length
                }
              </span>
              <a
                className="waves-effect waves-teal btn-flat"
                style={{ color: 'black' }}
              >
                <i className="material-icons" onClick={this.handleUpvote}>
                  arrow_upward
                </i>
              </a>
              <br />
              <span style={{ color: 'red' }}>
                {Object.keys(get(this.props.comment, 'votes.downvotes', {}))
                  .length * -1}
              </span>
              <a
                className="waves-effect waves-teal btn-flat"
                style={{ color: 'black', display: 'inline-block' }}
              >
                <i className="material-icons" onClick={this.handleDownvote}>
                  arrow_downward
                </i>
              </a>
            </div>
            <div className="col s2">
              <div className="chip">
                <img
                  src={`${this.props.user.avatar}`}
                  alt={`${this.props.user.username} profile`}
                  className="circle responsive-img"
                />
                {`${this.props.user.username.substring(0, 5)}...`}
              </div>
            </div>
            <div className="col s10">
              <p className="black-text">{this.props.comment.content}</p>
              {showDeleteButton && (
                <input
                  className="btn waves-effect waves-light red right"
                  type="submit"
                  value="delete"
                  onClick={this.handleDeleteComment}
                />
              )}
              <input
                className="btn waves-effect waves-light right"
                type="submit"
                value="reply"
                onClick={this.handleClick}
              />
            </div>
          </div>
          {this.renderReplies(this.props)}
        </div>
        {this.state.showReplyForm && (
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s8">
                <i className="material-icons prefix">account_circle</i>

                <textarea
                  id="icon_prefix"
                  rows={'10'}
                  type="text"
                  style={{ border: '2px black solid', borderRadius: '5px' }}
                  placeholder="Your reply to this user, be nice..."
                  value={this.state.reply}
                  onChange={this.handleChange}
                  className="validate"
                />
              </div>
              <div className="input-field col s12 m4 l4 center">
                <input
                  disabled={this.state.reply.length === 0}
                  className="btn waves-effect waves-light"
                  type="submit"
                  value="Add Reply"
                  onClick={this.handleSubmitReply}
                />
                <input
                  className="btn waves-effect waves-light red"
                  type="submit"
                  onClick={this.handleClick}
                  value="Cancel"
                />
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default Comment;
