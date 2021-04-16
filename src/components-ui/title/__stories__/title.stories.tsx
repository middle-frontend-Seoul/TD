import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Title, ITitleProps } from '../title';

export default {
  title: 'UI/Title',
} as Meta;

const Template: Story<ITitleProps> = (args: ITitleProps) => <Title {...args} />;

export const Default = Template.bind({});
Default.args = { children: 'Выберите карту', style: { color: 'black' } };
