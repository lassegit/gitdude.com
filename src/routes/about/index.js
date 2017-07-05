import React from 'react';
import Layout from '../../components/Layout';
import Page from '../../components/Page';

const style = {
  maxWidth: '768px',
  margin: 'auto',
  padding: '0 0 40px 0',
};

export default {

  path: '/about',

  async action(component) {
    const data = await require.ensure([], require => require('./about.md'), 'about');

    return {
      title: data.title,
      chunk: 'about',
      component: <Layout><div style={style}><Page {...data} /></div></Layout>,
    };
  },

};
