import * as React from 'react';

import { StyleSheet, View } from "react-native";

import Adjust from './components/Adjust';

import CompiledStyles from '../../../../model/CompiledStyles';

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    withBaseline: {
        alignItems: 'flex-end',
    },
    noBaseline: {
        alignItems: 'flex-start',
    },
});

interface IContainerProps {
    style?: CompiledStyles;
    isBaselineAlign?: boolean;
    children: React.ReactNode;
}

export const Container = ({
    isBaselineAlign,
    style,
    children,
}: IContainerProps) => (
    <View style={[styles.root, isBaselineAlign ? styles.withBaseline : styles.noBaseline, style]}>
        <View style={styles.content}>
            {children} 
        </View>
        <Adjust />
    </View>
);

export default Container;
