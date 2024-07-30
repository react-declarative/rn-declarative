import * as React from "react";

import { Text as UiText } from 'react-native';

import { ITextSlot } from "../../../slots/TextSlot";

export const Text = ({}: ITextSlot) => (
  <UiText>
    FieldType.Text is not provided (see OneSlotFactory)
  </UiText>
);

export default Text;
