import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'timeago-react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Profile.css';

class Profile extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
  };

  render() {
    const { user } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <p><label>Id:</label> {user.id}</p>
          <p><label>User name:</label> {user.userName}</p>
          <p><label>Github profile:</label> <a href={`https://github.com/${user.userName}`}>link</a></p>
          <p><label>Created at:</label> <TimeAgo title={user.createdAt} datetime={user.createdAt} /></p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Profile);
