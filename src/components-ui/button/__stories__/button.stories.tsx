import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button, IButtonProps } from '../button';

export default {
  title: 'UI/Button',
} as Meta;

const Template: Story<IButtonProps> = (args: IButtonProps) => (
  <Button {...args} />
);

export const Default = Template.bind({});
Default.args = {
  use: 'default',
  disabled: false,
  radius: true,
  children: 'Кнопка',
};

export const Primary = Template.bind({});
Primary.args = {
  use: 'primary',
  disabled: false,
  children: 'Кнопка',
};
