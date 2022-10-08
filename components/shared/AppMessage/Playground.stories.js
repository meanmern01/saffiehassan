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

const Template = ({ text, ...args }) => <AppMessage {...args}>{text}</AppMessage>;

export const Playground = Template.bind({});
Playground.args = {
    text: 'We use cookie to provide the best experience',
    visible: true,
    fixed: false,
};
