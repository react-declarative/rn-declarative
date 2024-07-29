import * as React from 'react';

import ActionButton from '../../../../ActionButton';

import { IButtonSlot } from '../../../slots/ButtonSlot';

/**
 * Represents a button component.
 */
export const Button = ({
    disabled,
    press,
    title,
    value,
    placeholder,
    buttonApperance,
    buttonSize,
}: IButtonSlot) => (
    <ActionButton
        appearance={buttonApperance}
        size={buttonSize}
        disabled={disabled}
        onPress={press}
    >
        {value || title || placeholder}
    </ActionButton>
);

export default Button;
