import FieldType from "../../../model/FieldType";
import IField from "../../../model/IField";

/**
 * Set of FieldType values representing the baseline fields.
 */
export const baselineFields = new Set<FieldType>([
    FieldType.Choose,
    FieldType.Combo,
    FieldType.Complete,
    FieldType.Date,
    FieldType.File,
    FieldType.Items,
    FieldType.Text,
    FieldType.Time,
    FieldType.Dict,
    FieldType.Tree,
    FieldType.Button,
    FieldType.Icon,
]);

/**
 * Контейнер компоновки должен использовать flex-start для outlined
 * полей и flex-end для standard полей, чтобы выровнять нижний отчерк
 */
export const isBaseline = ({ type, child, fields, outlined }: IField) => {
    if (type === FieldType.Fragment) {
        const innerFields: IField[] = child
            ? [child]
            : fields || [];
        return innerFields.some(isBaseline);
    }
    return !outlined && baselineFields.has(type);
};

export default isBaseline;
