import * as React from "react";

import Combo from "../../../components/One/slots/ComboSlot";

import makeField from "../components/makeField";

import IManaged, { PickProp } from "../../../model/IManaged";
import IAnything from "../../../model/IAnything";
import IField from "../../../model/IField";

/**
 * Represents the properties for the ComboField component.
 *
 * @template Data - The type of data associated with the field.
 * @template Payload - The type of payload associated with the field.
 */
export interface IComboFieldProps<Data = IAnything, Payload = IAnything> {
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
   * Retrieves the "description" property
   */
  description?: PickProp<IField<Data, Payload>, "description">;
  /**
   * Represents the `placeholder` property of a field.
   *
   * @template Data - The type of data associated with the field.
   * @template Payload - The type of payload associated with the field.
   * @typedef FieldPlaceholder
   */
  placeholder?: PickProp<IField<Data, Payload>, "placeholder">;
  /**
   * Represents a list of items from a specific field's data payload.
   *
   * @typedef itemList
   */
  itemList?: PickProp<IField<Data, Payload>, "itemList">;
  /**
   * Represents the `freeSolo` property of an object.
   *
   * @typedef freeSolo
   * @property [freeSolo] - Indicates whether or not the field allows free-form input.
   * @property field - The parent field object.
   * @property - The type of data associated with the field.
   * @property - The type of payload associated with the field.
   */
  freeSolo?: PickProp<IField<Data, Payload>, "freeSolo">;
  /**
   * Specifies whether the field should allow deselection.
   *
   * @template Data - The data type of the field.
   * @template Payload - The payload type of the field.
   * @typedef noDeselect
   *
   * @param noDeselect - The value of the noDeselect property.
   *
   * @returns - This function does not return any value.
   */
  noDeselect?: PickProp<IField<Data, Payload>, "noDeselect">;
  /**
   * Represents the watch item list for a specific field.
   *
   * @typedef watchItemList
   * @property - An array of watch items.
   */
  watchItemList?: PickProp<IField<Data, Payload>, "watchItemList">;
  /**
   * Retrieves the "readonly" property from a given object of type IField<Data, Payload>.
   *
   * @param field - The object from which to retrieve the "readonly" property.
   * @returns The value of the "readonly" property.
   */
  readonly?: PickProp<IField<Data, Payload>, "readonly">;
  /**
   * Represents the "disabled" property of a field.
   *
   * @typedef Disabled
   * @property disabled - Indicates if the field is disabled or not.
   */
  disabled?: PickProp<IField<Data, Payload>, "disabled">;
  /**
   * Retrieves the "title" property for a field
   */
  title?: PickProp<IField<Data, Payload>, "title">;
  /**
   * Represents an optional property "tr" of type PickProp<IField<Data, Payload>, "tr">.
   *
   * @typedef tr
   */
  tr?: PickProp<IField<Data, Payload>, "tr">;
}

/**
 * Represents the private interface for the ComboField class.
 * @template Data - The type of data managed by the ComboField.
 */
export interface IComboFieldPrivate<Data = IAnything>  {
  value: PickProp<IManaged<Data>, "value">;
  readonly: PickProp<IManaged<Data>, "readonly">;
  fieldReadonly: PickProp<IManaged<Data>, "fieldReadonly">;
  onChange: PickProp<IManaged<Data>, "onChange">;
  dirty: PickProp<IManaged<Data>, "dirty">;
  invalid: PickProp<IManaged<Data>, "invalid">;
  incorrect: PickProp<IManaged<Data>, "incorrect">;
  testId: PickProp<IManaged<Data>, 'testId'>;
  onFocus: PickProp<IManaged<Data>, 'onFocus'>;
  onBlur: PickProp<IManaged<Data>, 'onBlur'>;
}

/**
 * ComboField component.
 *
 * @param props - The props object.
 * @param props.value - The value of the ComboField.
 * @param [props.disabled=false] - Specifies whether the ComboField is disabled.
 * @param [props.readonly=false] - Specifies whether the ComboField is readonly.
 * @param [props.description=""] - The description of the ComboField.
 * @param [props.placeholder=""] - The placeholder text of the ComboField.
 * @param [props.itemList=[]] - The list of items for the ComboField.
 * @param [props.freeSolo=false] - Specifies whether the ComboField allows free text input.
 * @param [props.watchItemList] - Specifies whether to watch changes in the itemList prop.
 * @param [props.noDeselect] - Specifies whether the ComboField should prevent deselecting options.
 * @param [props.title=""] - The title of the ComboField.
 * @param [props.dirty] - Specifies whether the ComboField has been modified.
 * @param [props.invalid] - Specifies whether the ComboField is invalid.
 * @param [props.incorrect] - Specifies whether the ComboField has incorrect data.
 * @param [props.tr=(s) => s.toString()] - The translation function for the ComboField.
 * @param [props.onChange] - The event handler function for onChange event.
 *
 * @returns The ComboField component.
 */
export const ComboField = ({
  value,
  disabled,
  readonly,
  description = "",
  placeholder = "",
  itemList = [],
  freeSolo = false,
  watchItemList,
  noDeselect,
  title = "",
  dirty,
  testId,
  invalid,
  incorrect,
  fieldReadonly,
  tr = (s) => s.toString(),
  onChange,
  onFocus,
  onBlur,
}: IComboFieldProps & IComboFieldPrivate) => (
  <Combo
    value={value}
    disabled={disabled}
    readonly={readonly}
    description={description}
    placeholder={placeholder}
    itemList={itemList}
    noDeselect={noDeselect}
    watchItemList={watchItemList}
    freeSolo={freeSolo}
    title={title}
    dirty={dirty}
    invalid={invalid}
    incorrect={incorrect}
    fieldReadonly={fieldReadonly}
    tr={tr}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    testId={testId}
  />
);

ComboField.displayName = "ComboField";

export default makeField(ComboField, {
  withApplyQueue: true,
  skipDebounce: true,
  skipDirtyPressListener: true,
  skipFocusReadonly: true,
});
