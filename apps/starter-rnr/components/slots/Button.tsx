import * as React from 'react';

import { Button as UiButon } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

import { IButtonSlot } from 'rn-declarative';

export const Button = ({
    onBlur,
    onFocus,
    press,
    title,
    placeholder,
    disabled,
    buttonVariant,
}: IButtonSlot) => {
    if (buttonVariant === 'secondary') {
        return (
            <UiButon 
                variant="secondary"
                disabled={disabled}
                onPress={press}
                onFocus={onFocus}
                onBlur={onBlur}
            >
                <Text>
                    {title || placeholder}
                </Text>
            </UiButon>
        );
    }
    return (
        <UiButon 
            disabled={disabled}
            onPress={press}
            onFocus={onFocus}
            onBlur={onBlur}
        >
            <Text>
                {title || placeholder}
            </Text>
        </UiButon>
    );
};

export default Button;
