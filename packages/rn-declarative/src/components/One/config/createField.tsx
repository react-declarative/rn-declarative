import * as React from "react";

import FieldType from "../../../model/FieldType";
import IAnything from "../../../model/IAnything";
import IEntity from "../../../model/IEntity";

import ComponentField from "../fields/ComponentField";
import TextField from "../fields/TextField";
import RadioField from "../fields/RadioField";
import SwitchField from "../fields/SwitchField";
import CheckboxField from "../fields/CheckboxField";
import ComboField from "../fields/ComboField";
import ItemsField from "../fields/ItemsField";
import InitField from "../fields/InitField";
import YesNoField from "../fields/YesNoField";
import ButtonField from "../fields/ButtonField";

import CompleteField from "../fields/CompleteField";
import DateField from "../fields/DateField";
import ProgressField from "../fields/ProgressField";
import RatingField from "../fields/RatingField";
import SliderField from "../fields/SliderField";
import TimeField from "../fields/TimeField";
import ChooseField from "../fields/ChooseField";
import TypographyField from "../fields/TypographyField";
import TreeField from "../fields/TreeField";

const fieldMap: { [key in FieldType]?: React.ComponentType<IEntity> } = Object.create(null);

/**
 * fieldMap represents a collection of field types and their corresponding field components.
 * Each field type is mapped to its corresponding field component.
 *
 * @typedef FieldTypeToComponent
 * @property [FieldType.Component] - The component for rendering a generic field.
 * @property [FieldType.Text] - The component for rendering a text field.
 * @property [FieldType.Radio] - The component for rendering a radio field.
 * @property [FieldType.Switch] - The component for rendering a switch field.
 * @property [FieldType.Checkbox] - The component for rendering a checkbox field.
 * @property [FieldType.Combo] - The component for rendering a combo field.
 * @property [FieldType.Items] - The component for rendering an items field.
 * @property [FieldType.YesNo] - The component for rendering a yes/no field.
 * @property [FieldType.Init] - The component for rendering an init field.
 */
Object.assign(fieldMap, {
  [FieldType.Component]: ComponentField,
  [FieldType.Text]: TextField,
  [FieldType.Radio]: RadioField,
  [FieldType.Switch]: SwitchField,
  [FieldType.Checkbox]: CheckboxField,
  [FieldType.Combo]: ComboField,
  [FieldType.Items]: ItemsField,
  [FieldType.YesNo]: YesNoField,
  [FieldType.Init]: InitField,
  [FieldType.Button]: ButtonField,
  [FieldType.Complete]: CompleteField,
  [FieldType.Date]: DateField,
  [FieldType.Progress]: ProgressField,
  [FieldType.Rating]: RatingField,
  [FieldType.Slider]: SliderField,
  [FieldType.Time]: TimeField,
  [FieldType.Choose]: ChooseField,
  [FieldType.Typography]: TypographyField,
  [FieldType.Tree]: TreeField,
});

/**
 * Фабрика для создания полей
 */
export const createField = <Data extends IAnything = IAnything>(
  entity: IEntity<Data>,
  currentPath = ""
) => {
  const { type } = entity;
  let Field: React.ComponentType<IEntity<Data>> | undefined;
  if ((Field = fieldMap[type])) {
    return <Field {...entity} key={currentPath} />;
  } else {
    throw new Error("FieldFactory unknown key type");
  }
};

export default createField;
