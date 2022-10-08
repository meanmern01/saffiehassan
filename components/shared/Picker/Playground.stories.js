/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Picker from './Picker';

export default {
    component: Picker,
    title: 'Components/Picker/Playground',
    parameters: {
        chromatic: { disableSnapshot: true },
    },
    argTypes: {
        onPick: { action: 'onPick' },
        onMiddleSquareClick: { action: 'onMiddleSquareClick' },
    },
};

const Template = (args) => <Picker {...args} />;

export const Playground = Template.bind({});
Playground.args = {
    distribution: 'center',
    middleText: 'Middle text',
    sup: '',
    options: [
        { id: 1, name: 'Option 1', selected: false },
        { id: 2, name: 'Option 2', selected: false },
        { id: 3, name: 'Option 3', selected: false },
        { id: 4, name: 'Option 4', selected: true },
        { id: 5, name: 'Option 5', selected: false },
        { id: 6, name: 'Option 6', selected: false },
        { id: 7, name: 'Option 7', selected: false },
        { id: 8, name: 'Option 8', selected: false },
    ],
};
