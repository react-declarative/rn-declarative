import * as React from 'react';

import Typography from '../../../components/One/slots/TypographySlot';

import makeField from '../components/makeField';

import IManaged, { PickProp } from '../../../model/IManaged';
import IAnything from '../../../model/IAnything';
import IField from '../../../model/IField';

/**
 * Interface for props of the TypographyField component.
 *
 * @template Data - The data type of the field.
 * @template Payload - The payload type of the field.
 */
export interface ITypographyFieldProps<Data = IAnything, Payload = IAnything> {
  /**
   * Retrieves the `placeholder` property from the given `IField` object.
   * The `placeholder` property is a key of type `PickProp`.
   *
   * @param field - The input field object.
   * @returns - The `placeholder` property of the field object.
   */
  placeholder?: PickProp<IField<Data, Payload>, 'placeholder'>;
  /**
   * Represents the `typoVariant` property of an object.
   * @typedef TypoVariant
   * @property - The object from which the `typoVariant` property is picked.
   * @property - The name of the property being picked.
   * @property - The value of the `typoVariant` property.
   */
  typoVariant?: PickProp<IField<Data, Payload>, 'typoVariant'>;
}

/**
 * Represents a private interface for a typography field.
 *
 * @template Data - The type of data the field holds.
 */
export interface ITypographyFieldPrivate<Data = IAnything> {
  value: PickProp<IManaged<Data>, 'value'>;
  isPhone: PickProp<IManaged<Data>, 'isPhone'>;
  isTablet: PickProp<IManaged<Data>, 'isTablet'>;
  isDesktop: PickProp<IManaged<Data>, 'isDesktop'>;
}

/**
 * Renders a typography field component.
 *
 * @param props - The props for the typography field.
 * @param [props.value=''] - The value of the typography field.
 * @param [props.placeholder=''] - The placeholder text for the typography field.
 * @param [props.typoVariant='body1'] - The typography variant for the field.
 * @param [props.style] - Additional styles to be applied to the field.
 * @returns - The rendered typography field component.
 */
export const TypographyField = ({
  value = '',
  placeholder = '',
  typoVariant = 'body1',
  isPhone,
  isTablet,
  isDesktop,
}: ITypographyFieldProps & ITypographyFieldPrivate) => (
  <Typography
    value={value}
    placeholder={placeholder}
    typoVariant={typoVariant}
    isPhone={isPhone}
    isTablet={isTablet}
    isDesktop={isDesktop}
  />
);

TypographyField.displayName = 'TypographyField';

export default makeField(TypographyField, {
  skipFocusBlurCall: true,
});
