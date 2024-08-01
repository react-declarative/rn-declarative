import * as React from "react";

import Complete from "../../../components/One/slots/CompleteSlot";

import makeField from "../components/makeField";

import IManaged, { PickProp } from "../../../model/IManaged";
import IAnything from "../../../model/IAnything";
import IField from "../../../model/IField";

/**
 * Interface for specifying the props of a complete field.
 * @template Data, Payload - The types of data and payload.
 */
export interface ICompleteFieldProps<Data = IAnything, Payload = IAnything> {
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
   * Retrieves the "description" property from a given object and its nested properties if available.
   *
   * @template T - The type of the object to pick the "description" property from.
   * @template K - The keys of the properties in T.
   * @param obj - The object to pick the "description" property from.
   * @returns - The picked object with "description" property.
   */
  description?: PickProp<IField<Data, Payload>, "description">;
  /**
   * Represents the value of the `keepRaw` property, which indicates whether to keep the raw data in a field.
   *
   * @template Data - The data type of the field.
   * @template Payload - The payload type of the field.
   *
   * @typedef KeepRaw
   * @property keepRaw - Indicates whether to keep the raw data.
   */
  keepRaw?: PickProp<IField<Data, Payload>, "keepRaw">;
  /**
   * Type definition for the "title" property picked from the "IField" object type,
   * where "IField" is a generic object with properties "Data" and "Payload".
   * The resulting type is determined by the "PickProp" utility, which selects the specific property
   * from the provided object type.
   *
   * @template IField - The generic object type with properties "Data" and "Payload".
   * @template Data - The data type of the "IField" object.
   * @template Payload - The payload type of the "IField" object.
   * @template Key - The specific property key to pick from the "IField" object.
   * @typedef PickProp
   * @property object - The object from which the property is picked.
   * @property prop - The specific property key to pick.
   * @returns The type of the picked property.
   */
  title?: PickProp<IField<Data, Payload>, "title">;
  /**
   * Represents the "tip" property of an object.
   *
   * @template T - The type of the object.
   * @template K - The key of the property to pick.
   * @typedef PickProp
   */
  tip?: PickProp<IField<Data, Payload>, "tip">;
  /**
   * Represents a variable that holds the value of the "tipSelect" property.
   *
   * @typedef TipSelect
   * @property IField - Represents a generic field object.
   * @property Data - Represents the generic data type.
   * @property Payload - Represents the generic payload type.
   * @property tipSelect - The value of the "tipSelect" property.
   */
  tipSelect?: PickProp<IField<Data, Payload>, "tipSelect">;
  /**
   * Retrieves the `placeholder` property of a given field.
   *
   * @template Data - The type of data associated with the field.
   * @template Payload - The type of payload associated with the field.
   * @template Field - The type of field.
   *
   * @typedef PickProp - A utility type for picking properties from a type.
   * @param field - The field to pick the `placeholder` property from.
   *
   * @returns - The `placeholder` property of the given field, if present. Otherwise, `undefined`.
   */
  placeholder?: PickProp<IField<Data, Payload>, "placeholder">;
  /**
   * Retrieves the "readonly" property from the provided field object.
   *
   * @param field - The field object.
   * @returns - The value of the "readonly" property.
   */
  readonly?: PickProp<IField<Data, Payload>, "readonly">;
  /**
   * Represents the "disabled" property of a field.
   *
   * @template Data - The type of data associated with the field.
   * @template Payload - The type of payload for the field's actions.
   *
   * @typedef DisabledProp
   *
   * @property disabled - Specifies whether the field is disabled.
   */
  disabled?: PickProp<IField<Data, Payload>, "disabled">;
}

/**
 * Represents a private interface for a complete field.
 *
 * @template Data - The type of the field's data.
 */
export interface ICompleteFieldPrivate<Data = IAnything> {
  onChange: PickProp<IManaged<Data>, "onChange">;
  invalid: PickProp<IManaged<Data>, "invalid">;
  incorrect: PickProp<IManaged<Data>, "incorrect">;
  value: PickProp<IManaged<Data>, "value">;
  loading: PickProp<IManaged<Data>, "loading">;
  disabled: PickProp<IManaged<Data>, "disabled">;
  readonly: PickProp<IManaged<Data>, "readonly">;
  fieldReadonly: PickProp<IManaged<Data>, "fieldReadonly">;
  dirty: PickProp<IManaged<Data>, "dirty">;
  name: PickProp<IManaged<Data>, "name">;
}

/**
 * A wrapper component for the Complete component.
 *
 * @param props - The props for the CompleteField component.
 * @param props.invalid - Determines whether the field is in an invalid state.
 * @param props.incorrect - Determines whether the field has incorrect data.
 * @param props.value - The current value of the field.
 * @param props.disabled - Determines whether the field is disabled.
 * @param props.readonly - Determines whether the field is read-only.
 * @param props.inputType - The type of the input field.
 * @param props.description - The description of the field.
 * @param props.outlined - Determines whether the field is outlined.
 * @param props.keepRaw - Determines whether the raw value should be kept.
 * @param props.title - The title of the field.
 * @param props.labelShrink - The label shrink value.
 * @param props.tip - The tip for the field.
 * @param props.tipSelect - The tip for the select field.
 * @param props.placeholder - The placeholder text for the input field.
 * @param props.inputAutocomplete - The autocomplete attribute for the input field.
 * @param props.dirty - The dirty value of the field.
 * @param props.loading - Determines whether the field is in a loading state.
 * @param props.onChange - The callback function for the field value change event.
 * @param props.autoFocus - Determines whether the field should be auto-focused.
 * @param props.inputRef - The reference to the input field.
 * @param props.name - The name of the field.
 * @param props.inputFormatter - The input formatter for the field.
 * @param props.inputFormatterAllowed - The allowed values for the input formatter.
 * @param props.inputFormatterReplace - The values to replace in the input formatter.
 * @param props.inputFormatterSymbol - The symbol for the input formatter.
 * @param props.inputFormatterTemplate - The template for the input formatter.
 * @param props.withContextMenu - Determines whether the field should have a context menu.
 * @returns The rendered CompleteField component.
 */
export const CompleteField = ({
  invalid,
  incorrect,
  value,
  disabled,
  readonly,
  description = "",
  keepRaw = false,
  title = "",
  tip,
  tipSelect,
  placeholder = "",
  dirty,
  loading,
  onChange,
  name,
  fieldReadonly,
}: ICompleteFieldProps & ICompleteFieldPrivate) => (
  <Complete
    invalid={invalid}
    incorrect={incorrect}
    value={value}
    readonly={readonly}
    disabled={disabled}
    description={description}
    keepRaw={keepRaw}
    fieldReadonly={fieldReadonly}
    title={title}
    tip={tip}
    tipSelect={tipSelect}
    placeholder={placeholder}
    dirty={dirty}
    loading={loading}
    onChange={onChange}
    name={name}
  />
);

CompleteField.displayName = "CompleteField";

export default makeField(CompleteField);
