import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import AccountManager from '../AccountManager/AccountManager';
import './Navbar.scss';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    account: PropTypes.object,
    onLogoutClick: PropTypes.func
  };
  render() {
    let brandLinkLoc = (this.props.account && this.props.account.username) ? '/cars' : '/';
    return (
      <div className="Navbar">
        <div className="Navbar-Brand">
          <Link to={ brandLinkLoc }>react</Link>
        </div>
        <div className="Navbar-Spacer"></div>
        <AccountManager
          account={ this.props.account }
          onLogoutClick={ this.props.onLogoutClick }
        />
      </div>
    )
  }
}
export default Navbar;
