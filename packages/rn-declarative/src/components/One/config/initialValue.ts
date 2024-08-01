import FieldType from '../../../model/FieldType';

/**
 * Represents an initial value map for different field types.
 *
 * @typedef initialValueMap
 * @property Checkbox - The initial value for a checkbox field.
 * @property Radio - The initial value for a radio field.
 * @property Text - The initial value for a text field.
 * @property Switch - The initial value for a switch field.
 * @property Combo - The initial value for a combo field.
 * @property Items - The initial value for an items field.
 * @property Component - The initial value for a component field.
 * @property Init - The initial value for an init field.
 * @property YesNo - The initial value for a yes/no field.
 */
const initialValueMap = {
  [FieldType.Checkbox]: false,
  [FieldType.Radio]: null,
  [FieldType.Text]: "",
  [FieldType.Switch]: false,
  [FieldType.Combo]: null,
  [FieldType.Items]: null,
  [FieldType.Component]: null,
  [FieldType.Init]: null,
  [FieldType.YesNo]: null,
  [FieldType.Complete]: '',
  [FieldType.Date]: null,
  [FieldType.Progress]: '',
  [FieldType.Rating]: null,
  [FieldType.Slider]: 0,
  [FieldType.Time]: null,
};

type InitialValue = typeof initialValueMap;

/**
 * Returns the initial value based on the specified type.
 *
 * @param type - The type of the initial value.
 * @returns - The initial value.
 */
export const initialValue = (type: FieldType): InitialValue[keyof InitialValue] | string => {
  const initialValue = initialValueMap[type];
  if (initialValue === undefined) {
    console.log(`rn-declarative One initialValue unknown type ${String(type)}`);
    return undefined as never;
  } else {
    return initialValue;
  }
};

export default initialValue;
