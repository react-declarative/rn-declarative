import * as React from 'react';

import { CheckBox as UiCheckBox } from '@ui-kitten/components';
import { ICheckBoxSlot } from 'rn-declarative';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {
        height: 45,
    },
});

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
