import * as React from 'react';

import { Text } from 'react-native';

import { ITypographySlot } from '../../../slots/TypographySlot';

/**
 * Typography component.
 *
 * @typedef  ITypographySlot
 * @property value - The text value to be displayed.
 * @property placeholder - The placeholder text to be displayed if `value` is empty.
 * @property typoVariant - The variant of the typography component (default: 'body1').
 *
 * @param props - The props for the Typography component.
 * @returns The rendered Typography component.
 */
export const Typography = ({
    value = '',
    placeholder = '',
}: ITypographySlot) => (
    <Text>
        {value || placeholder}
    </Text>
);

export default Typography;
