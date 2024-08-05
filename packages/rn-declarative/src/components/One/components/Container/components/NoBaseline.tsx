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

interface INoBaselineProps {
    style?: CompiledStyles;
    children: React.ReactNode;
}

export const NoBaseline = ({
    style,
    children,
}: INoBaselineProps) => (
    <View style={[styles.root, style]}>
        {children} 
    </View>
);

export default NoBaseline;