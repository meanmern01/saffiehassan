/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Button from './Button';
import PlaygroundStorySetup from './Playground.stories';

export default {
    component: Button,
    title: 'Components/Button/Features',
    parameters: {
        design: { ...PlaygroundStorySetup.parameters.design },
    },
    argTypes: {
        ...PlaygroundStorySetup.argTypes,
    },
};

const Template = ({ text, ...args }) => <Button {...args}>{text}</Button>;

export const Default = Template.bind({});
Default.args = {
    text: 'Button',
};

export const Dark = Template.bind({});
Dark.args = { ...Default.args, variant: 'dark' };

export const OutlineDark = Template.bind({});
OutlineDark.args = { ...Default.args, variant: 'outline-dark' };

export const Small = Template.bind({});
Small.args = { ...Dark.args, size: 'sm' };

export const Disabled = Template.bind({});
Disabled.args = { ...Dark.args, disabled: true };

export const Lowercase = Template.bind({});
Lowercase.args = { ...Dark.args, uppercase: false };
