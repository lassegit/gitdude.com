import React from 'react';
import Layout from '../../components/Layout';
import Page from '../../components/Page';

export default {

  path: '/about',

  async action(component) {
    const data = await require.ensure([], require => require('./about.md'), 'about');

    return {
      title: data.title,
      chunk: 'about',
      component: <Layout><Page {...data} /></Layout>,
    };
  },

};
