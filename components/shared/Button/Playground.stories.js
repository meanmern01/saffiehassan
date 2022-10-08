/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Button from './Button';

export default {
    component: Button,
    title: 'Components/Button/Playground',
    parameters: {
        chromatic: { disableSnapshot: true },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/IvHmiVj0o42euhvr2u4G4m/Skinstric---Design?node-id=1066%3A20220',
        },
    },
    argTypes: {
        onClick: { action: 'onClick' },
    },
};

const Template = ({ text, ...args }) => <Button {...args}>{text}</Button>;

export const Playground = Template.bind({});
Playground.args = {
    text: 'Button',
    disabled: false,
    variant: 'dark',
    size: 'md',
    geometryVariant: 'wide',
    uppercase: true,
};
