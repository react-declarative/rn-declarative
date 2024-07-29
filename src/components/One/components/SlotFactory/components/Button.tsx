import * as React from 'react';

import ActionButton from '../../../../ActionButton';

import { IButtonSlot } from '../../../slots/ButtonSlot';

import makeTestId from '../../../helpers/makeTestId';

/**
 * Represents a button component.
 */
export const Button = ({
    disabled,
    press,
    title,
    value,
    placeholder,
    onFocus,
    onBlur,
    style,
    testId,
}: IButtonSlot) => (
    <ActionButton
        disabled={disabled}
        onPress={press}
        onFocus={onFocus}
        onBlur={onBlur}
        style={style}
        {...makeTestId(testId)}
    >
        {value || title || placeholder}
    </ActionButton>
);

export default Button;
