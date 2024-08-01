import * as React from "react";

import { Text } from 'react-native';

import { IProgressSlot } from "../../../slots/ProgressSlot";

export const ProgressField = ({}: IProgressSlot) => (
  <Text>
    FieldType.Progress is not provided (see OneSlotFactory)
  </Text>
);


export default ProgressField;
