import * as React from 'react';
import { useCallback, useEffect, useMemo } from 'react';

import { Radio as UiRadio } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import { useOneRadio } from '../../../context/RadioProvider';

import useActualValue from '../../../../../hooks/useActualValue';

import { IRadioSlot } from '../../../slots/RadioSlot';

const styles = StyleSheet.create({
    root: {
        height: 45,
    },
});

/**
 * Represents a radio component.
 *
 * @typedef  IRadioSlot
 * @property disabled - Determines if the radio component is disabled.
 * @property onChange - The function to be called when the value of the radio component changes.
 * @property title - The title of the radio component.
 * @property radioValue - The value of the radio component.
 * @property value - The current selected value of the radio component.
 * @property [name=''] - The name of the radio component.
 */
export const Radio = ({
    disabled,
    onChange,
    onFocus,
    onBlur,
    title,
    radioValue,
    value,
    name = '',
}: IRadioSlot) => {
    const [radioMap, setRadioMap] = useOneRadio();
    const radioMap$ = useActualValue(radioMap);

    const checked = useMemo(() => {
        return radioMap[name] === radioValue;
    }, [radioMap]);

    /**
     * Sets the value of a radio map.
     *
     * @param value - The value to set.
     *
     * @returns
     */
    const setValue = useCallback((value: string | null) => setRadioMap((prevRadioMap) => ({
        ...prevRadioMap,
        [name]: value,
    })), []);

    /**
     * Handles changes in a value and triggers a callback function.
     *
     * @param value - The new value to be handled.
     * @returns
     */
    const handleChange = useCallback((value: string | null) => {
        setValue(value);
        onChange(value);
    }, []);

    useEffect(() => {
        const { current: radioMap } = radioMap$;
        if (value !== radioMap[name]) {
            setValue(value);
        }
    }, [value]);

    return (
        <UiRadio
            checked={checked}
            disabled={disabled}
            onChange={() => handleChange(radioValue || null)}
            onFocus={onFocus}
            onBlur={onBlur}
            style={styles.root}
        >
            {title}
        </UiRadio>
    );
};

export default Radio;
