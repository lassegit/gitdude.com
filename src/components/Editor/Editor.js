import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Editor.css';
import Link from '../Link';
import Loading from '../Loading';

const AceEditor = (props) => {
  if (typeof window !== 'undefined') {
    const Ace = require('react-ace').default;
    require('brace/mode/json');
    require('brace/theme/github');
    return <Ace editorProps={{ $blockScrolling: Infinity }} {...props}/>
  }
  return null;
}

class Editor extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { repo: props.repo };
  }

  componentDidMount() {
    const { config, hasConfig } = this.state.repo;
    if (!config && hasConfig) {
      this.fetchConfig();
    }
  }

  async fetchConfig() {
    let { repo } = this.state;
    const resp = await this.context.fetch(`/api/configs/eslintrc/${repo.id}/get`, { method: 'post' });
    let config = await resp.json();

    if (resp.status === 200) {
      repo.config = JSON.stringify(config, null, 4);
      this.setState({ repo: repo });
    }
  }

  onChange(newValue) {
    let repo = this.state.repo;
    repo.config = newValue;
    this.setState({ repo: repo });
  }

  onSave() {
    let { repo } = this.state;

    try {
      JSON.parse(repo.config);
    } catch (e) {
      alert(`The configuration file for ${repo.name} isn\'t valid JSON.`);
      return;
    }

    repo.loadingConfig = true;
    this.props.saveConfig(repo);
  }

  render() {
    const { repo } = this.state;

    if (repo.hasConfig && typeof repo.config === undefined) {
      return (<p><Loading size={20} visible={true} /> Loading configuration file...</p>);
    }

    return (
        <div className={s.root}>
          <p>ESlint configuration file:</p>
          <AceEditor
            mode="json"
            theme="github"
            focus={true}
            fontSize={14}
            showPrintMargin={false}
            onChange={this.onChange.bind(this)}
            value={this.state.repo.config}
            useWrapMode="true"
            style={{ height: '400px', width:'100%', border:'1px solid #ddd', marginBottom: '1em' }}
            setOptions={{
              tabSize: 4,
            }}
          />
          <button onClick={this.onSave.bind(this)} disabled={repo.loadingConfig}>Save config</button>

          <select>
            <option>Load config</option>
          </select>

          <Loading size={20} visible={repo.loadingConfig} />

          <p>A configuation file is JSON formatted file that is parsed to ESlint and excuted on your commited code. You can load example configuation files using the select box above. <Link to="/howto">Show syntax and included ES plugin documentation.</Link></p>
        </div>
      );
  }
}

export default withStyles(s)(Editor);
