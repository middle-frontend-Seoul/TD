import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Block, IBlockProps } from '../block';

export default {
  title: 'UI/Block',
} as Meta;

const Template: Story<IBlockProps> = (args: IBlockProps) => <Block {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Inline = Template.bind({});
Inline.args = { type: 'inline' };
