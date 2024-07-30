import * as React from "react";

import Text from '../../../components/One/slots/TextSlot';

import makeField from "../components/makeField";

import IManaged, { PickProp } from "../../../model/IManaged";
import IAnything from "../../../model/IAnything";
import IField from "../../../model/IField";

/**
 * Represents the properties for a text field component.
 *
 * @template Data - The type of data associated with the field.
 * @template Payload - The type of payload associated with the field.
 */
export interface ITextFieldProps<Data = IAnything, Payload = IAnything> {
  /**
   * Validation factory config
   *
   * @template IField - Type representing the field object.
   * @template Data - Type representing the data object.
   * @template Payload - Type representing the payload object.
   * 
   * @returns The value of the "validation" property.
   */
  validation?: PickProp<IField<Data, Payload>, 'validation'>;
  /**
   * Returns the "description" property value of the given field object.
   *
   * @template IField - The type of the field object.
   * @template Data - The type of the data associated with the field.
   * @template Payload - The type of the payload object associated with the field.
   *
   * @param field - The field object from which to retrieve the "description" property.
   *
   * @returns The value of the "description" property.
   */
  description?: PickProp<IField<Data, Payload>, "description">;
  /**
   * Type definition for the `title` property of an object.
   *
   * @template T - The type of the object from which to pick the property.
   * @template K - The literal type of the property name to pick.
   *
   * @typeparam T - The type of the object from which to pick the property.
   * @typeparam K - The literal type of the property name to pick.
   *
   * @param obj - The object from which to pick the property.
   *
   * @returns the value of the picked property.
   */
  title?: PickProp<IField<Data, Payload>, "title">;
  /**
   * The leadingIcon property represents the leading icon of a field.
   *
   * @typedef leadingIcon
   * @property [icon] - The icon to be displayed as the leading icon.
   * @property [isVisible] - Indicates if the leading icon is visible.
   */
  leadingIcon?: PickProp<IField<Data, Payload>, "leadingIcon">;
  /**
   * Represents the trailing icon configuration for a field.
   *
   * @typedef trailingIcon
   * @property icon - The path or class name of the trailing icon.
   * @property isVisible - Indicates whether the trailing icon is visible or hidden.
   * @property onPress - The event handler function to be executed when the trailing icon is pressed.
   */
  trailingIcon?: PickProp<IField<Data, Payload>, "trailingIcon">;
  /**
   * Represents the leading icon press event handler for a field in a form.
   *
   * @typedef leadingIconPress
   * @param leadingIconPress - The leadingIconPress prop of the field.
   * @returns - Nothing is returned from this function.
   */
  leadingIconPress?: PickProp<IField<Data, Payload>, "leadingIconPress">;
  /**
   * The `trailingIconPress` property is an optional property
   * that represents a callback function to be executed when
   * the trailing icon of a field is pressed.
   *
   * This property is of type `PickProp<IField<Data, Payload>, "trailingIconPress">`,
   * where `IField<Data, Payload>` is a generic type representing a field with
   * `Data` and `Payload` types.
   *
   * @typedef trailingIconPress
   *
   * @param args - The arguments passed to the callback function.
   * @returns
   */
  trailingIconPress?: PickProp<IField<Data, Payload>, "trailingIconPress">;
  /**
   * Represents the number of input rows required for a field.
   *
   * @typedef inputMultiline
   */
  inputMultiline?: PickProp<IField<Data, Payload>, "inputMultiline">;
  /**
   * A type definition representing the `placeholder` property of a given field.
   *
   * @template Data - The type of the field data.
   * @template Payload - The type of the payload for the field.
   * @template T - The type of the field.
   *
   * @typedef T
   */
  placeholder?: PickProp<IField<Data, Payload>, "placeholder">;
  /**
   * Gets the value of the "readonly" property from the provided object.
   *
   * @template T - The type of the object that contains the "readonly" property.
   * @template Prop - The type of the "readonly" property.
   * @param object - The object to get the "readonly" property from.
   * @returns - The value of the "readonly" property.
   */
  readonly?: PickProp<IField<Data, Payload>, "readonly">;
  /**
   * Represents the `disabled` property of a field in a form.
   *
   * @typedef Disabled
   */
  disabled?: PickProp<IField<Data, Payload>, "disabled">;
}

/**
 * Represents a private interface for an input field.
 *
 * @template Data - The type of data managed by the input field.
 */
export interface ITextFieldPrivate<Data = IAnything> {
  onChange: PickProp<IManaged<Data>, "onChange">;
  invalid: PickProp<IManaged<Data>, "invalid">;
  incorrect: PickProp<IManaged<Data>, "incorrect">;
  value: PickProp<IManaged<Data>, "value">;
  loading: PickProp<IManaged<Data>, "loading">;
  disabled: PickProp<IManaged<Data>, "disabled">;
  dirty: PickProp<IManaged<Data>, "dirty">;
  name: PickProp<IManaged<Data>, "name">;
  testId: PickProp<IManaged<Data>, 'testId'>;
  onFocus: PickProp<IManaged<Data>, 'onFocus'>;
  onBlur: PickProp<IManaged<Data>, 'onBlur'>;
}

/**
 * TextField component
 *
 * @typedef TextField
 * @param invalid - Indicates if the input value is invalid
 * @param incorrect - Indicates if the input value is incorrect
 * @param value - The current value of the input field
 * @param disabled - Indicates if the input field is disabled
 * @param readonly - Indicates if the input field is read-only
 * @param description - The description or helper text for the input field
 * @param title - The title or tooltip for the input field
 * @param leadingIcon - The icon component to display at the start of the input field
 * @param trailingIcon - The icon component to display at the end of the input field
 * @param leadingIconPress - The function to call when the leading icon is pressed
 * @param trailingIconPress - The function to call when the trailing icon is pressed
 * @param inputMultiline - The number of rows for a textarea input field (default: 1)
 * @param placeholder - The placeholder text for the input field
 * @param inputAutocomplete - The autocomplete behavior for the input field (default: "off")
 * @param inputFormatter - A function used to format the input value
 * @param inputFormatterSymbol - The symbol or character used in the input formatter
 * @param inputFormatterAllowed - The list of allowed characters in the input formatter
 * @param inputFormatterTemplate - A template string used in the input formatter
 * @param dirty - Indicates if the input value has been modified
 * @param loading - Indicates if the input field is in a loading state
 * @param onChange - The function to call when the input value changes
 * @param name - The name of the input field
 * @returns - The TextField component
 */
export const TextField = ({
  invalid,
  incorrect,
  value,
  disabled,
  readonly,
  description = "",
  title = "",
  leadingIcon,
  trailingIcon,
  leadingIconPress,
  trailingIconPress,
  inputMultiline = false,
  placeholder = "",
  testId,
  dirty,
  loading,
  onChange,
  name,
  onFocus,
  onBlur,
}: ITextFieldProps & ITextFieldPrivate) => (
  <Text
    invalid={invalid}
    incorrect={incorrect}
    value={value}
    readonly={readonly}
    disabled={disabled}
    description={description}
    title={title}
    leadingIcon={leadingIcon}
    trailingIcon={trailingIcon}
    leadingIconPress={leadingIconPress}
    trailingIconPress={trailingIconPress}
    inputMultiline={inputMultiline}
    placeholder={placeholder}
    dirty={dirty}
    loading={loading}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    testId={testId}
    name={name}
  />
);

TextField.displayName = 'TextField';

export default makeField(TextField);
