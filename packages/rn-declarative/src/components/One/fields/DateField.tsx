import * as React from "react";

import Date from '../../../components/One/slots/DateSlot';

import makeField from "../components/makeField";

import IField from "../../../model/IField";
import IAnything from "../../../model/IAnything";
import IManaged, { PickProp } from "../../../model/IManaged";

/**
 * Represents the properties of a date field component.
 *
 * @template Data - The type of data associated with the field.
 * @template Payload - The type of payload associated with the field.
 */
export interface IDateFieldProps<Data = IAnything, Payload = IAnything> {
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
   * @template K - The keys of the object.
   * @param obj - The object from which to retrieve the property value.
   * @param key - The key of the property to retrieve.
   * @returns - The value of the "title" property.
   */
  title?: PickProp<IField<Data, Payload>, "title">;
  /**
   * Retrieves the "description" property from a given object of type IField<Data, Payload>.
   * @param field - The input field object.
   * @returns - The value of the "description" property.
   */
  description?: PickProp<IField<Data, Payload>, "description">;
  /**
   * Represents the `placeholder` property of a field.
   *
   * @template Data - The type of the field's data.
   * @template Payload - The type of the field's payload.
   * @template Prop - The specific property of the field.
   *
   */
  placeholder?: PickProp<IField<Data, Payload>, "placeholder">;
  /**
   * Retrieves the value of the readonly property from a given field object.
   *
   * @template Data - The data type of the field.
   * @template Payload - The payload that may be associated with the field.
   * @param field - The field object from which to retrieve the readonly property.
   * @returns - The value of the readonly property, or undefined if the property is not present.
   */
  readonly?: PickProp<IField<Data, Payload>, "readonly">;
  /**
   * Represents the `disabled` property of a field.
   *
   * @typedef DisabledField
   */
  disabled?: PickProp<IField<Data, Payload>, "disabled">;
}

/**
 * Represents a private interface for a date field.
 * @template Data - The type of data managed by the field.
 */
export interface IDateFieldPrivate<Data = IAnything> {
  onChange: PickProp<IManaged<Data>, "onChange">;
  invalid: PickProp<IManaged<Data>, "invalid">;
  incorrect: PickProp<IManaged<Data>, "incorrect">;
  value: PickProp<IManaged<Data>, "value">;
  disabled: PickProp<IManaged<Data>, "disabled">;
  dirty: PickProp<IManaged<Data>, "dirty">;
  name: PickProp<IManaged<Data>, "name">;
}

/**
 * Represents a DateField component.
 *
 * @typedef DateField
 * @param invalid - Specifies whether the date field is invalid.
 * @param incorrect - Specifies whether the date field has an incorrect value.
 * @param value - The value of the date field.
 * @param disabled - Specifies whether the date field is disabled.
 * @param readonly - Specifies whether the date field is readonly.
 * @param description - The description of the date field.
 * @param outlined - Specifies whether the date field is outlined.
 * @param title - The title of the date field.
 * @param placeholder - The placeholder of the date field.
 * @param labelShrink - Specifies whether the label should shrink when the date field value is not empty.
 * @param dirty - Specifies whether the date field has been modified.
 * @param autoFocus - Specifies whether the date field should automatically receive focus.
 * @param inputRef - A ref for the date field input element.
 * @param onChange - The event handler for when the value of the date field changes.
 * @param withContextMenu - Specifies whether the date field should have a context menu.
 * @param name - The name of the date field.
 * @return - The Date component with the specified props.
 */
export const DateField = ({
  invalid,
  incorrect,
  value,
  disabled,
  readonly,
  description = "",
  title = "",
  placeholder = title,
  dirty,
  onChange,
  name,
}: IDateFieldPrivate & IDateFieldProps) => (
  <Date
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
  />
);

DateField.displayName = 'DateField';

export default makeField(DateField, {
  withApplyQueue: true,
  skipDebounce: true,
  skipDirtyPressListener: true,
  skipFocusBlurCall: true,
});
