import { useMemo } from "react";

import { StyleSheet } from "react-native";

import StyleProperties from "../../../model/StyleProperties";
import IField from "../../../model/IField";

import { PickProp } from "../../../model/IManaged";
import CompiledStyles from "../../../model/CompiledStyles";

interface IConstraints {
    isPhone: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

interface IStyles {
    style?: PickProp<IField, 'style'>;
    phoneStyle?: PickProp<IField, 'phoneStyle'>;
    tabletStyle?: PickProp<IField, 'tabletStyle'>;
    desktopStyle?: PickProp<IField, 'desktopStyle'>;
}

export const useManagedStyle = (
    {
        isPhone,
        isTablet,
        isDesktop,
    }: IConstraints,
    {
        style: upperStyle,
        phoneStyle: upperPhoneStyle = upperStyle,
        tabletStyle: upperTabletStyle = upperStyle,
        desktopStyle: upperDesktopStyle = upperStyle,
    }: IStyles,
    style: StyleProperties = {}
) => {
    const {
        phoneStyle,
        tabletStyle,
        desktopStyle,
    } = useMemo(() => StyleSheet.create({
        phoneStyle: {
            ...style,
            ...upperPhoneStyle,
        },
        tabletStyle: {
            ...style,
            ...upperTabletStyle,
        },
        desktopStyle: {
            ...style,
            ...upperDesktopStyle,
        },
    }), []);
    return useMemo((): CompiledStyles => {
        if (isPhone) {
            return phoneStyle;
        }
        if (isTablet) {
            return tabletStyle;
        }
        return desktopStyle;
    }, [isPhone, isTablet, isDesktop]);
};

export default useManagedStyle;
