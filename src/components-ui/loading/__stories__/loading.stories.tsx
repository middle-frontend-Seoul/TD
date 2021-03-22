import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Loading, ILoadingProps } from '../loading';

export default {
  title: 'UI/Loading',
} as Meta;

const Template: Story<ILoadingProps> = (args: ILoadingProps) => (
  <Loading {...args} />
);

export const Default = Template.bind({});
Default.args = {};
