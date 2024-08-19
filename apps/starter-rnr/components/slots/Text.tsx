import * as React from "react";
import { useMemo } from "react";
import { ITextSlot } from 'rn-declarative';

import { FormInput, FormTextarea } from '~/components/ui/form';

const LOADING_LABEL = "Loading";

export const Text = ({
  invalid,
  incorrect,
  value,
  name,
  disabled,
  readonly,
  description = "",
  title = "",
  inputMultiline = false,
  placeholder = "",
  dirty,
  loading,
  onChange,
  onFocus,
  onBlur,
}: ITextSlot) => {
  const error = useMemo(() => dirty ? invalid || incorrect || null : null, [dirty, invalid, incorrect]);

  if (inputMultiline) {
    return (
      <FormTextarea
        name={name}
        disabled={disabled}
        readOnly={readonly}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        value={loading ? LOADING_LABEL : value || ""}
        error={error}
        placeholder={placeholder}
        label={title}
        description={description}
      />
    );
  }

  return (
    <FormInput
      name={name}
      disabled={disabled}
      readOnly={readonly}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      value={loading ? LOADING_LABEL : value || ""}
      error={error}
      placeholder={placeholder}
      label={title}
      description={description}
    />
  );
}

export default Text;
