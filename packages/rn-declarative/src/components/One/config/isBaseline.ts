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
 * Контейнер компоновки должен использовать flex-start для outlined
 * полей и flex-end для standard полей, чтобы выровнять нижний отчерк
 */
export const isBaseline = ({ type, noBaseline, child, fields, baseline }: IField) => {
    const innerFields: IField[] = child ? [child] : fields || [];
    if (noBaseline) {
        return false;
    }
    if (baseline) {
        return true;
    }
    if (isLayout(type)) {
        return innerFields
            .some(({ noBaseline, baseline, type }) => {
                if (noBaseline) {
                    return false;
                }
                if (baseline) {
                    return true;
                }
                return baselineFields.has(type);
            });
    }
    return baselineFields.has(type);
};

export default isBaseline;
