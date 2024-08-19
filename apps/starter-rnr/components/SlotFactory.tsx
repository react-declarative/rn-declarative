import React from "react";
import { OneSlotFactory } from "rn-declarative";

import Button from './slots/Button';
import CheckBox from './slots/CheckBox';
import Combo from './slots/Combo';
import Radio from './slots/Radio';
import Switch from './slots/Switch';
import Text from './slots/Text';
import Typography from './slots/Typography';
import YesNo from './slots/YesNo';

export function SlotFactory({
    children,
}: React.PropsWithChildren<{}>) {
    return (
        <OneSlotFactory
            Button={Button}
            CheckBox={CheckBox}
            Combo={Combo}
            Radio={Radio}
            Switch={Switch}
            Text={Text}
            Typography={Typography}
            YesNo={YesNo}
        >
            {children}
        </OneSlotFactory>
    )
}
