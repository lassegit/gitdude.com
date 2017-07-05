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
          <div className={cx(s.navigation, s.navigationSmall, s.navigationAnon)} role="navigation">
            <a href="/auth/github" className={cx(s.link)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="rgba(255, 255, 255, 0.6)" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>{' '}
              Login with Github
            </a>
          </div>
          <div className={s.banner}>
            <h1 className={s.bannerTitle}>Gitdude.com</h1>
            <h2 className={s.bannerDesc}>Simple and accessible code improvement tips posted as a comment on your Github commits.</h2>
            <div className={s.loginButton}><ButtonAuth /></div>
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
