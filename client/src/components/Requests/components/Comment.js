import React, { Component } from 'react';

class Comment extends Component {
  render() {
    return (
      <div className="col s12 m8 offset-m0 l10 offset-l0">
      <div className="card-panel grey lighten-5 z-depth-1">
        <a
          className="btn-floating waves-effect waves-light red top right"
          onClick={(evt) => {
            evt.preventDefault();
            this.props.onClickFn(this.props.id,this.props.requestId)
          }}
        >
          <i className="material-icons">delete</i>
        </a>
        <div className="row valign-wrapper">
        <div>
                <a
                  className="waves-effect waves-teal btn-flat"
                  style={{ color: 'black' }}
                >
                  <i
                    className="material-icons"
                    // onClick={() => this.handleUpvote(id)}
                  >
                    arrow_upward
                  </i>
                </a>
                <br />
                <a
                  className="waves-effect waves-teal btn-flat"
                  style={{ color: 'black' }}
                >
                  <i
                    className="material-icons"
                    // onClick={() => this.handleDownvote(id)}
                  >
                    arrow_downward
                  </i>
                </a>
              </div>
          <div className="col s2">
          <div className="chip">
            <img src="http://materializecss.com/images/yuna.jpg" alt="" className="circle responsive-img" />
            LOL
          </div>

          </div>

          <div className="col s10">
            <span className="black-text">{this.props.content}</span>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Comment;


// const Comment = props => (
//   <div className="col s12 m8 offset-m0 l10 offset-l1">
//     <div className="card-panel grey lighten-5 z-depth-1">
//       <a
//         className="btn-floating waves-effect waves-light red top right"
//         onClick={(evt) => {
//           evt.preventDefault();
//           props.onClickFn(props.id)
//         }}
//       >
//         <i className="material-icons">delete</i>
//       </a>
//       <div className="row valign-wrapper">
//         <div className="col s2">
//           <img src="images/yuna.jpg" alt="" className="circle responsive-img" />
//         </div>
//         <div className="col s10">
//           <span className="black-text">{props.content}</span>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default Comment;
