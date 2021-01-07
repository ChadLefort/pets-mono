import React from 'react';
import { Layout } from './Layout';
import { render } from '@testing-library/react';

describe('Layout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Layout title="Some App" />);
    expect(baseElement).toBeTruthy();
  });
});
