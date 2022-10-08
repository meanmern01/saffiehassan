/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Input from './Input';

export default {
    component: Input,
    title: 'Components/Input/Features',
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});

export const WithLabel = Template.bind({});
WithLabel.args = {
    label: 'Name',
};

export const WithError = Template.bind({});
WithError.args = {
    error: true,
    message: 'The field must not be empty',
};
