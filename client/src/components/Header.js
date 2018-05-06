import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import Payments from './Payments';
class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return(
          [<li key={'01'}>
          <a href="/auth/google">Login With Google</a>
        </li>,
        <li key={'02'}><Link

          to={'/requests'}
              >Browse as guest
              </Link></li>]
        )

      default:
        return [
          <li key={'0'}>
            <a href="">{this.props.auth.username}</a>
          </li>,
          <li key={'1'}>
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  }
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper black">
            <div className="row">
              <div className="col s12">
                <Link
                  to={this.props.auth ? '/requests' : '/'}
                  className="left brand-logo"
                >
                  Tracks Requests
                </Link>
                <ul className="right">{this.renderContent()}</ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) =>({ auth });
export default connect(mapStateToProps)(Header);
