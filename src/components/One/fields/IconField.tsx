import * as React from 'react';

import Icon from '../../../components/One/slots/IconSlot';

import makeField from "../components/makeField";

import IManaged, { PickProp } from '../../../model/IManaged';
import IAnything from '../../../model/IAnything';
import IField from '../../../model/IField';

/**
 * Interface representing props for the IconField component.
 *
 * @template Data - The type of data for the field.
 * @template Payload - The type of payload for the field.
 */
export interface IIconFieldProps<Data = IAnything, Payload = IAnything> {
  /**
   * Retrieves the 'iconSize' property from the given variable.
   *
   * @template T - The type of the variable.
   * @template K - The key to pick from the variable.
   *
   * @param variable - The variable to pick the property from.
   *
   * @returns - The picked property.
   */
  iconSize?: PickProp<IField<Data, Payload>, 'iconSize'>;

  /**
   * Retrieves the 'iconColor' property from the given variable.
   *
   * @template T - The type of the variable.
   * @template K - The key to pick from the variable.
   *
   * @param variable - The variable to pick the property from.
   *
   * @returns - The picked property.
   */
  iconColor?: PickProp<IField<Data, Payload>, 'iconColor'>;

  /**
   * Retrieves the 'iconBackground' property from the given variable.
   *
   * @template T - The type of the variable.
   * @template K - The key to pick from the variable.
   *
   * @param variable - The variable to pick the property from.
   *
   * @returns - The picked property.
   */
  iconBackground?: PickProp<IField<Data, Payload>, 'iconBackground'>;

  /**
   * Retrieves the 'icon' property from the given variable.
   *
   * @template T - The type of the variable.
   * @template K - The key to pick from the variable.
   *
   * @param variable - The variable to pick the property from.
   *
   * @returns - The picked property.
   */
  icon?: PickProp<IField<Data, Payload>, 'icon'>;
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
 * Represents a private interface for a Icon field.
 * @interface
 * @template Data - The type of data associated with the Icon field.
 */
export interface IIconFieldPrivate<Data = IAnything> {
  press: PickProp<IManaged<Data>, 'press'>;
  onFocus: PickProp<IManaged<Data>, 'onFocus'>;
  onBlur: PickProp<IManaged<Data>, 'onBlur'>;
}

/**
 * Represents a icon field component.
 *
 * @param param - The properties for the icon field.
 * @returns - The icon field component.
 */
export const IconField = ({
  disabled,
  press,
  icon,
  iconSize,
  iconColor,
  iconBackground,
  onFocus,
  onBlur,
}: IIconFieldProps & IIconFieldPrivate) => (
  <Icon
    iconSize={iconSize}
    iconColor={iconColor}
    iconBackground={iconBackground}
    press={press}
    disabled={disabled}
    icon={icon}
    onFocus={onFocus}
    onBlur={onBlur}
  />
);

IconField.displayName = 'IconField';

export default makeField(IconField, {
  skipPressListener: true,
  withApplyQueue: true,
  skipDebounce: true,
  skipDirtyPressListener: true,
});
