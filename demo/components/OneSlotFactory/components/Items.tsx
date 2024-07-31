import * as React from 'react';

import { Text } from '@ui-kitten/components';

import { IItemsSlot } from 'rn-declarative';

export const Items = ({}: IItemsSlot) => (
    <Text>
      FieldType.Items is not provided (see OneSlotFactory)
    </Text>
);

export default Items;
