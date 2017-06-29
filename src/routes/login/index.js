import React from 'react';
import Layout from '../../components/Layout';
import Login from './Login';

const title = 'Login';

export default {

  path: '/login',

  action() {
    return {
      title,
      component: <Layout><Login title={title} /></Layout>,
    };
  },

};
