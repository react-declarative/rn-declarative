import * as React from "react";

import Time from '../../../components/One/slots/TimeSlot';

import makeField from "../components/makeField";

import IField from "../../../model/IField";
import IAnything from "../../../model/IAnything";
import IManaged, { PickProp } from "../../../model/IManaged";

/**
 * A set of properties for the `TimeField` component.
 *
 * @template Data - The type of data expected to be stored in the field.
 * @template Payload - The type of payload expected to be returned on field change.
 */
export interface ITimeFieldProps<Data = IAnything, Payload = IAnything> {
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
   * Retrieves the value of the "title" property from the given object.
   *
   * @template T - The type of the object.
   * @template K - The key of the property to be picked.
   * @param obj - The object from which to pick the property.
   * @param key - The key of the property to pick.
   * @returns - The value of the picked property.
   */
  title?: PickProp<IField<Data, Payload>, "title">;
  /**
   * Returns the "description" property value of the given object.
   * The object must be of type IField<Data, Payload>.
   *
   * @param object - The object to pick the "description" property from.
   * @returns - The value of the "description" property.
   */
  description?: PickProp<IField<Data, Payload>, "description">;
  /**
   * Retrieves the `placeholder` property from an object `IField<Data, Payload>`.
   *
   * @template Data - The type of data for the field.
   * @template Payload - The type of payload.
   *
   * @param field - The field object from which to retrieve the `placeholder` property.
   *
   * @returns - The `placeholder` property of the field object.
   */
  placeholder?: PickProp<IField<Data, Payload>, "placeholder">;
  /**
   * Retrieves the value of the "readonly" property from a given object that has a specific structure.
   *
   * @param field - The input object with a specific structure.
   * @returns The value of the "readonly" property from the input object.
   */
  readonly?: PickProp<IField<Data, Payload>, "readonly">;
  /**
   * Retrieves the "disabled" property from an object of type `IField<Data, Payload>`.
   *
   * @template Data - The type of data associated with the field.
   * @template Payload - The type of payload associated with the field.
   * @param disabled - The object from which to retrieve the "disabled" property.
   * @returns - The value of the "disabled" property.
   */
  disabled?: PickProp<IField<Data, Payload>, "disabled">;
}

/**
 * Represents a private interface for the TimeField component.
 *
 * @template Data The type of data associated with the TimeField component.
 */
export interface ITimeFieldPrivate<Data = IAnything> {
  onChange: PickProp<IManaged<Data>, "onChange">;
  invalid: PickProp<IManaged<Data>, "invalid">;
  incorrect: PickProp<IManaged<Data>, "incorrect">;
  value: PickProp<IManaged<Data>, "value">;
  disabled: PickProp<IManaged<Data>, "disabled">;
  dirty: PickProp<IManaged<Data>, "dirty">;
  name: PickProp<IManaged<Data>, "name">;
  isPhone: PickProp<IManaged<Data>, 'isPhone'>;
  isTablet: PickProp<IManaged<Data>, 'isTablet'>;
  isDesktop: PickProp<IManaged<Data>, 'isDesktop'>;
}

/**
 * Represents a TimeField component.
 * @param TimeField - The TimeField component.
 * @param invalid - Determines if the field is invalid.
 * @param incorrect - Determines if the field has an incorrect value.
 * @param value - The current value of the field.
 * @param disabled - Determines if the field is disabled.
 * @param readonly - Determines if the field is readonly.
 * @param labelShrink - Determines if the label should shrink when the field has a value.
 * @param description - The description of the field.
 * @param outlined - Determines if the field should be outlined.
 * @param title - The title attribute of the field.
 * @param placeholder - The placeholder attribute of the field.
 * @param dirty - Determines if the field's value has changed.
 * @param autoFocus - Determines if the field should be focused automatically.
 * @param inputRef - The ref of the input element.
 * @param onChange - The event handler for the change event.
 * @param name - The name attribute of the field.
 * @param withContextMenu - Determines if the field should have a context menu.
 * @returns - The rendered TimeField component.
 */
export const TimeField = ({
  invalid,
  incorrect,
  value,
  disabled,
  readonly,
  description = "",
  title = "",
  placeholder = title,
  dirty,
  isPhone,
  isTablet,
  isDesktop,
  onChange,
  name,
}: ITimeFieldPrivate & ITimeFieldProps) => (
  <Time
    invalid={invalid}
    incorrect={incorrect}
    value={value}
    readonly={readonly}
    disabled={disabled}
    description={description}
    title={title}
    placeholder={placeholder}
    dirty={dirty}
    onChange={onChange}
    name={name}
    isPhone={isPhone}
    isTablet={isTablet}
    isDesktop={isDesktop}
  />
);

TimeField.displayName = 'TimeField';

export default makeField(TimeField, {
  withApplyQueue: true,
  skipDebounce: true,
  skipDirtyPressListener: true,
  skipFocusBlurCall: true,
});
