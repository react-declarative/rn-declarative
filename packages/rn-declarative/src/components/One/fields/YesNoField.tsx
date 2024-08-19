import * as React from "react";

import YesNo from "../../../components/One/slots/YesNoSlot";

import makeField from "../components/makeField";

import IManaged, { PickProp } from "../../../model/IManaged";
import IAnything from "../../../model/IAnything";
import IField from "../../../model/IField";

/**
 * Interface representing the props for the YesNoField component.
 *
 * @template Data - The type of the data.
 * @template Payload - The type of the payload.
 */
export interface IYesNoFieldProps<Data = IAnything, Payload = IAnything> {
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
   * Picks the "description" property from a given object of type IField<Data, Payload>.
   *
   * @template Data - The type of the data associated with the field.
   * @template Payload - The type of the payload associated with the field.
   * @param field - The field object from which to pick the "description" property.
   * @returns - The picked "description" property.
   */
  description?: PickProp<IField<Data, Payload>, "description">;
  /**
   * Retrieves the "placeholder" property of the provided PickProp type, which is a property value of type string.
   *
   * @template Data - The type of data associated with the field.
   * @template Payload - The type of payload associated with the field.
   * @template T - The type of the input object from which to pick the property.
   * @template K - The type of the property to be picked.
   * @param obj - The input object from which to pick the property.
   * @param prop - The property to be picked from the input object.
   * @returns The value of the "placeholder" property of the provided PickProp type.
   */
  placeholder?: PickProp<IField<Data, Payload>, "placeholder">;
  /**
   * Represents an optional property "noDeselect" of a PickProp object.
   *
   * @template T - The type of the field.
   * @template K - The key of the property to be picked.
   * @template P - The type of the value of the picked property.
   *
   * @typedef PickPropWithType
   * @prop {P} noDeselect - The value of the "noDeselect" property.
   *
   * @typedef IField
   * @typedef Payload
   *
   * @typedef PickProp
   *
   * @typedef noDeselect
   */
  noDeselect?: PickProp<IField<Data, Payload>, "noDeselect">;
  /**
   * Represents the "tr" property of an object.
   *
   * @typeparam IField - Represents the object type containing the "tr" property.
   * @typedef tr
   */
  tr?: PickProp<IField<Data, Payload>, "tr">;
  /**
   * Represents the 'readonly' property of an object, extracted using the 'PickProp' utility type.
   *
   * @template Data - The type of data contained in the 'IField' object.
   * @template Payload - The type of payload contained in the 'IField' object.
   *
   * @param readonly - The value of the 'readonly' property.
   *
   * @returns - This function does not return a value.
   */
  readonly?: PickProp<IField<Data, Payload>, "readonly">;
  /**
   * Represents the `disabled` property of a field object.
   *
   * @typedef disabled
   *
   * @template Data - The type of data associated with the field.
   * @template Payload - The type of payload associated with the field.
   *
   * @property disabled - A boolean value indicating whether the field is disabled or not.
   *                                `true` represents that the field is disabled, while `false` indicates it is enabled.
   */
  disabled?: PickProp<IField<Data, Payload>, "disabled">;
  /**
   * Returns the value of the "title" property from an object of type IField<Data, Payload>.
   *
   * @template Data - The type of the data object.
   * @template Payload - The type of the payload object.
   * @template T - The type of the object containing the "title" property.
   *
   * @param object - The object from which to pick the "title" property.
   *
   * @returns - The value of the "title" property.
   */
  title?: PickProp<IField<Data, Payload>, "title">;
}

/**
 * Represents a private interface for a Yes/No field
 * @template Data - The data type associated with the field
 */
export interface IYesNoFieldPrivate<Data = IAnything>  {
  value: PickProp<IManaged<Data>, "value">;
  name: PickProp<IManaged<Data>, "name">;
  readonly: PickProp<IManaged<Data>, "readonly">;
  onChange: PickProp<IManaged<Data>, "onChange">;
  dirty: PickProp<IManaged<Data>, "dirty">;
  invalid: PickProp<IManaged<Data>, "invalid">;
  incorrect: PickProp<IManaged<Data>, "incorrect">;
  testId: PickProp<IManaged<Data>, 'testId'>;
  onFocus: PickProp<IManaged<Data>, 'onFocus'>;
  onBlur: PickProp<IManaged<Data>, 'onBlur'>;
  isPhone: PickProp<IManaged<Data>, 'isPhone'>;
  isTablet: PickProp<IManaged<Data>, 'isTablet'>;
  isDesktop: PickProp<IManaged<Data>, 'isDesktop'>;
}

/**
 * Represents a Yes/No field component.
 *
 * @param props - The properties of the Yes/No field component.
 * @param props.value - The current value of the field.
 * @param props.disabled - Determines if the field is disabled.
 * @param props.readonly - Determines if the field is read-only.
 * @param props.description - The description or tooltip text for the field.
 * @param props.placeholder - The text to display when the field is empty.
 * @param props.noDeselect - Determines if the field allows deselecting the value.
 * @param props.title - The title attribute of the field.
 * @param props.tr - The translate map function
 * @param props.dirty - Determines if the field has been modified.
 * @param props.invalid - Determines if the field is in an invalid state.
 * @param props.incorrect - Determines if the field has an incorrect value.
 * @param props.onChange - The function to call when the field's value changes.
 *
 * @returns - The Yes/No field component.
 */
export const YesNoField = ({
  value,
  disabled,
  readonly,
  description = "",
  placeholder = "",
  noDeselect,
  title = "",
  tr,
  name,
  testId,
  dirty,
  invalid,
  incorrect,
  isPhone,
  isTablet,
  isDesktop,
  onChange,
  onFocus,
  onBlur,
}: IYesNoFieldProps & IYesNoFieldPrivate) => (
  <YesNo
    value={value}
    name={name}
    disabled={disabled}
    readonly={readonly}
    description={description}
    placeholder={placeholder}
    noDeselect={noDeselect}
    tr={tr}
    title={title}
    dirty={dirty}
    invalid={invalid}
    incorrect={incorrect}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    testId={testId}
    isPhone={isPhone}
    isTablet={isTablet}
    isDesktop={isDesktop}
  />
);

YesNoField.displayName = "YesNoField";

export default makeField(YesNoField, {
  withApplyQueue: true,
  skipDebounce: true,
  skipDirtyPressListener: true,
});
