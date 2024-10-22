import * as React from 'react';

import CheckBox from '../../../components/One/slots/CheckBoxSlot';

import makeField from "../components/makeField";

import IManaged, { PickProp } from '../../../model/IManaged';
import IAnything from '../../../model/IAnything';
import IField from '../../../model/IField';

/**
 * Interface representing props for the CheckboxField component.
 *
 * @template Data - The type of data for the field.
 * @template Payload - The type of payload for the field.
 */
export interface ICheckboxFieldProps<Data = IAnything, Payload = IAnything> {
  /**
   * Retrieves the 'title' property from the given variable.
   *
   * @template T - The type of the variable.
   * @template K - The key to pick from the variable.
   *
   * @param variable - The variable to pick the property from.
   *
   * @returns - The picked property.
   */
  title?: PickProp<IField<Data, Payload>, 'title'>;
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
   * Retrieves the value of the 'readonly' property from the given object.
   *
   * @template Data - The type of data stored in the field.
   * @template Payload - The type of payload used in the field.
   * @template T - The type of the field object.
   *
   * @param field - The field object.
   *
   * @returns
   * The value of the 'readonly' property from the field object.
   */
  readonly?: PickProp<IField<Data, Payload>, "readonly">;
  /**
   * Represents the "disabled" property of a field in the given data payload.
   *
   * @template Data - The type of the data payload.
   * @template Payload - The type of the payload object.
   *
   * @param disabled - The value of the "disabled" property.
   *
   * @returns
   */
  disabled?: PickProp<IField<Data, Payload>, "disabled">;
}

/**
 * Represents a private interface for a Checkbox field.
 * @interface
 * @template Data - The type of data associated with the Checkbox field.
 */
export interface ICheckboxFieldPrivate<Data = IAnything>  {
  value: PickProp<IManaged<Data>, 'value'>;
  name: PickProp<IManaged<Data>, "name">;
  invalid: PickProp<IManaged<Data>, "invalid">;
  incorrect: PickProp<IManaged<Data>, "incorrect">;
  testId: PickProp<IManaged<Data>, 'testId'>;
  dirty: PickProp<IManaged<Data>, "dirty">;
  onChange: PickProp<IManaged<Data>, 'onChange'>;
  onFocus: PickProp<IManaged<Data>, 'onFocus'>;
  onBlur: PickProp<IManaged<Data>, 'onBlur'>;
  isPhone: PickProp<IManaged<Data>, 'isPhone'>;
  isTablet: PickProp<IManaged<Data>, 'isTablet'>;
  isDesktop: PickProp<IManaged<Data>, 'isDesktop'>;
}

/**
 * Represents a checkbox field component.
 *
 * @param param - The properties for the checkbox field.
 * @returns - The checkbox field component.
 */
export const CheckboxField = ({
  disabled,
  value,
  readonly,
  onChange,
  title,
  description,
  name,
  invalid,
  incorrect,
  testId,
  dirty,
  onFocus,
  onBlur,
  isPhone,
  isTablet,
  isDesktop,
}: ICheckboxFieldProps & ICheckboxFieldPrivate) => (
  <CheckBox
    disabled={disabled}
    value={value}
    dirty={dirty}
    readonly={readonly}
    name={name}
    invalid={invalid}
    incorrect={incorrect}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    title={title}
    description={description}
    testId={testId}
    isPhone={isPhone}
    isTablet={isTablet}
    isDesktop={isDesktop}
  />
);

CheckboxField.displayName = 'CheckboxField';

export default makeField(CheckboxField, {
  withApplyQueue: true,
  skipDebounce: true,
  skipDirtyPressListener: true,
});
