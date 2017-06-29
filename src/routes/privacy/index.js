import React from 'react';
import Layout from '../../components/Layout';
import Page from '../../components/Page';

export default {

  path: '/privacy',

  async action() {
    const data = await require.ensure([], require => require('./privacy.md'), 'privacy');

    return {
      title: data.title,
      chunk: 'privacy',
      component: <Layout><Page {...data} /></Layout>,
    };
  },

};
