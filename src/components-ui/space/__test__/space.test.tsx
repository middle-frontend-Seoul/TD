import React from 'react';
import renderer from 'react-test-renderer';

import { Space } from '../space';

it('renders space vertical', () => {
  const tree = renderer
    .create(
      <Space>
        <div>1</div>
        <div>1</div>
      </Space>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders space horizontal', () => {
  const tree = renderer
    .create(
      <Space type="horizontal">
        <div>1</div>
        <div>1</div>
      </Space>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
