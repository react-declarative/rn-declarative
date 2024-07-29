/**
 * Represents the type of a field in a <One /> component.
 */
export enum FieldType {
    Layout = 'custom-layout',
    Switch = 'switch-field',
    YesNo = 'yesno-field',
    Group = 'group-layout',
    Radio = 'radio-field',
    Checkbox = 'checkbox-field',
    Text = 'text-field',
    Component = 'component-field',
    Combo = 'combo-field',
    Init = 'init-field',
    Phony = 'phony-field',
    Button = 'button-field',
    Complete = 'complete-field',
    Items = 'items-field',
    Fragment = 'fragment-layout',
    Condition = 'condition-layout',
};

Object.entries(FieldType).forEach(([key, value]) => {
    (FieldType as any)[key] = Symbol.for(value) as unknown as string;
});

export default FieldType;
