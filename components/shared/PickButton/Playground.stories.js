/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import PickButton from './PickButton';

export default {
    component: PickButton,
    title: 'Components/PickButton/Playground',
    decorators: [
        (Story) => (
            <div style={{ width: 300 }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        chromatic: { disableSnapshot: true },
    },
    argTypes: {
        onClick: { action: 'onClick' },
    },
};

const Template = (args) => <PickButton {...args} />;

export const Playground = Template.bind({});
Playground.args = {
    category: 'Race',
    title: 'East Asian',
    active: false,
};
