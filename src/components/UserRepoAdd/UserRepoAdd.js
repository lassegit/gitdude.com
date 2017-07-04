import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserRepoAdd.css';
import Link from '../Link';
import Loading from '../Loading';

class UserRepoAdd extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  static PropTypes = {
    repos: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  onSubmit(e) {
    e.preventDefault();
    let repositoryName = this.refs.repositoryname.value;
    let { repos } = this.props;

    // Check every is in order before continuing
    if (!repositoryName) {
      this.refs.repositoryname.value = '';
      return;
    };

    for (var i = repos.length - 1; i >= 0; i--) {
      if (repos[i].name === repositoryName) {
        alert(`You have already added ${repositoryName}.`);
        return;
      }
    }

    this.setState({ loading: true });
    this.githubInfo(repositoryName);
  }

  async githubInfo(name) {
    let userName = this.context.user.userName;
    const resp = await this.context.fetch('https://api.github.com/graphql', {
      body: JSON.stringify({
        query: `query { repository(owner:"${userName}", name:"${name}") {
          id, name, description, isPrivate, homepageUrl, createdAt, primaryLanguage { name }
        }}`
      })
    });
    let { data } = await resp.json();

    if (data && data.repository) {
      this.saveRepo(data.repository);
    } else {
      this.setState({ loading: false });
      alert('An error occured while trying to get repository information from the Github API.');
      return;
    }
  }

  async saveRepo(repo) {
    let language = repo.primaryLanguage ? repo.primaryLanguage.name : '';
    const resp = await this.context.fetch('/graphql', {
      body: JSON.stringify({
        query: `mutation { repoAdd(
          repositoryId: "${repo.id}",
          name: "${repo.name}",
          description: "${repo.description}",
          language: "${language}",
          isPrivate: ${repo.isPrivate},
          homepageUrl: "${repo.homepageUrl}",
          repositoryCreatedAt: "${repo.createdAt}",
        ) {
          id, repositoryId, name, description, isPrivate, isActive, homepageUrl, createdAt, language, hasConfig
        }}`
      })
    });
    let { data } = await resp.json();

    this.setState({ loading: false });

    if (data && data.repoAdd) {
      this.props.addRepo(data.repoAdd);
      this.refs.repositoryname.value = '';
    } else {
      alert('An error occured while trying to get save the repository to the database.');
      return;
    }
  }

  render() {
    const { user } = this.context;

    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <span>{user.userName}</span>
          <span>/</span>
          <input
            type="text"
            name="repositoryname"
            ref="repositoryname"
            placeholder="Name of github repository…" />
          <button type="submit" disabled={this.state.loading}>Add repository</button>

          <Loading visible={this.state.loading} size={20} />
        </form>
      </div>
    );
  }
}

export default withStyles(s)(UserRepoAdd);
