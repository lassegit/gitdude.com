import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TimeAgo from 'timeago-react';
import Editor from '../Editor';
import s from './UserRepos.css';
import Link from '../Link';
import Loading from '../Loading';

class UserRepos extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  static PropTypes = {
    repos: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { 'activeId': null };
  }

  onConfig(repo) {
    let activeId = repo.id === this.state.activeId ? null : repo.id;
    this.setState({ activeId: activeId });
  }

  async saveConfig(repo) {
    this.props.updateRepo(repo);

    const resp = await this.context.fetch(`/api/configs/eslintrc/${repo.id}/update`, {
      body: JSON.stringify({ config: JSON.stringify(repo.config), hasConfig: repo.hasConfig })
    });

    if (resp.status !== 200) {
      alert(`An error occurred trying to update ${repo.name}.`);
    } else {
      repo.hasConfig = true;
    }

    repo.loadingConfig = false;
    this.props.updateRepo(repo);
  }

  async removeRepo(repo) {
    repo.loading = true;
    repo.isActive = !repo.isActive;
    this.props.updateRepo(repo);

    const resp = await this.context.fetch('/graphql', {
      body: JSON.stringify({
        query: `mutation { repoStatus(
          id: "${repo.id}",
          isActive: ${repo.isActive},
        ) { id, isActive }}`
      }),
    });
    let { data, errors } = await resp.json();

    repo.loading = false;

    if (errors) {
      alert(`An error occurred trying to update ${repo.name}.`);
      repo.isActive = !repo.isActive;
    }

    this.props.updateRepo(repo);
  }

  renderEmpty() {
    return (<div className={s.root}><p>No Github repositories added yet…</p></div>)
  }

  render() {
    const { repos } = this.props;
    const { user } = this.context;
    const { activeId } = this.state;

    if (repos.length === 0) {
      return this.renderEmpty();
    };

    return (
      <div className={s.root}>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Config</th>
              <th>Main language</th>
              <th>Url</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
            {repos.map((repo, i) => {
              let configBtn = repo.hasConfig ? 'Edit config' : 'Add config';
              if (activeId === repo.id) {
                configBtn = 'Close config';
              }

              return (
                <tbody key={i}>
                  <tr>
                    <td>{repo.name}</td>
                    <td>{repo.isActive ? <span className={s.active}><b />Active</span> : <span className={s.disabled}><b />Disabled</span>}</td>
                    <td><button type="button" onClick={() => this.onConfig(repo)}>{ configBtn }</button></td>
                    <td>{repo.language ? repo.language : '-'}</td>
                    <td><a href={`https://github.com/${user.userName}/${repo.name}`} target="_blank">Github</a></td>
                    <td><TimeAgo title={repo.createdAt} datetime={repo.createdAt} /></td>
                    <td>
                      <button type="button" onClick={() => this.removeRepo(repo)} disabled={repo.loading ? true : false}>
                        {repo.isActive ? 'Disable' : 'Activate' }
                      </button>
                      <Loading visible={repo.loading ? true : false} size={20} />
                    </td>
                  </tr>

                  { activeId === repo.id ?
                    <tr>
                      <td colSpan="8">
                        <Editor saveConfig={this.saveConfig.bind(this)} repo={repo} />
                      </td>
                    </tr>
                  : null }
                </tbody>
              )
            })}
        </table>
      </div>
    );
  }
}

export default withStyles(s)(UserRepos);
