import * as React from "react";
import { useMemo } from "react";

import { Pressable } from "react-native";

import { Input } from '@ui-kitten/components';
import { useOnePayload, useOneState, ITextSlot } from 'rn-declarative';

const LOADING_LABEL = "Loading";

export const Text = ({
  invalid,
  incorrect,
  value,
  disabled,
  readonly,
  description = "",
  title = "",
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  leadingIconPress: lic,
  trailingIconPress: tic,
  inputMultiline = false,
  placeholder = "",
  dirty,
  loading,
  onChange,
  onFocus,
  onBlur,
}: ITextSlot) => {
  const payload = useOnePayload();
  const { object, changeObject: handleChange } = useOneState<object>();
  const error = useMemo(() => dirty && (invalid !== null || incorrect !== null), [dirty, invalid, incorrect]);
  return (
    <Input
      label={title}
      size="medium"
      value={loading ? LOADING_LABEL : value || ""}
      disabled={disabled || loading}
      multiline={inputMultiline}
      accessoryRight={TrailingIcon ? (
        <Pressable onPress={() => tic && tic(value, object, payload, onChange, handleChange)}>
          <TrailingIcon />
        </Pressable >
      ) : undefined}
      accessoryLeft={LeadingIcon ? (
        <Pressable onPress={() => lic && lic(value, object, payload, onChange, handleChange)}>
          <LeadingIcon />
        </Pressable>
      ) : undefined}
      onFocus={onFocus}
      onBlur={onBlur}
      onChangeText={(text) => {
        if (!readonly) {
          onChange(text);
        }
      }}
      caption={(dirty && (invalid || incorrect)) || description}
      placeholder={placeholder}
      status={error ? "danger" : undefined}
    />
  );
};

export default Text;
