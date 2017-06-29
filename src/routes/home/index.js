import React from 'react';
import Home from './Home';
import Dashboard from './Dashboard';
import Layout from '../../components/Layout';

export default {
  path: ['/', '/frontpage'],

  async action({ fetch, isAuthenticated, user, path }) {
    if (isAuthenticated && path !== '/frontpage') {
      const resp = await fetch('/graphql', {
        body: JSON.stringify({
          query: 'query { userRepos{ id, repositoryId, name, isActive, language, hasConfig, createdAt }}',
        }),
      });
      const { data } = await resp.json();

      return {
        title: 'Dashboard',
        component: <Layout><Dashboard repos={data.userRepos || []} /></Layout>,
      }
    };

    return {
      title: 'React Starter Kit',
      component: <Layout><Home /></Layout>,
    };
  },
};
