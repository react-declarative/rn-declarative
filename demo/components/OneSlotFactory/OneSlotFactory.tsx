import * as React from 'react';

import { OneSlotFactory as OneSlotFactoryInternal } from 'rn-declarative';

import CheckBox from './components/CheckBox';
import Button from './components/Button';
import Combo from './components/Combo';
import Items from './components/Items';
import Radio from './components/Radio';
import Text from './components/Text';
import Switch from './components/Switch';
import YesNo from './components/YesNo';

interface IOneSlotFactoryProps {
    children: React.ReactNode;
}

const defaultSlots = {
    CheckBox,
    Combo,
    Items,
    Radio,
    Button,
    Text,
    Switch,
    YesNo,
};

export const OneSlotFactory = ({
    children
}: IOneSlotFactoryProps) => (
    <OneSlotFactoryInternal
        {...defaultSlots}
    >
        {children}
    </OneSlotFactoryInternal>
);

export default OneSlotFactory;
