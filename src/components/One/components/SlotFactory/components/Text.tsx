import * as React from "react";
import { useMemo } from "react";

import { Pressable } from "react-native";

import { Input } from '@ui-kitten/components';

import { useOnePayload } from "../../../context/PayloadProvider";
import { useOneState } from "../../../context/StateProvider";

import { ITextSlot } from "../../../slots/TextSlot";

const LOADING_LABEL = "Loading";

/**
 * Variable representing a text input component with various properties and functionalities.
 * @typedef  Text
 * @property invalid - Indicates if the input value is invalid.
 * @property incorrect - Indicates if the input value is incorrect.
 * @property value - The current value of the input.
 * @property disabled - Indicates if the input is disabled.
 * @property readonly - Indicates if the input is read-only.
 * @property description - The description of the input.
 * @property title - The title of the input.
 * @property leadingIcon - The leading icon of the input.
 * @property trailingIcon - The trailing icon of the input.
 * @property leadingIconPress - The press event handler for the leading icon.
 * @property trailingIconPress - The press event handler for the trailing icon.
 * @property inputMultiline - The number of rows for a multiline input. Defaults to 1.
 * @property placeholder - The placeholder text for the input.
 * @property dirty - Indicates if the input value has been changed.
 * @property loading - Indicates if the input is currently loading.
 * @property onChange - The change event handler for the input.
 */
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
      value={loading ? LOADING_LABEL : value}
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
