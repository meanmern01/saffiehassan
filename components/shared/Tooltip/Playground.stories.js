/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Tooltip from './Tooltip';

export default {
    component: Tooltip,
    title: 'Components/Tooltip/Playground',
    parameters: {
        chromatic: { disableSnapshot: true },
    },
};

const Template = ({ label, text, ...args }) => (
    <Tooltip {...args} label={<div style={{ padding: 10 }}>{label}</div>}>
        <span>{text}</span>
    </Tooltip>
);

export const Playground = Template.bind({});
Playground.args = {
    text: 'Hover me',
    label: 'I am the description of the element',
    placement: 'top-start',
    offset: 20,
    shift: 8,
};
