import * as React from 'react';

import { StyleSheet, View } from "react-native";

import CompiledStyles from '../../../../../model/CompiledStyles';

const styles = StyleSheet.create({
    root: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

declare module "react-native" {
    interface ViewProps {
        className?: string;
    }
}

interface INoBaselineProps {
    style?: CompiledStyles;
    className?: string;
    children: React.ReactNode;
}

export const NoBaseline = ({
    style,
    children,
    className,
}: INoBaselineProps) => (
    <View className={className} style={[styles.root, style]}>
        {children} 
    </View>
);

export default NoBaseline;