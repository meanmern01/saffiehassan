/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Picker from './Picker';
import { Playground } from './Playground.stories';

export default {
    component: Picker,
    title: 'Components/Picker/Features',
    parameters: {
        chromatic: { disableSnapshot: true },
    },
    argTypes: {
        onPick: { action: 'onPick' },
    },
};

const Template = ({ options = Playground.args.options, ...args }) => <Picker {...args} options={options} />;

export const Default = Template.bind({});

export const WithMiddleText = Template.bind({});
WithMiddleText.args = {
    middleText: 'Middle text',
};

export const WithSup = Template.bind({});
WithSup.args = {
    ...WithMiddleText.args,
    sup: '8',
};

export const DistributionCenter = Template.bind({});
DistributionCenter.args = {
    distribution: 'center',
};

export const DistributionTop = Template.bind({});
DistributionTop.args = {
    distribution: 'top',
};

export const DistributionBottom = Template.bind({});
DistributionBottom.args = {
    distribution: 'bottom',
};

export const DistributionLeft = Template.bind({});
DistributionLeft.args = {
    distribution: 'left',
};

export const DistributionRight = Template.bind({});
DistributionRight.args = {
    distribution: 'right',
};
