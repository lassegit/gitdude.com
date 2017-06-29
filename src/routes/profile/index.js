import React from 'react';
import Layout from '../../components/Layout';

const title = 'Profile page';

export default {

  path: '/profile',

  async action({isAuthenticated}) {
    const Profile = await require.ensure([], require => require('./Profile').default, 'Profile');

    return {
      title,
      authRequired: true,
      component: <Layout><Profile title={title} /></Layout>,
    };
  },

};
