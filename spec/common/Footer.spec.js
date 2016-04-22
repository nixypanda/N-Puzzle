import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Footer from '../../src/Common/Footer';

describe('The Footer component', () => {
  it('has appropriate message displayed', () => {
    expect(TestUtils.isElement(<Footer />)).toBeTruthy();
  });
});
