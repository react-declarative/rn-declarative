import { ComponentType } from 'react';

import { ICheckBoxSlot } from '../../slots/CheckBoxSlot';
import { IItemsSlot } from '../../slots/ItemsSlot';
import { IComboSlot } from '../../slots/ComboSlot';
import { IRadioSlot } from '../../slots/RadioSlot';
import { ITextSlot } from '../../slots/TextSlot';
import { ISwitchSlot } from '../../slots/SwitchSlot';
import { IYesNoSlot } from '../../slots/YesNoSlot';
import { IButtonSlot } from '../../slots/ButtonSlot';

import { ICompleteSlot } from '../../slots/CompleteSlot';
import { IDateSlot } from '../../slots/DateSlot';
import { IProgressSlot } from '../../slots/ProgressSlot';
import { IRatingSlot } from '../../slots/RatingSlot';
import { ISliderSlot } from '../../slots/SliderSlot';
import { ITimeSlot } from '../../slots/TimeSlot';
import { IChooseSlot } from '../../slots/ChooseSlot';
import { ITypographySlot } from '../../slots/TypographySlot';
import { ITreeSlot } from '../../slots/TreeSlot';

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
    Complete: ComponentType<ICompleteSlot>;
    Date: ComponentType<IDateSlot>;
    Progress: ComponentType<IProgressSlot>;
    Rating: ComponentType<IRatingSlot>;
    Slider: ComponentType<ISliderSlot>;
    Time: ComponentType<ITimeSlot>;
    Choose: ComponentType<IChooseSlot>;
    Typography: ComponentType<ITypographySlot>;
    Tree: ComponentType<ITreeSlot>;
}

export default ISlotFactoryContext;
