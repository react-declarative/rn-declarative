import * as React from 'react';
import { useMemo } from 'react';

import { H1, H2, H3, H4, P, Large, Small } from '~/components/ui/typography';

import { ITypographySlot } from 'rn-declarative';

const componentMap = {
    'h1': H1,
    'h2': H2,
    'h3': H3,
    'h4': H4,
    'body1': P,
    'body2': P,
    'subtitle1': Large,
    'subtitle2': Large,
    'caption': Small,
    'h5': P,
    'h6': P,
} as const;

export const Typography = ({
    value,
    placeholder,
    typoVariant,
}: ITypographySlot) => {

    const Component = useMemo(() => {
        return componentMap[typoVariant!] || P;
    }, [typoVariant]);

    return (
        <Component>
            {value || placeholder}
        </Component>
    )
};

export default Typography;
