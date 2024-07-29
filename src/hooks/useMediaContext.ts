import { useMemo } from 'react';

import { Theme, useMediaQuery } from '@mui/material';

/**
 * Returns an object containing information about the current media context.
 *
 * @return The media context object.
 * @property isPhone - Indicates whether the current device is a phone.
 * @property isTablet - Indicates whether the current device is a tablet.
 * @property isDesktop - Indicates whether the current device is a desktop.
 * @property isWide - Indicates whether the current device is a tablet or desktop.
 * @property isMobile - Indicates whether the current device is a phone.
 */
export const useMediaContext = () => {
    
    const isPhone = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
    const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between("sm", "lg"));
    const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

    const isWide = isTablet || isDesktop;
    const isMobile = isPhone;

    return useMemo(() => ({
        isPhone,
        isTablet,
        isDesktop,
        isWide,
        isMobile,
    }), [
        isWide,
        isMobile,
        isPhone,
        isTablet,
        isDesktop,
    ]);
};

export default useMediaContext;
