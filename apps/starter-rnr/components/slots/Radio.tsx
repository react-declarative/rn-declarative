import * as React from 'react';
import { useMemo } from 'react';

import { FormRadioGroupItem } from '../ui/form';
import { RadioGroup } from '~/components/ui/radio-group';

import { IRadioSlot } from 'rn-declarative';

export const Radio = ({
  onFocus,
  onBlur,
  onChange,
  name,
  title,
  value,
  disabled,
  dirty,
  invalid,
  incorrect,
  radioValue,
}: IRadioSlot) => {
  const error = useMemo(() => dirty ? invalid || incorrect || null : null, [dirty, invalid, incorrect]);  
  return (
    <RadioGroup
      onValueChange={onChange}
      value={value}
    >
      <FormRadioGroupItem
        name={name!}
        label={title!}
        disabled={disabled}
        radioValue={radioValue!}
        error={error}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </RadioGroup>
  );
}

export default Radio;
