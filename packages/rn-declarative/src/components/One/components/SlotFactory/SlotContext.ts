import { createContext } from 'react';

import CheckBox from './components/CheckBox';
import Button from './components/Button';
import Combo from './components/Combo';
import Items from './components/Items';
import Radio from './components/Radio';
import Text from './components/Text';
import Switch from './components/Switch';
import YesNo from './components/YesNo';

import Complete from './components/Complete';
import Date from './components/Date';
import Progress from './components/Progress';
import Rating from './components/Rating';
import Slider from './components/Slider';
import Time from './components/Time';
import Choose from './components/Choose';
import Typography from './components/Typography';
import Tree from './components/Tree';

import ISlotFactoryContext from './ISlotFactoryContext';

/**
 * @description A list of default slots for a component.
 * @type {Array}
 * @property Checkbox Slot for a checkbox component.
 * @property Combo Slot for a comboBox component.
 * @property Items Slot for an items component.
 * @property Radio Slot for a radio component.
 * @property Text Slot for a text component.
 * @property Switch Slot for a switch component.
 * @property YesNo Slot for a yes/no component.
 */
export const defaultSlots: ISlotFactoryContext = {
    CheckBox,
    Combo,
    Items,
    Radio,
    Button,
    Text,
    Switch,
    YesNo,
    Complete,
    Date,
    Progress,
    Rating,
    Slider,
    Time,
    Choose,
    Typography,
    Tree,
};

export const SlotContext = createContext<ISlotFactoryContext>(defaultSlots);

export default SlotContext;
