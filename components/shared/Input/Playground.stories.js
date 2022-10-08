/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Input from './Input';

export default {
    component: Input,
    title: 'Components/Input/Playground',
    parameters: {
        chromatic: { disableSnapshot: true },
    },
};

const Template = (args) => <Input {...args} />;

export const Playground = Template.bind({});
Playground.args = {
    error: false,
    label: 'Name',
    message: '',
    value: '',
};
