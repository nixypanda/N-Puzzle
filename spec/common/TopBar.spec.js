import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TopBar from '../../src/Common/TopBar';

describe('should render a top-bar to the screen', () => {
  it('checks the title bar is a valid react element', () => {
    expect(TestUtils.isElement(<TopBar N={4} changeGame={(n) => n} />)).toBeTruthy();
  });
});
