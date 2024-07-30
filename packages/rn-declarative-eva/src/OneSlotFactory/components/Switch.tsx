import * as React from "react";

import { Toggle } from '@ui-kitten/components';
import { ISwitchSlot } from 'rn-declarative';

export const Switch = ({
  disabled,
  value,
  onChange,
  onFocus,
  onBlur,
  title,
}: ISwitchSlot) => {
  return (
    <Toggle
      checked={Boolean(value)}
      disabled={disabled}
      onChange={() => onChange(!value)}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {title}  
    </Toggle>
  );
};

export default Switch;
