import FieldType from "../../../model/FieldType";
import IField from "../../../model/IField";

import { isLayout } from "./isStatefull";

/**
 * Set of FieldType values representing the baseline fields.
 */
export const baselineFields = new Set<FieldType>([
    FieldType.Combo,
    FieldType.Items,
    FieldType.Text,
    FieldType.YesNo,
    FieldType.Switch,
    FieldType.Radio,
    FieldType.Checkbox,
    FieldType.Component,
    FieldType.Button,
]);

/**
 * Для поля нужно проверить флаги и наличие в списке. Флаги baseline компоновок
 * действуют только на потомков и на родительский элемент не распространяются
 */
export const isBaselineForField = ({ type, noBaseline, baseline }: IField) => {
    if (isLayout(type)) {
        return false;
    }
    if (noBaseline) {
        return false;
    }
    if (baseline) {
        return true;
    }
    return baselineFields.has(type);
}

/**
 * Для компоновки все дочерние поля должны быть не компоновками
 * на один уровень вложенности без рекурсии
 *                             ^^^^^^^^^^^^
 */
const isBaselineForLayout = ({ noBaseline, baseline, child, fields }: IField) => {
    if (noBaseline) {
        return false;
    }
    if (baseline) {
        return true;
    }
    const innerFields: IField[] = child
        ? [child]
        : fields || [];
    return innerFields.every(isBaselineForField);
};

export const isBaseline = (field: IField) => {
    if (isLayout(field.type)) {
        return isBaselineForLayout(field)
    }
    return isBaselineForField(field);
}

export default isBaseline;
