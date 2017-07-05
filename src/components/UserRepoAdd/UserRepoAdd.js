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

    this.state = {
      loading: false,
      repoOwner: '',
      repoOwnerOptions: [],
      repoOwnerFetch: false,
    };
  }

  componentWillMount() {
    const { userName } = this.context.user;

    this.setState({
      repoOwner: userName,
      repoOwnerOptions: [userName],
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const repositoryName = this.refs.repositoryname.value;
    const { repos } = this.props;

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
    const { repoOwner } = this.state;

    const resp = await this.context.fetch('https://api.github.com/graphql', {
      body: JSON.stringify({
        query: `query { repository(owner:"${repoOwner}", name:"${name}") {
          id, name, description, isPrivate, homepageUrl, createdAt, primaryLanguage { name }
        }}`
      })
    });
    const { data } = await resp.json();

    if (data && data.repository) {
      data.repository.owner = repoOwner;
      this.saveRepo(data.repository);
    } else {
      this.setState({ loading: false });
      alert('An error occured while trying to get repository information from the Github API.');
      return;
    }
  }

  async saveRepo(repo) {
    const language = repo.primaryLanguage ? repo.primaryLanguage.name : '';

    const resp = await this.context.fetch('/graphql', {
      body: JSON.stringify({
        query: `mutation { repoAdd(
          repositoryId: "${repo.id}",
          name: "${repo.name}",
          owner: "${repo.owner}",
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
    const { data } = await resp.json();

    this.setState({ loading: false });

    if (data && data.repoAdd) {
      this.props.addRepo(data.repoAdd);
      this.refs.repositoryname.value = '';
    } else {
      alert('An error occured while trying to get save the repository to the database.');
      return;
    }
  }

  async onClickSelect(e) {
    const { repoOwnerFetch, repoOwnerOptions } = this.state;
    const { userName } = this.context.user;

    if (repoOwnerFetch) { return; }

    this.setState({
      loading: true,
      repoOwnerFetch: true,
    });

    const resp = await this.context.fetch(`https://api.github.com/users/${userName}/orgs`, {
      method: 'get'
    });
    const data = await resp.json();

    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        repoOwnerOptions.push(data[i].login);
      }
    }

    this.setState({
      repoOwnerOptions: repoOwnerOptions,
      loading: false,
    });
  }

  async onSelect(e) {
    this.setState({ repoOwner: e.target.value });
  }

  render() {
    const { user } = this.context;
    const { repoOwner, repoOwnerOptions } = this.state;
    console.log(this.state)
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>

          <select
            value={repoOwner}
            onChange={this.onSelect.bind(this)}
            onClick={this.onClickSelect.bind(this)}
            title="Search for repositories owned by an Github organisation that you are a member of">
            {repoOwnerOptions.map(item => {
              return (<option key={item} value={item}>{item}</option>)
            })}
          </select>

          {' '}<span>/</span>{' '}

          <input
            type="text"
            name="repositoryname"
            ref="repositoryname"
            placeholder="Name of github repository…"
            className={s.input}/>{' '}

          <button className={s.button} type="submit" disabled={this.state.loading}>Add repository</button>

          <Loading visible={this.state.loading} size={20} />
        </form>
      </div>
    );
  }
}

export default withStyles(s)(UserRepoAdd);
