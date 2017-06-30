import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import ButtonAuth from '../ButtonAuth';

const headerLogoSvg = <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 24 24"><path fill="#92e5fc" d="M14 20l-4-4v3h-3c-1.103 0-2-.897-2-2v-10.184c1.163-.413 2-1.511 2-2.816 0-1.657-1.343-3-3-3s-3 1.343-3 3c0 1.305.837 2.403 2 2.816v10.184c0 2.206 1.794 4 4 4h3v3l4-4zm-11.8-16c0-.993.807-1.8 1.8-1.8s1.8.807 1.8 1.8-.807 1.8-1.8 1.8-1.8-.807-1.8-1.8zm7.8 0l4 4v-3h3c1.103 0 2 .897 2 2v10.184c-1.163.413-2 1.512-2 2.816 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.305-.837-2.403-2-2.816v-10.184c0-2.206-1.794-4-4-4h-3v-3l-4 4zm11.8 16c0 .993-.807 1.8-1.8 1.8s-1.8-.807-1.8-1.8.807-1.8 1.8-1.8 1.8.807 1.8 1.8z"/></svg>;

class Header extends React.Component {
  static contextTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  };

  renderAuthenticated() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Link className={s.brand} to="/">
            <div className={s.brandLogoWrap}> {headerLogoSvg} </div>
            <div className={s.brandTxtWrap}>
              <span className={cx(s.brandTxt, s.brandTxtSmall)}>
                <span>gitdude.com</span>
                <span className={s.beta}>(beta)</span>
              </span>
              <span className={cx(s.brandSubTxt, s.brandSubTxtSmall)}>Relevant commit commentary</span>
            </div>
          </Link>
          <div className={cx(s.navigation, s.navigationSmall)} role="navigation">
            <Link to="/" className={cx(s.link)}>Dashboard</Link>
            <Link to="/profile" className={s.link}>Profile</Link>
            <a href="logout" className={s.link}>Logout</a>
          </div>
        </div>
      </div>
    )
  }

  renderAnonymous() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Link className={s.brand} to="/">
            <div className={s.brandLogoWrap}> {headerLogoSvg} </div>
            <div className={s.brandTxtWrap}>
              <span className={cx(s.brandTxt, s.brandTxtSmall)}>
                <span>gitdude.com</span>
                <span className={s.beta}>(beta)</span>
              </span>
              <span className={cx(s.brandSubTxt, s.brandSubTxtSmall)}>Relevant commit commentary</span>
            </div>
          </Link>
          <div className={s.navigation} role="navigation"> <ButtonAuth /> </div>
          <div className={s.banner}>
            <h1 className={s.bannerTitle}>Gitdude.com</h1>
            <p className={s.bannerDesc}>The code intel you want and where you want!</p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>{ this.context.isAuthenticated ? this.renderAuthenticated() : this.renderAnonymous() }</div>
    )
  }
}

export default withStyles(s)(Header);
