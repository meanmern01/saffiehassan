/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Tooltip from './Tooltip';

export default {
    component: Tooltip,
    title: 'Components/Tooltip/Features',
};

const Template = ({ label = 'I am the description of the element', text = 'Hover me', ...args }) => (
    <Tooltip {...args} label={<div style={{ padding: 10 }}>{label}</div>}>
        <span>{text}</span>
    </Tooltip>
);

export const Default = Template.bind({});

export const PlacementTopStart = Template.bind({});
PlacementTopStart.args = {
    placement: 'top-start',
};

export const PlacementTopEnd = Template.bind({});
PlacementTopEnd.args = {
    placement: 'top-end',
};

export const PlacementRightStart = Template.bind({});
PlacementRightStart.args = {
    placement: 'right-start',
};

export const PlacementRightEnd = Template.bind({});
PlacementRightEnd.args = {
    placement: 'right-end',
};

export const PlacementLeftStart = Template.bind({});
PlacementLeftStart.args = {
    placement: 'left-start',
};

export const PlacementLeftEnd = Template.bind({});
PlacementLeftEnd.args = {
    placement: 'left-end',
};

export const PlacementBottomStart = Template.bind({});
PlacementBottomStart.args = {
    placement: 'bottom-start',
};

export const PlacementBottomEnd = Template.bind({});
PlacementBottomEnd.args = {
    placement: 'bottom-end',
};
