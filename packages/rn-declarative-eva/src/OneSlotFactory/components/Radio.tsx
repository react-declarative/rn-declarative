import * as React from 'react';
import { useCallback, useEffect, useMemo } from 'react';

import { Radio as UiRadio } from '@ui-kitten/components';
import { useOneRadio, useActualValue, IRadioSlot } from 'rn-declarative';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {
        height: 45,
    },
});

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

    const setValue = useCallback((value: string | null) => setRadioMap((prevRadioMap) => ({
        ...prevRadioMap,
        [name]: value,
    })), []);

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
