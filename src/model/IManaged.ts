import IField from './IField';
import IEntity from './IEntity';
import IAnything from './IAnything';

export type PickProp<T extends {}, P extends keyof T> = T[P];

export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

/**
 * Represents a layout with various properties that control its visibility, disabled state, and other features.
 *
 * @template Data - The data type used by the layout.
 * @template Payload - The payload type used by the layout.
 */
export interface IWrappedLayout<Data = IAnything, Payload = IAnything> {
    /**
     * Идентификатор для отладки json шаблона
     */
    testId?: PickProp<IField<Data, Payload>, 'testId'>;
    /**
     * Represents the `isVisible` property of a field in a form.
     *
     * @typedef isVisible
     * @property isVisible - Indicates whether the field is visible or not.
     */
    isVisible?: PickProp<IField<Data, Payload>, 'isVisible'>;
    /**
     * Represents the `isDisabled` property of a field in a form.
     * The `isDisabled` property determines whether the field is disabled or not.
     *
     * @typedef isDisabled
     * @property [isDisabled] - Indicates whether the field is disabled.
     */
    isDisabled?: PickProp<IField<Data, Payload>, 'isDisabled'>;
    /**
     * Retrieves the value of the 'isReadonly' property from the given variable.
     *
     * @param variable - The variable to retrieve the property from.
     * @returns The value of the 'isReadonly' property.
     */
    isReadonly?: PickProp<IField<Data, Payload>, 'isReadonly'>;
    /**
     * Retrieves the 'features' property from a given variable.
     *
     * @template T - The type of the variable.
     * @template K - The property name to retrieve.
     * @param variable - The variable to extract the property from.
     * @returns - The extracted 'features' property.
     */
    features?: PickProp<IField<Data, Payload>, 'features'>;
    /**
     * Represents the `disabled` property of a field.
     *
     * @typedef Disabled
     */
    disabled?: PickProp<IField<Data, Payload>, 'disabled'>;
    /**
     * Represents the `phoneHidden` property of a field object.
     *
     * @typedef phoneHidden
     * @property phoneHidden - Specifies whether the phone field should be hidden.
     */
    phoneHidden?: PickProp<IField<Data, Payload>, 'phoneHidden'>;
    /**
     * Represents the optional property 'tabletHidden' in a field object.
     *
     * @typedef tabletHidden
     */
    tabletHidden?: PickProp<IField<Data, Payload>, 'tabletHidden'>;
    /**
     * Represents the optional property `desktopHidden` of type `PickProp<IField<Data, Payload>, 'desktopHidden'>`.
     *
     * @typedef desktopHidden
     */
    desktopHidden?: PickProp<IField<Data, Payload>, 'desktopHidden'>;
    /**
     * Represents the 'hidden' property of an object.
     *
     * @template IField - The type of the field object.
     * @template Data - The type of the data object.
     * @template Payload - The type of the payload object.
     *
     * @typedef Hidden
     */
    hidden?: PickProp<IField<Data, Payload>, 'hidden'>;
    /**
     * Represents an optional property `noBaseline` that is picked from the interface `IField` using the `PickProp` utility type.
     *
     * @template Data - The type of data associated with the field.
     * @template Payload - The type of payload associated with the field.
     *
     * @typedef noBaseline
     *
     * @property [noBaseline] - Specifies whether the field has a baseline or not.
     */
    noBaseline?: PickProp<IField<Data, Payload>, 'noBaseline'>;
}

/**
 * Типизацию компоновки следует вынести отдельно
 */
export interface IManagedLayout<Data = IAnything, Payload = IAnything> extends IWrappedLayout<Data, Payload> {
    /**
     * Retrieves the specific style from a given object.
     */
    style?: PickProp<IField<Data, Payload>, 'style'>;
    /**
     * Represents the phone style configuration for a field
     */
    phoneStyle?: PickProp<IField<Data, Payload>, 'phoneStyle'>;
    /**
     * Represents the tablet style configuration for a field
     *
     * @typedef tabletColumns
     */
    tabletStyle?: PickProp<IField<Data, Payload>, 'tabletStyle'>;
    /**
     * Represents the desktop style configuration for a field
     */
    desktopStyle?: PickProp<IField<Data, Payload>, 'desktopStyle'>;
    /**
     * Returns the picked 'features' property from the given variable.
     *
     * @template Data - The type of data.
     * @template Payload - The type of payload.
     * @template T - The type of the variable.
     * @param variable - The variable from which to pick the 'features' property.
     * @returns - The picked 'features' property.
     */
    features?: PickProp<IField<Data, Payload>, 'features'>;
}

/**
 * Компонент высшего порядка makeField
 * перехватывает управление над свойствами
 * поля
 */
export interface IManagedShallow<Data = IAnything, Payload = IAnything> extends IManagedLayout<Data> {
    /**
     * Отменяет ожидание фокуса для валидации
     */
    dirty?: PickProp<IField<Data, Payload>, 'dirty'>;
    /**
     * Идентификатор для тестирования шаблона
     */
    testId?: PickProp<IField<Data, Payload>, 'testId'>;
    /**
     * Represents the `isDisabled` property of a field object.
     *
     * @typedef PickProp
     * @typedef IField
     * @typedef Data
     * @typedef Payload
     *
     * @type {PickProp<IField<Data, Payload>, 'isDisabled'>}
     *
     * @description
     * The `isDisabled` property indicates whether a field is disabled or not.
     * If `isDisabled` is `true`, the field is disabled, meaning it cannot be interacted with.
     * If `isDisabled` is `false`, the field is enabled and can be interacted with.
     *
     */
    isDisabled?: PickProp<IField<Data, Payload>, 'isDisabled'>;
    /**
     * Determines the visibility of a field.
     *
     * @typedef isVisible
     * @description The `isVisible` property is used to determine whether a field is visible or hidden.
     *
     * @param field - The field object that contains the `isVisible` property.
     *
     * @returns - Returns `true` if the field is visible, `false` otherwise.
     */
    isVisible?: PickProp<IField<Data, Payload>, 'isVisible'>;
    /**
     * Determines if the field is readonly.
     *
     * @typedef isReadonly
     */
    isReadonly?: PickProp<IField<Data, Payload>, 'isReadonly'>;
    /**
     * Represents the `isInvalid` field of a given field.
     *
     * @typedef IsInvalid
     */
    isInvalid?: PickProp<IField<Data, Payload>, 'isInvalid'>;
    /**
     * Checks if the field is incorrect.
     *
     * @template T - The object type to check.
     * @template K - The propertyname to pick from the object type.
     * @param obj - The object to check.
     * @param prop - The property name to pick from the object type.
     * @returns - A boolean indicating whether the field is incorrect.
     */
    isIncorrect?: PickProp<IField<Data, Payload>, 'isIncorrect'>;
    invalidity?: PickProp<IField<Data, Payload>, 'invalidity'>;
    /**
     * Determines if the field should be recomputed.
     *
     * @typedef shouldRecompute
     *
     * @property shouldRecompute - Indicates whether the field should be recomputed.
     */
    shouldRecompute?: PickProp<IField<Data, Payload>, 'shouldRecompute'>;
    /**
     * Check if 'shouldUpdateItemList' property is present in the given variable.
     *
     * @typedef shouldUpdateItemList
     * @param shouldUpdateItemList - The variable to be checked.
     * @returns - Returns true if 'shouldUpdateItemList' property is present, otherwise false.
     */
    shouldUpdateItemList?: PickProp<IField<Data, Payload>, 'shouldUpdateItemList'>;
    /**
     * Determines if the 'shouldUpdateTr' property should be updated.
     *
     * @typedef shouldUpdateTr
     * @property shouldUpdateTr.value - The current value of the 'shouldUpdateTr' property.
     * @property shouldUpdateTr.isReady - Indicates if the 'shouldUpdateTr' property is ready for update.
     * @property shouldUpdateTr.isEnabled - Determines if the 'shouldUpdateTr' property is enabled.
     */
    shouldUpdateTr?: PickProp<IField<Data, Payload>, 'shouldUpdateTr'>;
    /**
     * Represents the debug property of a field.
     * @template Data - The type of data associated with the field.
     * @template Payload - The type of payload associated with the field.
     * @typedef debug
     *
     * @property value - The value of the debug property.
     * @property props - Additional properties of the field.
     */
    debug?: PickProp<IField<Data, Payload>, 'debug'>;
    /**
     * Type definition for the `compute` property of an object.
     *
     * @template T - The type of the `IField` object.
     * @template Payload - The type of the payload used in the `IField` object.
     * @template K - The property key to pick from `IField<Data, Payload>`.
     *
     * @typedef compute
     *
     * @param object - The `IField` object to pick the `compute` property from.
     *
     * @returns - The value of the `compute` property from the `IField` object.
     */
    compute?: PickProp<IField<Data, Payload>, 'compute'>;
    /**
     * Represents the "press" property of a specific field in a data object.
     *
     * @template Data - The type of the data object containing the field.
     * @template Payload - The type of the payload associated with the press event.
     */
    press?: PickProp<IField<Data, Payload>, 'press'>;
    /**
     * Type definition for the `focus` property with pick properties.
     *
     * The `focus` property is used to pick a specific property from an object type.
     * This type definition is a utility type that leverages Pick and keyof to select
     * the specified property from the provided object type.
     *
     * @template T - The object type from which to pick the property.
     * @template K - The name of the property to select.
     *
     * @typedef PickProp
     * @type {Pick<T, K>}
     */
    focus?: PickProp<IField<Data, Payload>, 'focus'>;
    /**
     * Type definition for the 'blur' property.
     *
     * The 'blur' property is an optional property of type PickProp<IField<Data, Payload>, 'blur'>.
     * It represents whether the field should be blurred or not.
     *
     * @template Data - The data object type.
     * @template Payload - The payload type.
     * @property blur - The properties of the field to be blurred.
     *
     * @typedef BlurType
     */
    blur?: PickProp<IField<Data, Payload>, 'blur'>;
    /**
     * Represents a map property of a field.
     *
     * @template Data - The type of data object associated with the field.
     * @template Payload - The type of payload associated with the map property.
     *
     * @typedef Map
     *
     * @property key - The key associated with the map property.
     * @property value - The value associated with the map property.
     */
    map?: PickProp<IField<Data, Payload>, 'map'>;
    /**
     * Retrieves the defaultValue property from the given field.
     *
     * @param field - The field to get the defaultValue from.
     * @returns - The defaultValue of the field, if defined.
     */
    defaultValue?: PickProp<IField<Data, Payload>, 'defaultValue'>;
    /**
     * Type definition for the 'hidden' property of a field in a form.
     *
     * @template Data - The type of data object expected by the form.
     * @template Payload - The type of payload expected when submitting the form.
     * @template T - The type of the 'hidden' property in the field.
     *
     * @typedef hidden
     *
     * @property hidden - The value of the 'hidden' property of the field.
     */
    hidden?: PickProp<IField<Data, Payload>, 'hidden'>;
    /**
     * Extracts the 'features' property from the given variable.
     *
     * @param variable - The variable to pick 'features' property from.
     *
     * @returns - The extracted 'features' property.
     */
    features?: PickProp<IField<Data, Payload>, 'features'>;
}

/**
 * Свойства, не доступные управляемому полю
 */
type Exclude<Data = IAnything> = {
    object: never;
    type: never;
    focus: never;
    blur: never;
    press: never;
    ready: never;
    check: never;
    change: never;
    name: never;
    menu: never;
    map: never;
    menuItems: never;
    readTransform: never;
    writeTransform: never;
} & IManagedShallow<Data>;

/**
 * Свойства сущности, обернутой в компонент высшего порядка
 * Предоставляется удобная абстракция
 */
export interface IManaged<Data = IAnything, Value = any> extends Omit<IEntity<Data>, keyof Exclude<Data>> {
    name: string;
    value: Value;
    dirty: boolean;
    disabled: boolean;
    loading: boolean;
    readonly: boolean;
    testId: string;
    fieldReadonly: boolean;
    incorrect: string | null;
    invalid: string | null;
    object: Data;
    press: () => void | Promise<void>;
    onChange: (v: Value, config?: {
        skipReadonly?: boolean;
    }) => void;
    onFocus: () => void;
    onBlur: () => void;
}

export default IManaged;
