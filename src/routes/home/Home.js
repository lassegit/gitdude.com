import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ButtonAuth from '../../components/ButtonAuth';
import s from './Home.css';
import showcaseUrl from './showcase.jpg';

class Home extends React.Component {
  static contextTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  render() {
    const { isAuthenticated } = this.context;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h2 className={s.heading}>Code tips right on Github commits. <br /> Engaging and simple.</h2>

          <div className={s.blockWrapper}>
            <div>
              <div className={s.block}>
                <h3>Simple & accessible</h3>
                <p>Gitdude post simple comments with code improvements tips and explanations on each commit.</p>
              </div>
              <div className={s.block}>
                <h3>Follow code quality & discuss</h3>
                <p>Helps all involved in the project to review code quality, ensure high standard and discuss it further in comments below.</p>
              </div>
            </div>

            <div>
              <div className={s.block}>
                <h3>Engaging code progress</h3>
                <p>Commit after commit coders and project managers can insure high code quality and see deteriorations by browsing the commit history on Github.</p>
              </div>
              <div className={s.block}>
                <h3>Customizable</h3>
                <p>Users can configure their own code ESlinting preferences per repository. See for <a href="https://github.com/lassegit/gitdude.com">supported configurations</a>.</p>
              </div>
            </div>
          </div>

          <div className={s.showcase}>
            <p>Example of a Github commit with code tips:</p>
            <img className={s.showcaseImg} src={showcaseUrl} />
          </div>

          { !isAuthenticated ?
            <div className={s.authWrap}>
              <p>Get started:</p>
              <ButtonAuth />
            </div>
            : null
          }
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
