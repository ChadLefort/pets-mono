import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './Layout';
import { render } from '@testing-library/react';

describe('Layout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Router>
        <Layout title="Some App" />
      </Router>
    );
    expect(baseElement).toBeTruthy();
  });
});
