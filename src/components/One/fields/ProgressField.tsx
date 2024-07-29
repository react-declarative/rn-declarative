import * as React from "react";

import Progress from '../../../components/One/slots/ProgressSlot';

import makeField from "../components/makeField";

import IManaged, { PickProp } from "../../../model/IManaged";
import IField from "../../../model/IField";
import IAnything from "../../../model/IAnything";

/**
 * Represents the props for the ProgressField component.
 * @template Data - The type of data associated with the field.
 * @template Payload - The type of payload associated with the field.
 */
export interface IProgressFieldProps<Data = IAnything, Payload = IAnything> {
  /**
   * Maximum percentage value for a field.
   *
   * @typedef maxPercent
   */
  maxPercent?: PickProp<IField<Data, Payload>, "maxPercent">;
  /**
   * Determines whether to show the percent label.
   *
   * @typedef IField
   * @typedef Payload
   * @typedef PickProp
   *
   * @param showPercentLabel - The field containing the showPercentLabel property.
   * @returns - Whether to show the percent label.
   */
  showPercentLabel?: PickProp<IField<Data, Payload>, "showPercentLabel">;
  /**
   * Represents a reference to a group in a field.
   *
   * @typedef groupRef
   * @property [groupRef] - The group reference.
   */
  groupRef?: PickProp<IField<Data, Payload>, 'groupRef'>;
}

/**
 * Represents a private progress field.
 * @template Data - The type of data associated with the field.
 */
export interface IProgressFieldPrivate<Data = IAnything> {
  value: PickProp<IManaged<Data>, "value">;
}

/**
 * Represents a progress field component.
 *
 * @typedef ProgressField
 * @property maxPercent - The maximum percentage value for the progress field.
 * @property showPercentLabel - Determines if the percentage label should be displayed.
 * @property value - The current value of the progress field.
 *
 * @param props - The props object containing the properties required for the progress field.
 * @param props.maxPercent - The maximum percentage value for the progress field.
 * @param props.showPercentLabel - Determines if the percentage label should be displayed.
 * @param props.value - The current value of the progress field.
 *
 * @returns The rendered progress field component.
 */
export const ProgressField = ({
  maxPercent = 1.0,
  showPercentLabel,
  value,
}: IProgressFieldProps & IProgressFieldPrivate) => (
  <Progress
    showPercentLabel={showPercentLabel}
    maxPercent={maxPercent}
    value={value}
  />
);

ProgressField.displayName = 'ProgressField';

export default makeField(ProgressField, {
  skipFocusBlurCall: true,
});
