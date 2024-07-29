import * as React from "react";

import { Input } from '@ui-kitten/components';

import { useOnePayload } from "../../../context/PayloadProvider";
import { useOneState } from "../../../context/StateProvider";

import { ITextSlot } from "../../../slots/TextSlot";
import { TouchableOpacity, View } from "react-native";

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
 * @property leadingIconRipple - Indicates if the leading icon should have a ripple effect. Defaults to true.
 * @property trailingIconRipple - Indicates if the trailing icon should have a ripple effect. Defaults to true.
 * @property inputMultiline - The number of rows for a multiline input. Defaults to 1.
 * @property placeholder - The placeholder text for the input.
 * @property inputAutocomplete - The autocomplete attribute for the input. Defaults to "off".
 * @property inputFormatterSymbol - The symbol used for formatting the input. Defaults to "0".
 * @property inputFormatterAllowed - An array of characters that are allowed in the formatted input.
 * @property inputFormatterReplace - An array of characters that should be replaced in the formatted input.
 * @property inputFormatterTemplate - The template for formatting the input.
 * @property inputFormatter - A formatter function for the input value.
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
  leadingIconRipple: lir = true,
  trailingIconRipple: tir = true,
  inputMultiline = false,
  placeholder = "",
  dirty,
  loading,
  onChange,
}: ITextSlot) => {
  const payload = useOnePayload();
  const { object, changeObject: handleChange } = useOneState<object>();

  return (
    <Input
      multiline={inputMultiline}
      accessoryRight={TrailingIcon ? (
        <TouchableOpacity onPress={() => tic && tic(value, object, payload, onChange, handleChange)}>
          <TrailingIcon />
        </TouchableOpacity >
      ) : undefined}
      accessoryLeft={LeadingIcon ? (
        <TouchableOpacity onPress={() => lic && lic(value, object, payload, onChange, handleChange)}>
          <LeadingIcon />
        </TouchableOpacity>
      ) : undefined}
    />
  );
};

export default Text;
