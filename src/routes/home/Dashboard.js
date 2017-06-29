import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Dashboard.css';
import UserRepos from '../../components/UserRepos';
import UserRepoAdd from '../../components/UserRepoAdd';

class Dashboard extends React.Component {
  static propTypes = {
    repos: PropTypes.array.isRequired,
  };

  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { repos: props.repos };
  }

  addRepo(repo) {
    let { repos } = this.state;
    repos.unshift(repo);
    this.setState({ repos: repos });
  }

  updateRepo(repo) {
    let { repos } = this.state;

    for (var i = repos.length - 1; i >= 0; i--) {
      if (repos[i].id === repo.id) {
        repos[i] = repo;
      }
    }

    this.setState({ repos: repos });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Dashboard</h1>
          <hr />
          <UserRepoAdd repos={this.state.repos} addRepo={this.addRepo.bind(this)} />
          <UserRepos repos={this.state.repos} updateRepo={this.updateRepo.bind(this)} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Dashboard);
