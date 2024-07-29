import * as React from "react";

import Items from '../../../components/One/slots/ItemsSlot';

import makeField from "../components/makeField";

import IManaged, { PickProp } from "../../../model/IManaged";
import IAnything from "../../../model/IAnything";
import IField from "../../../model/IField";

/**
 * Props for the IItemsField component.
 *
 * @template Data - The type of data for the field.
 * @template Payload - The type of payload for the field.
 */
export interface IItemsFieldProps<Data = IAnything, Payload = IAnything> {
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
   * Returns the "description" property of the given object if it exists, otherwise returns undefined.
   *
   * @template T - The type of the object to pick the property from.
   * @template K - The key of the property to pick.
   * @param obj - The object to pick the property from.
   * @param key - The key of the property to pick.
   * @returns - The value of the "description" property if it exists, otherwise undefined.
   */
  description?: PickProp<IField<Data, Payload>, "description">;
  /**
   * Type definition for the `placeholder` property.
   *
   * @template T - The type of the field.
   * @template K - The type of the key to pick from the field.
   * @param field - The field object.
   * @param key - The key representing the property to pick from the field.
   * @returns The picked `placeholder` property from the field.
   */
  placeholder?: PickProp<IField<Data, Payload>, "placeholder">;
  /**
   * Represents the itemList property of a field in the Data object.
   * @typedef itemList
   * @property [itemList] - The value of the itemList property.
   */
  itemList?: PickProp<IField<Data, Payload>, "itemList">;
  /**
   * Represents the `freeSolo` property of a field object.
   *
   * @typedef freeSolo
   * @description This property determines if the field supports selecting values that are not contained in the predefined options list.
   * @property [freeSolo] - A boolean value representing if the field allows free text input.
   */
  freeSolo?: PickProp<IField<Data, Payload>, "freeSolo">;
  /**
   * Represents an optional readonly flag of a field.
   *
   * @typedef readonly
   */
  readonly?: PickProp<IField<Data, Payload>, "readonly">;
  /**
   * Represents the "disabled" property of a field.
   *
   * @typedef disabled
   * @property value - Indicates whether the field is disabled or not.
   */
  disabled?: PickProp<IField<Data, Payload>, "disabled">;
  /**
   * Represents a configuration option for disabling deselect functionality.
   *
   * @template Data - The type of data associated with the field.
   * @template Payload - The type of payload associated with the field.
   * @typedef noDeselect
   */
  noDeselect?: PickProp<IField<Data, Payload>, "noDeselect">;
  /**
   * Type definition for the "title" property of an object.
   *
   * Suppose we have an object of type "IField<Data, Payload>". This type represents a field
   * in a form, where "Data" is the type of the form data and "Payload" is the type of data that
   * should be submitted when the form is submitted.
   *
   * The "PickProp" utility type is used to extract the "title" property from the "IField<Data, Payload>"
   * type. This variable represents the extracted type.
   *
   * @template Data - The type of the form data.
   * @template Payload - The type of the data to be submitted.
   *
   * @typedef PickProp<IField<Data, Payload>, "title">
   */
  title?: PickProp<IField<Data, Payload>, "title">;
  /**
   * Represents the "tr" property of a field in the given data and payload.
   *
   * @template Data - The type of data.
   * @template Payload - The type of payload.
   * @typeParam IField - The type of field.
   * @typeParam PickProp - The type for picking properties.
   *
   * @property tr - The "tr" property of the field.
   */
  tr?: PickProp<IField<Data, Payload>, "tr">;
  /**
   * Represents a variable watchItemList.
   * @typedef watchItemList
   * @property watchItemList - The watchItemList property of type PickProp<IField<Data>, "watchItemList">
   */
  watchItemList?: PickProp<IField<Data>, "watchItemList">;
}

/**
 * Represents a private interface for an items field.
 *
 * @interface IItemsFieldPrivate
 * @template Data The type of data managed by the items field.
 */
export interface IItemsFieldPrivate<Data = IAnything> {
  onChange: PickProp<IManaged<Data>, "onChange">;
  value: PickProp<IManaged<Data>, 'value'>;
  dirty: PickProp<IManaged<Data>, "dirty">;
  invalid: PickProp<IManaged<Data>, "invalid">;
  incorrect: PickProp<IManaged<Data>, "incorrect">;
  fieldReadonly: PickProp<IManaged<Data>, "fieldReadonly">;
  testId: PickProp<IManaged<Data>, 'testId'>;
  style: PickProp<IManaged<Data>, 'style'>;
  onFocus: PickProp<IManaged<Data>, 'onFocus'>;
  onBlur: PickProp<IManaged<Data>, 'onBlur'>;
}

/**
 * Renders a component for displaying a list of items.
 *
 * @param props - The properties for the ItemsField component.
 * @param props.value - The current value of the component.
 * @param [props.disabled=false] - Whether the component is disabled or not.
 * @param [props.readonly=false] - Whether the component is readonly or not.
 * @param [props.description] - The description for the component.
 * @param [props.placeholder] - The placeholder text for the component.
 * @param [props.itemList=[]] - The list of items to display.
 * @param [props.freeSolo=false] - Whether the component allows free text input or not.
 * @param [props.watchItemList] - A function to watch the itemList property for changes.
 * @param [props.noDeselect] - Whether to prevent deselecting an item or not.
 * @param [props.dirty] - Whether the component's value is dirty or not.
 * @param [props.invalid] - Whether the component's value is invalid or not.
 * @param [props.incorrect] - Whether the component's value is incorrect or not.
 * @param [props.title] - The title for the component.
 * @param [props.tr=(s) => s.toString()] - A translation function for translating strings.
 * @param [props.onChange] - A callback function called when the component's value changes.
 *
 * @returns - The rendered Items component.
 */
export const ItemsField = ({
  value,
  disabled,
  readonly,
  description,
  placeholder,
  itemList = [],
  freeSolo = false,
  watchItemList,
  noDeselect,
  dirty,
  invalid,
  incorrect,
  title,
  style,
  testId,
  fieldReadonly,
  tr = (s) => s.toString(),
  onChange,
  onFocus,
  onBlur,
}: IItemsFieldProps & IItemsFieldPrivate) => (
  <Items
    value={value}
    disabled={disabled}
    readonly={readonly}
    fieldReadonly={fieldReadonly}
    description={description}
    placeholder={placeholder}
    itemList={itemList}
    noDeselect={noDeselect}
    watchItemList={watchItemList}
    freeSolo={freeSolo}
    dirty={dirty}
    invalid={invalid}
    incorrect={incorrect}
    title={title}
    tr={tr}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    style={style}
    testId={testId}
  />
);

ItemsField.displayName = 'ItemsField';

export default makeField(ItemsField, {
  withApplyQueue: true,
  skipDebounce: true,
  skipDirtyPressListener: true,
  skipFocusReadonly: true,
});
