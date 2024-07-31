import FieldType from "../model/FieldType";
import IField from "../model/IField";

import deepFlat from "./deepFlat";

/**
 * Represents a set of field types for variants.
 *
 * @type {Set<FieldType>}
 */
const VARIANT_FIELD_TYPE = new Set([
    FieldType.Combo,
    FieldType.Items,
    FieldType.Text,
    FieldType.YesNo,
    FieldType.Switch,
    FieldType.Radio,
    FieldType.Checkbox,
    FieldType.Component,
    FieldType.Button,
    FieldType.Phony,
]);

/**
 * Retrieves a list of variants based on the given fields.
 *
 * @param fields - The array of fields to process.
 * @param keyToTitle - (Optional) A function to derive the title from the field name. Default is identity function.
 * @returns - The list of variants, each containing a label and value.
 */
export const getFieldsVariant = (fields: IField[], {
  keyToTitle = (v) => v,
  ignore = () => false,
}: {
  keyToTitle?: (v: string) => string;
  ignore?: (key: string) => boolean;
} = {}) => {
  const variantList: { label: string; value: string }[] = [];
  for (const { name, type, title, placeholder } of deepFlat<IField>(
    fields
  )) {
    if (!name) {
      continue;
    }
    if (ignore(name)) {
      continue;
    }
    if (variantList.some((variant) => variant.value === name)) {
      continue;
    }
    if (VARIANT_FIELD_TYPE.has(type)) {
      const label = title || placeholder || keyToTitle(name);
      variantList.push({
        label: `${label}, ${String(Symbol.keyFor(type as unknown as symbol) || type)}`,
        value: name,
      });
    }
  }
  return variantList;
}

export default getFieldsVariant;
