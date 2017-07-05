import React from 'react';
import Layout from '../../components/Layout';

const title = 'User profile';

export default {

  path: '/profile',

  async action({isAuthenticated, fetch}) {
    const Profile = await require.ensure([], require => require('./Profile').default, 'Profile');

    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: 'query { me{ id, userName, createdAt }}',
      }),
    });
    const { data } = await resp.json();

    return {
      title,
      authRequired: true,
      component: <Layout><Profile user={data.me} title={title} /></Layout>,
    };
  },

};
