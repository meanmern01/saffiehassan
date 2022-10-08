/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import NestedPicker from './NestedPicker';

export default {
    component: NestedPicker,
    title: 'Components/NestedPicker/Playground',
    parameters: {
        chromatic: { disableSnapshot: true },
    },
    argTypes: {
        onPick: { action: 'onPick' },
    },
};

const Template = (args) => <NestedPicker {...args} />;

export const Playground = Template.bind({});
Playground.args = {
    distribution: 'center',
    middleText: 'Middle text',
    showTooltip: false,
    options: [
        {
            id: 1,
            name: 'ds',
            selected: false,
        },
        {
            id: 2,
            name: 'os',
            selected: false,
        },
        {
            id: 3,
            name: 'dr',
            options: [
                {
                    id: 31,
                    name: 'drpt',
                    description: 'Dry, resistant, non-pigment and wrinkle-prone',
                    selected: false,
                },
                {
                    id: 32,
                    name: 'drnt',
                    description: 'Dry, resistant, non-pigment and wrinkle-prone',
                    selected: true,
                },
                {
                    id: 33,
                    name: 'drpw',
                    description: 'Dry, resistant, non-pigment and wrinkle-prone',
                    selected: false,
                },
                {
                    id: 34,
                    name: 'drnw',
                    description: 'Dry, resistant, non-pigment and wrinkle-prone',
                    selected: false,
                },
            ],
        },
        {
            id: 4,
            name: 'or',
            selected: false,
        },
    ],
};
