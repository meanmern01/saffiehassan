/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import SquareButton from './SquareButton';

export default {
    component: SquareButton,
    title: 'Components/SquareButton/Playground',
    parameters: {
        chromatic: { disableSnapshot: true },
    },
    argTypes: {
        onClick: { action: 'onClick' },
    },
};

const Template = ({ text, ...args }) => <SquareButton {...args}>{text}</SquareButton>;

export const Playground = Template.bind({});
Playground.args = {
    text: 'Race',
    sup: '',
};
