import * as React from 'react';

import { StyleSheet, View } from "react-native";

import Adjust from './Adjust';

import CompiledStyles from '../../../../../model/CompiledStyles';

const styles = StyleSheet.create({
    root: {
        flexDirection: 'column',
    },
    withBaseline: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

interface IWithBaselineProps {
    style?: CompiledStyles;
    className?: string;
    children: React.ReactNode;
}

declare module "react-native" {
    interface ViewProps {
        className?: string;
    }
}

export const WithBaseline = ({
    style,
    children,
    className,
}: IWithBaselineProps) => (
    <View className={className} style={[styles.root, style]}>
        <View style={styles.withBaseline}>
            {children} 
        </View>
        <Adjust />
    </View>
);

export default WithBaseline;