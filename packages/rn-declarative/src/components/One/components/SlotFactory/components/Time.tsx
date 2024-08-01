import * as React from "react";

import { Text } from 'react-native';

import { ITimeSlot } from "../../../slots/TimeSlot";

export const TimeField = ({}: ITimeSlot) => (
  <Text>
    FieldType.Time is not provided (see OneSlotFactory)
  </Text>
);


export default TimeField;
