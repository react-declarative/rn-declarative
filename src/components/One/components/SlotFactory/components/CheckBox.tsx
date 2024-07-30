import * as React from 'react';

import { CheckBox as UiCheckBox } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import { ICheckBoxSlot } from '../../../slots/CheckBoxSlot';

const styles = StyleSheet.create({
    root: {
        height: 45,
    },
});

/**
 * Represents a checkbox component.
 *
 * @param disabled - Whether the checkbox is disabled or not.
 * @param onChange - The function to be called when the checkbox value changes.
 * @param title - The title or label for the checkbox.
 * @param value - The current value of the checkbox.
 * @returns - The rendered checkbox component.
 */
export const CheckBox = ({
    disabled,
    onChange,
    onFocus,
    onBlur,
    title,
    value,
}: ICheckBoxSlot) => (
    <UiCheckBox
        disabled={disabled}
        checked={Boolean(value)}
        onChange={() => onChange(!value)}
        onFocus={onFocus}
        onBlur={onBlur}
        style={styles.root}
    >
        {title}
    </UiCheckBox>
);

export default CheckBox;
