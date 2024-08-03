import * as React from 'react';

import Slider from '../../../components/One/slots/SliderSlot';

import makeField from '../components/makeField';

import IField from '../../../model/IField';
import IAnything from '../../../model/IAnything';
import IManaged, { PickProp } from '../../../model/IManaged';

/**
 * Interface representing the properties of a Slider Field component.
 * @template Data - The data type used in the Field component.
 * @template Payload - The payload type used in the Field component.
 */
export interface ISliderFieldProps<Data = IAnything, Payload = IAnything>  {
  /**
   * Represents the configuration for a step slider field.
   *
   * @typedef stepSlider
   * @property [propertyName] - The name of the property for this step slider field.
   * @property [label] - The label to display for this step slider field.
   * @property [minValue] - The minimum value for the step slider.
   * @property [maxValue] - The maximum value for the step slider.
   * @property [step] - The step interval for the step slider.
   * @property [unit] - The unit of measurement for the step slider.
   */
  stepSlider?: PickProp<IField<Data, Payload>, 'stepSlider'>;
  /**
   * The maximum value for a slider in a field of a data object payload.
   *
   * @typedef maxSlider
   * @property [maxSlider] - The maximum value for the slider. If not provided, there is no maximum limit.
   */
  maxSlider?: PickProp<IField<Data, Payload>, 'maxSlider'>;
  /**
   * The minimum value for a slider in a field.
   *
   * @property [minSlider] - The minimum value for a slider. If undefined, there is no minimum value.
   */
  minSlider?: PickProp<IField<Data, Payload>, 'minSlider'>;
  /**
   * Specifies the format for the labels of a slider component.
   *
   * @typedef labelFormatSlider
   * @property [labelFormatSlider.format] - The format string for the labels.
   */
  labelFormatSlider?: PickProp<IField<Data, Payload>, 'labelFormatSlider'>;
  /**
   * Represents the leading icon of a field.
   *
   * @typedef leadingIcon
   */
  leadingIcon?: PickProp<IField<Data, Payload>, 'leadingIcon'>;
  /**
   * Sets the trailing icon of the field.
   *
   * @param trailingIcon - The trailing icon to be set for the field.
   */
  trailingIcon?: PickProp<IField<Data, Payload>, 'trailingIcon'>;
  /**
   * This variable represents an optional function called leadingIconPress, which is a property of the IField interface. It is picked from the PickProp type, using the 'leadingIconPress
   *' key.
   *
   * @typedef leadingIconPress
   */
  leadingIconPress?: PickProp<IField<Data, Payload>, 'leadingIconPress'>;
  /**
   * Represents the event handler for when the trailing icon of a field is clicked.
   * @typedef trailingIconPress
   */
  trailingIconPress?: PickProp<IField<Data, Payload>, 'trailingIconPress'>;
  /**
   * Retrieves the `readonly` property value from the provided object.
   *
   * @param obj - The object from which to retrieve the `readonly` property.
   * @returns - The value of the `readonly` property.
   */
  readonly?: PickProp<IField<Data, Payload>, "readonly">;
  /**
   * Represents the `disabled` property extracted from a field.
   *
   * @typedef DisabledValue
   */
  disabled?: PickProp<IField<Data, Payload>, "disabled">;
}

/**
 * Represents a private interface for a slider field component.
 *
 * @template Data - The type of data associated with the slider field.
 * @interface ISliderFieldPrivate
 */
export interface ISliderFieldPrivate<Data = IAnything>  {
  value: PickProp<IManaged<Data>, 'value'>;
  onChange: PickProp<IManaged<Data>, 'onChange'>;
  isPhone: PickProp<IManaged<Data>, 'isPhone'>;
  isTablet: PickProp<IManaged<Data>, 'isTablet'>;
  isDesktop: PickProp<IManaged<Data>, 'isDesktop'>;
}

/**
 * Represents a slider field component.
 * @typedef SliderField
 * @param value - The current value of the slider.
 * @param onChange - A callback function to handle slider value changes.
 * @param leadingIconRipple - Determines if the leading icon should have a ripple effect when clicked.
 * @param trailingIconRipple - Determines if the trailing icon should have a ripple effect when clicked.
 * @param leadingIcon - The icon component to be displayed at the start of the slider.
 * @param trailingIcon - The icon component to be displayed at the end of the slider.
 * @param leadingIconPress - A callback function to handle click events on the leading icon.
 * @param trailingIconPress - A callback function to handle click events on the trailing icon.
 * @param stepSlider - The step value for the slider.
 * @param maxSlider - The maximum value for the slider.
 * @param minSlider - The minimum value for the slider.
 * @param labelFormatSlider - The format string for the label text of the slider.
 * @returns A Slider component with the specified properties.
 */
export const SliderField = ({
  value,
  onChange,
  leadingIcon,
  trailingIcon,
  leadingIconPress,
  trailingIconPress,
  stepSlider,
  maxSlider,
  minSlider,
  isPhone,
  isTablet,
  isDesktop,
  labelFormatSlider,
}: ISliderFieldProps & ISliderFieldPrivate) => (
  <Slider
    value={value}
    onChange={onChange}
    leadingIcon={leadingIcon}
    trailingIcon={trailingIcon}
    leadingIconPress={leadingIconPress}
    trailingIconPress={trailingIconPress}
    labelFormatSlider={labelFormatSlider}
    stepSlider={stepSlider}
    maxSlider={maxSlider}
    minSlider={minSlider}
    isPhone={isPhone}
    isTablet={isTablet}
    isDesktop={isDesktop}
  />
);

SliderField.displayName = 'SliderField';

export default makeField(SliderField, {
  skipDebounce: true,
  withApplyQueue: true,
  skipDirtyPressListener: true,
});
