import IManaged, { IManagedShallow } from './IManaged';
import IEntity from './IEntity';
import FieldType from './FieldType';
import IAnything from './IAnything';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Компоновки
 */
import { IFragmentLayoutProps } from '../components/One/layouts/FragmentLayout';
import { IGroupLayoutProps } from '../components/One/layouts/GroupLayout';
import { IConditionLayoutProps } from '../components/One/layouts/ConditionLayout';
import { ICustomLayoutProps } from '../components/One/layouts/CustomLayout';

/**
 * Поля ввода
 */
import { ICheckboxFieldProps } from '../components/One/fields/CheckboxField';
import { IButtonFieldProps } from '../components/One/fields/ButtonField';
import { IComboFieldProps } from '../components/One/fields/ComboField';
import { IComponentFieldProps } from '../components/One/fields/ComponentField';
import { IItemsFieldProps } from '../components/One/fields/ItemsField';
import { IRadioFieldProps } from '../components/One/fields/RadioField';
import { ISwitchFieldProps } from '../components/One/fields/SwitchField';
import { ITextFieldProps } from '../components/One/fields/TextField';
import { IYesNoFieldProps } from '../components/One/fields/YesNoField';
import { IInitFieldProps } from '../components/One/fields/InitField';

import { ICompleteFieldProps } from '../components/One/fields/CompleteField';
import { IDateFieldProps } from '../components/One/fields/DateField';
import { IProgressFieldProps } from '../components/One/fields/ProgressField';
import { IRatingFieldProps } from '../components/One/fields/RatingField';
import { ISliderFieldProps } from '../components/One/fields/SliderField';
import { ITimeFieldProps } from '../components/One/fields/TimeField';
import { IChooseFieldProps } from '../components/One/fields/ChooseField';
import { ITypographyFieldProps } from '../components/One/fields/TypographyField';

/**
 * Исключения из правила
 */
import { IPhonyField } from './IPhonyField';

/**
 * Represents a class that excludes certain properties from a given type.
 *
 * @template Data - The type of data for the managed object.
 * @template Payload - The type of payload for the managed object.
 * @type Exclude<Data, Payload>
 */
type Exclude<Data = IAnything, Payload = IAnything> = Omit<IManaged<Data, Payload>, keyof IEntity<Data, Payload>>;

/**
 * A factory class for creating typed fields.
 *
 * @template Type - The type of field.
 * @template Fields - The interface for the fields.
 * @template Data - The type of data.
 * @template Payload - The type of payload.
 */
type TypedFieldFactory<Type extends FieldType, Fields extends {}, Data = IAnything, Payload = IAnything> = {
  [Prop in keyof Omit<Fields, keyof Exclude<Data, Payload>>]?: Fields[Prop];
} & {
  type: Type;
};

/**
 * Represents a factory for creating typed fields with a shallow data structure.
 *
 * @template Type - The type of the field.
 * @template Fields - The field definitions.
 * @template Data - The data type.
 * @template Payload - The payload type.
 *
 * @typedef TypedFieldFactoryShallow
 * @property Type - The type of the field.
 * @property Fields - The field definitions.
 * @property Data - The data type.
 * @property Payload - The payload type.
 */
type TypedFieldFactoryShallow<
  Type extends FieldType,
  Fields extends {},
  Data = IAnything,
  Payload = IAnything,
> = IManagedShallow<Data, Payload> & TypedFieldFactory<Type, Fields, Data, Payload>;

type Group<Data = IAnything, Payload = IAnything> = TypedFieldFactory<FieldType.Group, IGroupLayoutProps<Data, Payload>, Data, Payload>;
type Custom<Data = IAnything, Payload = IAnything> = TypedFieldFactory<FieldType.Layout, ICustomLayoutProps<Data, Payload>, Data, Payload>;
type Fragment<Data = IAnything, Payload = IAnything>  = TypedFieldFactory<FieldType.Fragment, IFragmentLayoutProps<Data, Payload>, Data, Payload>;
type Condition<Data = IAnything, Payload = IAnything> = TypedFieldFactory<FieldType.Condition, IConditionLayoutProps<Data, Payload>, Data, Payload>;

type Checkbox<Data = IAnything, Payload = IAnything> = TypedFieldFactoryShallow<FieldType.Checkbox, ICheckboxFieldProps<Data, Payload>, Data, Payload>;
type Button<Data = IAnything, Payload = IAnything> = TypedFieldFactoryShallow<FieldType.Button, IButtonFieldProps<Data, Payload>, Data, Payload>;
type Combo<Data = IAnything, Payload = IAnything> = TypedFieldFactoryShallow<FieldType.Combo, IComboFieldProps<Data, Payload>, Data, Payload>;
type Component<Data = IAnything, Payload = IAnything> = TypedFieldFactoryShallow<FieldType.Component, IComponentFieldProps<Data, Payload>, Data, Payload>;
type Items<Data = IAnything, Payload = IAnything> = TypedFieldFactoryShallow<FieldType.Items, IItemsFieldProps<Data, Payload>, Data, Payload>;
type Radio<Data = IAnything, Payload = IAnything> = TypedFieldFactoryShallow<FieldType.Radio, IRadioFieldProps<Data, Payload>, Data, Payload>;
type Switch<Data = IAnything, Payload = IAnything> = TypedFieldFactoryShallow<FieldType.Switch, ISwitchFieldProps<Data, Payload>, Data, Payload>;
type Text<Data = IAnything, Payload = IAnything> = TypedFieldFactoryShallow<FieldType.Text, ITextFieldProps<Data, Payload>, Data, Payload>;
type YesNo<Data = IAnything, Payload = IAnything> = TypedFieldFactoryShallow<FieldType.YesNo, IYesNoFieldProps<Data, Payload>, Data, Payload>;
type Init<Data = IAnything, Payload = IAnything> = TypedFieldFactoryShallow<FieldType.Init, IInitFieldProps, Data, Payload>;
type Phony<Data = IAnything, Payload = IAnything> = TypedFieldFactoryShallow<FieldType.Phony, IPhonyField, Data, Payload>;


type Complete<Data = IAnything, Payload = IAnything> = TypedFieldFactoryShallow<FieldType.Complete, ICompleteFieldProps<Data, Payload>, Data, Payload>;
type Date<Data = IAnything, Payload = IAnything> = TypedFieldFactoryShallow<FieldType.Date, IDateFieldProps<Data, Payload>, Data, Payload>;
type Progress<Data = IAnything, Payload = IAnything> = TypedFieldFactoryShallow<FieldType.Progress, IProgressFieldProps<Data, Payload>, Data, Payload>;
type Rating<Data = IAnything, Payload = IAnything> = TypedFieldFactoryShallow<FieldType.Rating, IRatingFieldProps<Data, Payload>, Data, Payload>;
type Slider<Data = IAnything, Payload = IAnything> = TypedFieldFactoryShallow<FieldType.Slider, ISliderFieldProps<Data, Payload>, Data, Payload>;
type Time<Data = IAnything, Payload = IAnything> = TypedFieldFactoryShallow<FieldType.Time, ITimeFieldProps<Data, Payload>, Data, Payload>;
type Choose<Data = IAnything, Payload = IAnything> = TypedFieldFactoryShallow<FieldType.Choose, IChooseFieldProps<Data, Payload>, Data, Payload>;
type Typography<Data = IAnything, Payload = IAnything> = TypedFieldFactoryShallow<FieldType.Typography, ITypographyFieldProps<Data, Payload>, Data, Payload>;


/**
 * Логическое ветвление компонентов
 * Typescript type-guard
 */
export type TypedFieldRegistry<Data = IAnything, Payload = IAnything, Target = any> =
  Target extends Group<Data, Payload> ? Group<Data, Payload>
  : Target extends Checkbox<Data, Payload> ? Checkbox<Data, Payload>
  : Target extends Button<Data, Payload> ? Button<Data, Payload>
  : Target extends Combo<Data, Payload> ? Combo<Data, Payload>
  : Target extends Complete<Data, Payload> ? Complete<Data, Payload>
  : Target extends Date<Data, Payload> ? Date<Data, Payload>
  : Target extends Progress<Data, Payload> ? Progress<Data, Payload>
  : Target extends Rating<Data, Payload> ? Rating<Data, Payload>
  : Target extends Slider<Data, Payload> ? Slider<Data, Payload>
  : Target extends Time<Data, Payload> ? Time<Data, Payload>
  : Target extends Choose<Data, Payload> ? Choose<Data, Payload>
  : Target extends Typography<Data, Payload> ? Typography<Data, Payload>
  : Target extends Component<Data, Payload> ? Component<Data, Payload>
  : Target extends Items<Data, Payload> ? Items<Data, Payload>
  : Target extends Radio<Data, Payload> ? Radio<Data, Payload>
  : Target extends Switch<Data, Payload> ? Switch<Data, Payload>
  : Target extends Text<Data, Payload> ? Text<Data, Payload>
  : Target extends YesNo<Data, Payload> ? YesNo<Data, Payload>
  : Target extends Fragment<Data, Payload> ? Fragment<Data, Payload>
  : Target extends Custom<Data, Payload> ? Custom<Data, Payload>
  : Target extends Condition<Data, Payload> ? Condition<Data, Payload>
  : Target extends Init<Data, Payload> ? Init<Data, Payload>
  : Target extends Phony<Data, Payload> ? Phony<Data, Payload>
  : never;

/**
 * IOneProps - генерик, для прикладного программиста мы можем подменить IField
 * на TypedField.  Это  позволит  автоматически  выбрать  интерфейс  props для
 * IntelliSense после указания *type* или методом исключения
 */
export type TypedField<Data = IAnything, Payload = IAnything> = TypedFieldRegistry<Data, Payload> & {
  name?: string;
  fields?: TypedField<Data, Payload>[];
  child?: TypedField<Data, Payload>;
};

export default TypedField;
