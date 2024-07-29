import * as React from 'react';
import { useState, useRef, useLayoutEffect } from 'react';

import { Button, ButtonProps, Spinner } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

import useActualValue from '../../hooks/useActualValue';

const styles = StyleSheet.create({
    indicator: {
      justifyContent: 'center',
      alignItems: 'center',
    },
});

/**
 * Represents the properties for an ActionButton component.
 * @interface
 */
interface IActionButtonProps extends Omit<ButtonProps, keyof {
    onPress: never;
}> {
    onLoadStart?: () => void;
    onLoadEnd?: (isOk: boolean) => void;
    onPress?: () => (void | Promise<void>);
    fallback?: (e: Error) => void;
    throwError?: boolean;
};

const LoadingIndicator = () => (
    <View style={styles.indicator}>
      <Spinner size='small' />
    </View>
);

/**
 * Represents an action button component.
 *
 * @component
 * @param props - The component props.
 * @param [props.Progress=ProgressDefault] - The progress component to show when the button is loading.
 * @param [props.onPress=()=>{}] - The function to be called when the button is pressed.
 * @param [props.onLoadStart] - The function to be called when the loading starts.
 * @param [props.onLoadEnd] - The function to be called when the loading ends.
 * @param [props.fallback] - The function to be called when an error occurs and throwError is false.
 * @param [props.children] - The content to be rendered inside the button.
 * @param [props.disabled] - Whether the button is disabled.
 * @param [props.throwError=false] - Whether to throw an error when an exception occurs.
 *
 * @returns The rendered component.
 */
export const ActionButton = ({
    onPress = () => { },
    onLoadStart,
    onLoadEnd,
    fallback,
    children,
    disabled,
    throwError = false,
    ...otherProps
}: IActionButtonProps) => {

    const [loading, setLoading] = useState(0);

    const isMounted = useRef(true);

    useLayoutEffect(() => () => {
      isMounted.current = false;
    }, []);

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
        let isOk = true;
        try {
            onLoadStart && onLoadStart();
            isMounted.current && setLoading((loading) => loading + 1);
            await onPress();
        } catch (e: any) {
            isOk = false;
            if (!throwError) {
                fallback && fallback(e as Error);
            } else {
                throw e;
            }
        } finally {
            onLoadEnd && onLoadEnd(isOk);
            isMounted.current && setLoading((loading) => loading - 1);
        }
    };

    const iconProps: Record<string, unknown> = {};

    return (
        <Button
            {...otherProps}
            onPress={handlePress}
            disabled={!!loading || disabled}
            accessoryLeft={loading ? <LoadingIndicator /> : undefined}
            {...iconProps}
        >
            {children}
        </Button>
    );
};

export default ActionButton;
