import * as React from 'react';
import { useMemo } from 'react';

import { FormCheckbox } from '../ui/form';

import { ICheckBoxSlot } from 'rn-declarative';

export const CheckBox = ({
    onFocus,
    onBlur,
    value,
    onChange,
    title,
    description,
    name,
    dirty,
    invalid,
    incorrect,
    disabled,
}: ICheckBoxSlot) => {
    const error = useMemo(() => dirty ? invalid || incorrect || null : null, [dirty, invalid, incorrect]);  
    return (
        <FormCheckbox
            name={name}
            label={title}
            description={description}
            disabled={disabled}
            error={error}
            onFocus={onFocus}
            onBlur={onBlur}
            value={value}
            onChange={onChange}
        />
    );
}

export default CheckBox;
