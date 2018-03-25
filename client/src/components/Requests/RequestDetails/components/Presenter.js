import React, { Component } from 'react';
import { PulseLoader } from 'halogenium';
import Comment from '../../components/Comment';
// https://api.qwant.com/api/search/images?count=10&offset=1&q=diplo
class RequestDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.props
      .fetchCurrentRequest(this.props.match.params.id)
      .then(() => this.props.getComments(this.props.match.params.id));
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
  handleSubmit(evt) {
    evt.preventDefault();
    console.log('handleSubmit coucou');
    this.props.postComment(
      this.props.auth._id,
      this.props.match.params.id,
      this.state.comment,
    ).then(()=>{
      this.props.getComments(this.props.match.params.id)
    })
    this.setState({ comment: '' });
  }

  handleDelete(commentId,requestId){
    this.props.deleteComment(commentId,requestId).then(() => {
      this.props.getComments(requestId)});
  }

  renderComments() {
    if (this.props.comments && this.props.comments.length > 0) {
      const commentList = this.props.comments.map(comment =>
        <Comment
          key={comment._id}
          id={comment._id}
          content={comment.content}
          requestId={this.props.match.params.id}
          onClickFn={this.handleDelete}
           />
      );
      return commentList;
    }
  }
  render() {
    if (this.props.currentRequest && this.props.auth !== null) {
      return (
        <div className="row">
          <div className="col s12 m12">
            <div className="card light-blue accent-1">
              <div className="card-content white-text">
                <h4 className="center">
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => console.log('event')}
                  >
                    {this.props.currentRequest.sourceArtist}{' '}
                  </span>-<span> {this.props.currentRequest.sourceTrack}</span>
                </h4>
                <h4 className="center">
                  {this.props.currentRequest.recipe}ed by{' '}
                  {this.props.currentRequest.targetArtist}
                </h4>
                <h4 className="center">
                  <div
                    className="chip"
                    style={{ color: 'black', backgroundColor: 'white' }}
                  >
                    #{this.props.currentRequest.flavour}
                  </div>
                </h4>
                <div className={'center'}>
                  <p>
                    <span>
                      <i className={'material-icons'}>audiotrack</i>
                    </span>
                  </p>
                  <p className={'center'} style={{ verticalAlign: 'middle' }}>
                    <span
                      className={'valign-wrapper center'}
                      style={{ display: 'inline-block' }}
                    >
                      <i
                        className={'material-icons'}
                        style={{ verticalAlign: 'middle' }}
                      >
                        arrow_upward
                      </i>: {this.props.currentRequest.upvotes}
                    </span>
                    <span style={{ padding: '0 10px' }}>|</span>
                    <span
                      className={'valign-wrapper'}
                      style={{ display: 'inline-block' }}
                    >
                      <i
                        className={'material-icons'}
                        style={{ verticalAlign: 'middle' }}
                      >
                        arrow_downward
                      </i>: {this.props.currentRequest.downvotes}
                    </span>
                  </p>
                </div>
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
                <span className="card-title center">
                  submitted by {this.props.auth.username}, on {" "}
                  {this.props.currentRequest && this.props.currentRequest.createdAt && new Date(this.props.currentRequest.createdAt).toLocaleDateString('fr-FR')}.
                </span>
              </div>
            </div>

            <div className="row">
              <form className="col s12" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="input-field col s10">
                    <i className="material-icons prefix">account_circle</i>
                    <textarea
                      id="icon_prefix"
                      rows={'10'}
                      type="text"
                      style={{ border: '2px black solid', borderRadius:'5px' }}
                      placeholder="Your comment, be nice..."
                      value={this.state.comment}
                      onChange={this.handleChange}
                      className="validate"
                    />
                  </div>
                  <div className="input-field col s2 center">
                    <input
                      disabled={this.state.comment.length===0}
                      className="btn waves-effect waves-light"
                      type="submit"
                      value="Add Comment"
                    />
                  </div>
                </div>
              </form>
              {`${this.props.comments.length} comments, so far !`}
            </div>
            {this.renderComments()}
          </div>
        </div>
      );
    } else {
      return (
        <div className={'center'}>
          <PulseLoader color="#26A65B" size="16px" margin="4px" />
        </div>
      );
    }
  }
}

export default RequestDetails;
