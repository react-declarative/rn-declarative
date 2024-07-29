import { ComponentType } from 'react';

import { ICheckBoxSlot } from '../../slots/CheckBoxSlot';
import { IItemsSlot } from '../../slots/ItemsSlot';
import { IComboSlot } from '../../slots/ComboSlot';
import { IRadioSlot } from '../../slots/RadioSlot';
import { ITextSlot } from '../../slots/TextSlot';
import { ISwitchSlot } from '../../slots/SwitchSlot';
import { IYesNoSlot } from '../../slots/YesNoSlot';
import { IButtonSlot } from '../../slots/ButtonSlot';

/**
 * A context object that provides access to various component types used by the slot factory.
 * @typedef ISlotFactoryContext
 * @property Button - The component type for Button slots.
 * @property CheckBox - The component type for Checkbox slots.
 * @property Combo - The component type for Combo slots.
 * @property YesNo - The component type for YesNo slots.
 * @property Items - The component type for Items slots.
 * @property Radio - The component type for Radio slots.
 * @property Text - The component type for Text slots.
 * @property Switch - The component type for Switch slots.
 */
export interface ISlotFactoryContext {
    CheckBox: ComponentType<ICheckBoxSlot>;
    Button: ComponentType<IButtonSlot>;
    Combo: ComponentType<IComboSlot>;
    YesNo: ComponentType<IYesNoSlot>;
    Items: ComponentType<IItemsSlot>;
    Radio: ComponentType<IRadioSlot>;
    Text: ComponentType<ITextSlot>;
    Switch: ComponentType<ISwitchSlot>;
}

export default ISlotFactoryContext;
