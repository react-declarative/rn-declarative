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
    children: React.ReactNode;
}

export const WithBaseline = ({
    style,
    children,
}: IWithBaselineProps) => (
    <View style={[styles.root, style]}>
        <View style={styles.withBaseline}>
            {children} 
        </View>
        <Adjust />
    </View>
);

export default WithBaseline;