import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Contact.css';

class Contact extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <p>You can contact me through <a href="https://github.com/lassegit/gitdude.com">Github</a> where you likewise have the opportunity to view the source code running this site.</p>
          <p>You are also welcome to open an issue.</p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Contact);
