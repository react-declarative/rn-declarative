import * as React from "react";

import Radio from '../../../components/One/slots/RadioSlot';

import makeField from "../components/makeField";

import IField from "../../../model/IField";
import IAnything from "../../../model/IAnything";
import IManaged, { PickProp } from "../../../model/IManaged";

/**
 * Interface for defining props of a radio field component.
 * @template Data - The data type.
 * @template Payload - The payload type.
 */
export interface IRadioFieldProps<Data = IAnything, Payload = IAnything> {
  /**
   * Type definition for the "title" property of an object.
   * It is a generic type that picks the "title" property from a given object type.
   *
   * @template IField - The object type from which to pick the "title" property.
   * @template Data - The data type of the object.
   * @template Payload - The payload type of the object.
   */
  title?: PickProp<IField<Data, Payload>, "title">;
  /**
   * Retrieves the 'description' property from the given variable.
   *
   * @template T - The type of the variable.
   * @template K - The key to pick from the variable.
   *
   * @param variable - The variable to pick the property from.
   *
   * @returns - The picked property.
   */
  description?: PickProp<IField<Data, Payload>, 'description'>;
  /**
   * Represents the radio value of a field.
   *
   * @typedef RadioValue
   */
  radioValue?: PickProp<IField<Data, Payload>, "radioValue">;
  /**
   * Type definition for the "readonly" property of a field.
   *
   * @typedef ReadonlyProp
   *
   * @description
   * This property represents the "readonly" attribute of a field.
   * It is used to indicate whether a field is read-only or not.
   *
   * The value of this property is derived from the "IField" interface
   * in the "Data" module and the "Payload" type.
   */
  readonly?: PickProp<IField<Data, Payload>, "readonly">;
  /**
   * Represents the 'disabled' property of a field.
   *
   * The 'disabled' property determines whether a field is disabled or not. If set to true, the field will be disabled
   * and the user will not be able to interact with it.
   *
   * @template Data The type of data passed to the field.
   * @template Payload The type of payload received by the field.
   * @typedef PickProp
   */
  disabled?: PickProp<IField<Data, Payload>, "disabled">;
}

/**
 * Represents a private interface for a radio field.
 *
 * @template Data - the type of data the radio field manages
 */
export interface IRadioFieldPrivate<Data = IAnything> {
  value: PickProp<IManaged<Data>, "value">;
  onChange: PickProp<IManaged<Data>, "onChange">;
  name?: PickProp<IManaged<Data>, 'name'>;
  invalid: PickProp<IManaged<Data>, "invalid">;
  dirty: PickProp<IManaged<Data>, "dirty">;
  incorrect: PickProp<IManaged<Data>, "incorrect">;
  testId: PickProp<IManaged<Data>, 'testId'>;
  onFocus: PickProp<IManaged<Data>, 'onFocus'>;
  onBlur: PickProp<IManaged<Data>, 'onBlur'>;
  isPhone: PickProp<IManaged<Data>, 'isPhone'>;
  isTablet: PickProp<IManaged<Data>, 'isTablet'>;
  isDesktop: PickProp<IManaged<Data>, 'isDesktop'>;
}

/**
 * RadioField component renders a radio input field with a label.
 *
 * @param props - The props object containing the following properties:
 * @param props.disabled - Determines whether the radio input field is disabled or not.
 * @param props.value - The value for the radio input field.
 * @param props.onChange - The callback function to be called when the value of the radio input field changes.
 * @param props.title - The title/label for the radio input field.
 * @param props.radioValue - The value associated with the radio input field.
 * @param [props.name=''] - The name attribute for the radio input field.
 *
 * @returns - The rendered RadioField component.
 */
export const RadioField = ({
  disabled,
  value,
  onChange,
  title,
  description,
  radioValue,
  readonly,
  name = '',
  testId,
  invalid,
  incorrect,
  dirty,
  onFocus,
  onBlur,
  isPhone,
  isTablet,
  isDesktop,
}: IRadioFieldProps & IRadioFieldPrivate) => (
  <Radio
    value={value}
    disabled={disabled}
    onChange={onChange}
    title={title}
    readonly={readonly}
    radioValue={radioValue}
    description={description}
    onFocus={onFocus}
    onBlur={onBlur}
    dirty={dirty}
    name={name}
    invalid={invalid}
    incorrect={incorrect}
    testId={testId}
    isPhone={isPhone}
    isTablet={isTablet}
    isDesktop={isDesktop}
  />
);

RadioField.displayName = 'RadioField';

export default makeField(RadioField, {
  withApplyQueue: true,
  skipDebounce: true,
  skipDirtyPressListener: true,
});
