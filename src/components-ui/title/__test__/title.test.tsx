import React from 'react';
import renderer from 'react-test-renderer';

import { Title } from '../title';

it('renders title', () => {
  const tree = renderer.create(<Title>hello test</Title>).toJSON();
  expect(tree).toMatchSnapshot();
});
