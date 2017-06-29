import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';
import ButtonAuth from '../../components/ButtonAuth';

class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <p className={s.lead}>Authorize with your Github account.</p>
          <div className={s.formGroup}>
            <ButtonAuth />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Login);
