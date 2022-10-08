/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import AppMessage from './AppMessage';

export default {
    component: AppMessage,
    title: 'Components/AppMessage/Playground',
    parameters: {
        chromatic: { disableSnapshot: true },
    },
};

const Template = ({ text = 'We use cookie to provide the best experience', ...args }) => (
    <AppMessage {...args}>{text}</AppMessage>
);

export const Default = Template.bind({});

export const Fixed = Template.bind({});
Fixed.args = {
    fixed: true,
};
