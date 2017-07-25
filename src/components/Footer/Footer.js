import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import Link from '../Link';

class Footer extends React.Component {
  static contextTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <span className={s.text}>Gitdude.com (beta) {new Date().getFullYear()}</span>
          <span className={s.spacer}>·</span>
          <Link className={s.link} to={this.context.isAuthenticated ? '/frontpage' : '/'}>Home</Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
