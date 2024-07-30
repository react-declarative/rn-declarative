import * as React from 'react';
import { useState } from 'react';

import { StyleSheet, View } from 'react-native';
import { IButtonSlot, useActualValue } from 'rn-declarative';

import { Spinner, Button as UiButton } from '@ui-kitten/components';

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
