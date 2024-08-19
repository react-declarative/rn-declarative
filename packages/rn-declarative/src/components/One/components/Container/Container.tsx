import * as React from 'react';

import WithBaseline from './components/WithBaseline';
import NoBaseline from './components/NoBaseline';

import CompiledStyles from '../../../../model/CompiledStyles';

interface IContainerProps {
    className?: string;
    style?: CompiledStyles;
    isBaselineAlign?: boolean;
    children: React.ReactNode;
}

export const Container = ({
    isBaselineAlign,
    ...otherProps
}: IContainerProps) => isBaselineAlign ? <WithBaseline  {...otherProps} /> : <NoBaseline {...otherProps} />

export default Container;
