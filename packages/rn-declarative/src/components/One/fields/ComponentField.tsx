import * as React from "react";
import { Fragment } from "react";
import { useMemo } from "react";

import makeField from "../components/makeField";

import { useOnePayload } from "../../../components/One/context/PayloadProvider";
import { useOneState } from "../../../components/One/context/StateProvider";
import { DEFAULT_VALUE, useOneContext } from "../context/OneContextProvider";
import { useOneFeatures } from "../context/FeatureProvider";

import IField from "../../../model/IField";
import IAnything from "../../../model/IAnything";
import IManaged, { PickProp } from "../../../model/IManaged";

import type { ComponentFieldInstanceProps } from "../../../model/ComponentFieldInstance";

type FieldIgnoreParam = keyof Omit<IManaged, keyof IField> | "readonly" | "dirty";

const FIELD_INTERNAL_PARAMS: FieldIgnoreParam[] = [
  "dirty",
  "fallback",
  "readonly",
  "invalid",
  "incorrect",
  "dirty",
  "loading",
  "object",
  "onChange",
  "prefix",
  "value",
];

/**
 * Props interface for the IComponentField component.
 *
 * @template Data - The type of data for the field.
 * @template Payload - The type of payload for the field.
 */
export interface IComponentFieldProps<Data = IAnything, Payload = IAnything> {
  /**
   * Type definition for the 'name' property of an object.
   * The 'name' property is extracted from a specific type and is used to pick a specific property from that type.
   *
   * @template Data The data type to extract the property from.
   * @template Payload The type of the property to pick.
   *
   * @typedef name
   */
  name?: PickProp<IField<Data, Payload>, "name">;
  /**
   * Type definition for the `placeholder` property of a field.
   *
   * @template Data - The type of data associated with the field.
   * @template Payload - The type of payload used for updating the field.
   */
  placeholder?: PickProp<IField<Data, Payload>, "placeholder">;
  /**
   * Type definition for the `placeholder` property of a field.
   *
   * @template Data - The type of data associated with the field.
   * @template Payload - The type of payload used for updating the field.
   */
  title?: PickProp<IField<Data, Payload>, "title">;
  /**
   * Retrieves the "element" property from the given object
   *
   * @param element - The object to extract the "element" property from
   * @returns - The value of the "element" property
   */
  element?: PickProp<IField<Data, Payload>, "element">;
  /**
   * Represents the contextual information for watching a single field in a data structure.
   * @typedef watchOneContext?
   */
  watchOneContext?: PickProp<IField<Data, Payload>, "watchOneContext">;
}

/**
 * @interface
 * @template Data - The type of data for the component field
 * @description Represents the private interface for a component field
 */
interface IComponentFieldPrivate<Data = IAnything> {
  object: PickProp<IManaged<Data>, "object">;
  disabled: PickProp<IManaged<Data>, "disabled">;
  value: PickProp<IManaged<Data>, "value">;
  name: PickProp<IManaged<Data>, "name">;
  invalid: PickProp<IManaged<Data>, "invalid">;
  dirty: PickProp<IManaged<Data>, "dirty">;
  incorrect: PickProp<IManaged<Data>, "incorrect">;
  readonly: PickProp<IManaged<Data>, "readonly">;
  testId: PickProp<IManaged<Data>, 'testId'>;
  onChange: PickProp<IManaged<Data>, "onChange">;
  onFocus: PickProp<IManaged<Data>, 'onFocus'>;
  onBlur: PickProp<IManaged<Data>, 'onBlur'>;
  press: PickProp<IManaged<Data>, 'press'>;
  isPhone: PickProp<IManaged<Data>, 'isPhone'>;
  isTablet: PickProp<IManaged<Data>, 'isTablet'>;
  isDesktop: PickProp<IManaged<Data>, 'isDesktop'>;
}

const ComponentContextInstance = ({
    Element,
    ...props
}: ComponentFieldInstanceProps) => {
    const context = useOneContext();
    return (
        <Element
            {...props}
            context={context}
        />
    );
};

/**
 * Represents a component field.
 * @param props - The component props.
 * @param props.disabled - Indicates if the field is disabled.
 * @param props.readonly - Indicates if the field is readonly.
 * @param props.watchOneContext - Indicates if the field should watch the One context.
 * @param props.element - The element to render, default is Fragment.
 * @param props.object - A generic object to pass to the field.
 * @param props.otherProps - Other props to pass to the field.
 * @param - The rendered field component.
 */
export const ComponentField = ({
  disabled,
  invalid,
  incorrect,
  readonly,
  value,
  watchOneContext,
  element: Element = () => <Fragment />,
  object,
  onFocus,
  onBlur,
  press: onPress,
  testId,
  dirty,
  isPhone,
  isTablet,
  isDesktop,
  onChange: onValueChange,
  ...otherProps
}: IComponentFieldProps & IComponentFieldPrivate) => {
  const { changeObject: handleChange } = useOneState();
  const payload = useOnePayload();
  const features = useOneFeatures();

  const componentProps = useMemo(() => {
    const _fieldParams = Object.entries(otherProps as unknown as IField)
      .filter(
        ([key]) => !FIELD_INTERNAL_PARAMS.includes(key as FieldIgnoreParam)
      )
      .reduce((acm, [key, value]) => ({ ...acm, [key]: value }), {}) as IField;
    return {
      ...object,
      onChange: handleChange,
      onValueChange,
      onFocus,
      onBlur,
      onPress,
      testId,
      _fieldParams,
      _fieldData: object,
      invalid,
      incorrect,
      payload,
      dirty,
      disabled,
      readonly,
      features,
      isPhone,
      isTablet,
      isDesktop,
    } as const;
  }, [
    object,
    disabled,
    invalid,
    incorrect,
    readonly,
    dirty,
    isPhone,
    isTablet,
    isDesktop,
  ]);

  if (watchOneContext) {
    return <ComponentContextInstance {...componentProps} value={value} Element={Element} />
  }
  return <Element {...componentProps} value={value} context={DEFAULT_VALUE} />
};

ComponentField.displayName = "ComponentField";

export default makeField(ComponentField, {
  withApplyQueue: true,
  skipDirtyPressListener: true,
  skipFocusReadonly: true,
  skipFocusBlurCall: true,
  skipDebounce: false,
});
