import FieldType from '../../../model/FieldType';
import IField from '../../../model/IField';

/**
 * Represents a set of FieldType layouts.
 */
const layouts: Set<FieldType> = new Set([
    FieldType.Group,
    FieldType.Fragment,
    FieldType.Layout,
    FieldType.Condition,
]);

/**
 * Checks if a given FieldType is a layout type.
 *
 * @param type - The FieldType to check.
 * @returns - Returns true if the FieldType is a layout type, otherwise false.
 */
export const isLayout = (type: FieldType) => layouts.has(type);

/**
 * Компоновки работают как stateless, нам не нужно дожидаться
 * инициализации состояния
 */
export const isStatefull = ({type, name}: IField) => name && !layouts.has(type);

export default isStatefull;
