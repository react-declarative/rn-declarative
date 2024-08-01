import * as React from "react";

import { Text } from 'react-native';

import { ICompleteSlot } from "../../../slots/CompleteSlot";

export const CompleteField = ({}: ICompleteSlot) => (
  <Text>
    FieldType.Complete is not provided (see OneSlotFactory)
  </Text>
);


export default CompleteField;
