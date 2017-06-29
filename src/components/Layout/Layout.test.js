/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import App from '../App';
import Layout from './Layout';

describe('Layout', () => {

  it('renders children correctly', () => {
    const wrapper = render(
      <App context={{ insertCss: () => {} }}>
        <Layout>
          <div className="child" />
        </Layout>
      </App>,
    );
    expect(wrapper.find('div.child').length).to.eq(1);
  });

});
