import { useEffect, useState } from 'react';

import { Dimensions } from 'react-native';

import BehaviorSubject from '../utils/rx/BehaviorSubject';

import singleshot from '../utils/hof/singleshot';

import IBreakpoints from '../model/IBreakpoints';

import useSingleton from './useSingleton';

export const BREAKPOINTS: IBreakpoints = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1536,
};

const GRID_MAX_WIDTH = Number.POSITIVE_INFINITY;

interface IConstraint {
    isPhone: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isWide: boolean;
    isMobile: boolean;
}


/**
 * Represents a function that returns a boolean value indicating whether a given width falls within a specified range.
 *
 * @param from - The lower bound of the range (inclusive).
 * @param to - The upper bound of the range (exclusive).
 * @returns - A function that takes a width and returns true if it is within the specified range, false otherwise.
 */
const match = (from: number, to: number) => (width: number) => width >= from && width < to;

const getConstraintSource = singleshot((breakpoints: IBreakpoints) => {
    const result = new BehaviorSubject<IConstraint>();

    const matchPhone = match(breakpoints.xs, breakpoints.sm);
    const matchTablet = match(breakpoints.sm, breakpoints.lg);
    const matchDesktop = match(breakpoints.lg, GRID_MAX_WIDTH);

    const compute = (width: number) => {
        const isPhone = matchPhone(width);
        const isTablet = matchTablet(width);
        const isDesktop = matchDesktop(width);
        const isWide = isTablet || isDesktop;
        const isMobile = isPhone;
        return {
            isPhone,
            isTablet,
            isDesktop,
            isWide,
            isMobile,
        };
    };

    Dimensions.addEventListener(
        'change',
        ({ window }) => {
          result.next(compute(window.width));
        },
    );

    result.next(compute(Dimensions.get('window').width));

    return result;
});

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
export const useMediaContext = (breakpoints: IBreakpoints = BREAKPOINTS) => {
    const constraintSource = useSingleton(() => getConstraintSource(breakpoints));
    const [constraint, setConstraint] = useState(constraintSource.data!);
    useEffect(() => constraintSource.subscribe(setConstraint), []);
    return constraint;
};

export default useMediaContext;
