import React from 'react';
import renderer from 'react-test-renderer';

import { Button } from '../button';

it('renders button base', () => {
  const tree = renderer.create(<Button>test button</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders button size', () => {
  const tree = renderer.create(<Button size="xsmall">size</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});
