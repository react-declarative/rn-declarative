import * as React from 'react';

import Button from '../../../components/One/slots/ButtonSlot';

import makeField from "../components/makeField";

import IManaged, { PickProp } from '../../../model/IManaged';
import IAnything from '../../../model/IAnything';
import IField from '../../../model/IField';

/**
 * Interface representing props for the ButtonField component.
 *
 * @template Data - The type of data for the field.
 * @template Payload - The type of payload for the field.
 */
export interface IButtonFieldProps<Data = IAnything, Payload = IAnything> {
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
   * Retrieves the 'placeholder' property from the given variable.
   *
   * @template T - The type of the variable.
   * @template K - The key to pick from the variable.
   *
   * @param variable - The variable to pick the property from.
   *
   * @returns - The picked property.
   */
  placeholder?: PickProp<IField<Data, Payload>, 'placeholder'>;
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
  /**
   * Retrieves the 'buttonVariant' property from the given variable.
   *
   * @template T - The type of the variable.
   * @template K - The key to pick from the variable.
   *
   * @param variable - The variable to pick the property from.
   *
   * @returns - The picked property.
   */
  buttonVariant?: PickProp<IField<Data, Payload>, 'buttonVariant'>;
}

/**
 * Represents a private interface for a Button field.
 * @interface
 * @template Data - The type of data associated with the Button field.
 */
export interface IButtonFieldPrivate<Data = IAnything> {
  value: PickProp<IManaged<Data>, 'value'>;
  press: PickProp<IManaged<Data>, 'press'>;
  testId: PickProp<IManaged<Data>, 'testId'>;
  onFocus: PickProp<IManaged<Data>, 'onFocus'>;
  onBlur: PickProp<IManaged<Data>, 'onBlur'>;
  isPhone: PickProp<IManaged<Data>, 'isPhone'>;
  isTablet: PickProp<IManaged<Data>, 'isTablet'>;
  isDesktop: PickProp<IManaged<Data>, 'isDesktop'>;
}

/**
 * Represents a button field component.
 *
 * @param param - The properties for the button field.
 * @returns - The button field component.
 */
export const ButtonField = ({
  disabled,
  press,
  title,
  value,
  placeholder,
  buttonVariant,
  testId,
  onFocus,
  onBlur,
  isPhone,
  isTablet,
  isDesktop,
}: IButtonFieldProps & IButtonFieldPrivate) => (
  <Button
    disabled={disabled}
    buttonVariant={buttonVariant}
    press={press}
    title={title}
    value={value}
    placeholder={placeholder}
    onFocus={onFocus}
    onBlur={onBlur}
    testId={testId}
    isPhone={isPhone}
    isTablet={isTablet}
    isDesktop={isDesktop}
  />
);

ButtonField.displayName = 'ButtonField';

export default makeField(ButtonField, {
  skipPressListener: true,
  withApplyQueue: true,
  skipDebounce: true,
  skipDirtyPressListener: true,
});
