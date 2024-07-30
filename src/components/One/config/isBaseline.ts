import FieldType from "../../../model/FieldType";
import IField from "../../../model/IField";

/**
 * Set of FieldType values representing the baseline fields.
 */
export const baselineFields = new Set<FieldType>([
    FieldType.Combo,
    FieldType.Complete,
    FieldType.Items,
    FieldType.Text,
    FieldType.Button,
    FieldType.Component,
]);

/**
 * Контейнер компоновки должен использовать flex-start для outlined
 * полей и flex-end для standard полей, чтобы выровнять нижний отчерк
 */
export const isBaseline = ({ type, child, fields }: IField) => {
    if (type === FieldType.Fragment) {
        const innerFields: IField[] = child
            ? [child]
            : fields || [];
        return innerFields.some(isBaseline);
    }
    return baselineFields.has(type);
};

export default isBaseline;
