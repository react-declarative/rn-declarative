import * as React from "react";

import { Toggle } from '@ui-kitten/components';

import { ISwitchSlot } from "../../../slots/SwitchSlot";

/**
 * Represents a Switch component.
 * @param props - The properties of the Switch component.
 * @param props.disabled - Whether the Switch component is disabled.
 * @param props.value - The value of the Switch component.
 * @param props.onChange - The callback function when the value of the Switch component changes.
 * @param props.title - The title of the Switch component.
 * @param props.switchNoColor - Whether the Switch component has no color.
 * @param props.switchActiveLabel - The label for the active state of the Switch component.
 * @returns - The rendered Switch component.
 */
export const Switch = ({
  disabled,
  value,
  onChange,
  title,
}: ISwitchSlot) => {
  return (
    <Toggle
      checked={Boolean(value)}
      disabled={disabled}
      onChange={() => onChange(!value)}
    >
      {title}  
    </Toggle>
  );
};

export default Switch;
