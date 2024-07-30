import * as React from 'react';
import { useState } from 'react';

import { StyleSheet, View } from 'react-native';

import { Spinner, Button as UiButton } from '@ui-kitten/components';

import { IButtonSlot } from '../../../slots/ButtonSlot';

import useActualValue from '../../../../../hooks/useActualValue';

const styles = StyleSheet.create({
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const LoadingIndicator = () => (
    <View style={styles.indicator}>
        <Spinner size='small' />
    </View>
);

/**
 * Represents a button component.
 */
export const Button = ({
    disabled,
    press,
    title,
    placeholder,
    onFocus,
    onBlur,
}: IButtonSlot) => {

    const [loading, setLoading] = useState<boolean>(false);

    const loading$ = useActualValue(loading);

    /**
     * Handles press event for a button.
     *
     * @param event - The press event.
     * @returns - Promise that resolves when the press handling is completed.
     */
    const handlePress = async () => {
        const { current: loading } = loading$;
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            await press();
        } finally {
            setLoading(false);
        }
    };

    return (
        <UiButton
            onPress={handlePress}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={!!loading || disabled}
            accessoryLeft={loading ? <LoadingIndicator /> : undefined}
        >
            {title || placeholder}
        </UiButton>
    );
}

export default Button;
