import * as React from "react";
import { useMemo } from "react";

import { FormSwitch } from "~/components/ui/form";

import { ISwitchSlot } from "rn-declarative";

export const Switch = ({
  onFocus,
  onBlur,
  onChange,
  value,
  name,
  title,
  dirty,
  invalid,
  incorrect,
  description,
}: ISwitchSlot) => {
  const error = useMemo(() => dirty ? invalid || incorrect || null : null, [dirty, invalid, incorrect]);  
  return (
    <FormSwitch
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      description={description}
      value={value}
      name={name}
      error={error}
      label={title}
    />
  );  
}

export default Switch;
