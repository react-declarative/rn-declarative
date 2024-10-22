import * as React from 'react';

import Switch from '../../../components/One/slots/SwitchSlot';

import makeField from '../components/makeField';

import IManaged, { PickProp } from '../../../model/IManaged';
import IAnything from '../../../model/IAnything';
import IField from '../../../model/IField';

/**
 * Represents the properties for a switch field component.
 *
 * @template Data - The type of data for the field.
 * @template Payload - The type of payload for the field.
 */
export interface ISwitchFieldProps<Data = IAnything, Payload = IAnything>  {
  /**
   * Retrieves the value of the 'title' property from an object of type IField<Data, Payload>.
   *
   * @template Data - The type of the data contained in the field.
   * @template Payload - The type of the payload associated with the field.
   *
   * @param field - An object of type IField<Data, Payload>.
   *
   * @returns - The value of the 'title' property from the given field.
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
   * Represents the readonly property of an IField object.
   *
   * @typedef readonly?
   * @property [readonly] - Specifies whether the field is readonly or not.
   * @public
   */
  readonly?: PickProp<IField<Data, Payload>, "readonly">;
  /**
   * Represents the 'disabled' property of a field in a form.
   *
   * @template Data The data type associated with the form.
   * @template Payload The payload type associated with the form.
   * @typedef disabled
   */
  disabled?: PickProp<IField<Data, Payload>, "disabled">;
}

/**
 * Represents a private interface for a switch field.
 *
 * @template Data - The type of data associated with the switch field.
 */
export interface ISwitchFieldPrivate<Data = IAnything>  {
  onChange: PickProp<IManaged<Data>, 'onChange'>;
  value: PickProp<IManaged<Data>, 'value'>;
  testId: PickProp<IManaged<Data>, 'testId'>;
  name: PickProp<IManaged<Data>, "name">;
  invalid: PickProp<IManaged<Data>, "invalid">;
  dirty: PickProp<IManaged<Data>, "dirty">;
  incorrect: PickProp<IManaged<Data>, "incorrect">;
  onFocus: PickProp<IManaged<Data>, 'onFocus'>;
  onBlur: PickProp<IManaged<Data>, 'onBlur'>;
  isPhone: PickProp<IManaged<Data>, 'isPhone'>;
  isTablet: PickProp<IManaged<Data>, 'isTablet'>;
  isDesktop: PickProp<IManaged<Data>, 'isDesktop'>;
}

/**
 * Renders a Switch field component.
 *
 * @param props - The properties for the Switch field.
 * @param props.disabled - Indicates whether the Switch field is disabled.
 * @param props.value - The current value of the Switch field.
 * @param props.readonly - Indicates whether the Switch field is read-only.
 * @param props.onChange - The event handler for when the Switch field is changed.
 * @param props.switchNoColor - Indicates whether the Switch field has no color.
 * @param props.switchActiveLabel - The label for the active state of the Switch field.
 * @param props.title - The title of the Switch field.
 *
 * @returns A Switch component wrapped in a SwitchField component.
 */
export const SwitchField = ({
  disabled,
  value,
  readonly,
  onChange,
  title,
  description,
  testId,
  name,
  dirty,
  invalid,
  incorrect,
  isPhone,
  isTablet,
  isDesktop,
  onFocus,
  onBlur,
}: ISwitchFieldProps & ISwitchFieldPrivate) => (
  <Switch
    readonly={readonly}
    disabled={disabled}
    value={value}
    name={name}
    invalid={invalid}
    dirty={dirty}
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

SwitchField.displayName = 'SwitchField';

export default makeField(SwitchField, {
  withApplyQueue: true,
  skipDebounce: true,
  skipDirtyPressListener: true,
});
