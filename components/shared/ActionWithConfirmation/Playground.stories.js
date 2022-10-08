/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import ActionWithConfirmation from './ActionWithConfirmation';
import Button from '@/components/shared/Button';

export default {
    component: ActionWithConfirmation,
    title: 'Components/ActionWithConfirmation/Playground',
    parameters: {
        chromatic: { disableSnapshot: true },
    },
};

const Template = (args) => (
    <ActionWithConfirmation
        {...args}
        popupActionsSlot={
            <>
                <Button variant="dark" data-confirmation="accept">
                    Remove
                </Button>
                <Button variant="dark" data-confirmation="cancel">
                    Keep
                </Button>
            </>
        }
    >
        <Button variant="dark">Delete ingredient</Button>
    </ActionWithConfirmation>
);

export const Playground = Template.bind({});
Playground.args = {
    popupTitle: 'Are you sure you want to delete this ingredient?',
    placement: 'bottom-start',
    offset: 10,
    shift: 8,
};
