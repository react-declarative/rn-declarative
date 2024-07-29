import * as React from 'react';

import ActionButton from '../../../../ActionButton';

import { IButtonSlot } from '../../../slots/ButtonSlot';

/**
 * Represents a button component.
 */
export const Button = ({
    disabled,
    press,
    icon: Icon,
    title,
    value,
    placeholder,
    buttonVariant,
    buttonSize,
    buttonColor,
}: IButtonSlot) => (
    <ActionButton
        variant={buttonVariant}
        size={buttonSize}
        color={buttonColor}
        startIcon={Icon && <Icon />}
        disabled={disabled}
        onPress={press}
    >
        {value || title || placeholder}
    </ActionButton>
);

export default Button;
