import * as React from 'react';

import { StyleSheet, View } from "react-native";

import Adjust from './components/Adjust';

import CompiledStyles from '../../../../model/CompiledStyles';

const styles = StyleSheet.create({
    root: {
        flexDirection: 'column',
    },
    withBaseline: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    noBaseline: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

interface IContainerProps {
    style?: CompiledStyles;
    isBaselineAlign?: boolean;
    children: React.ReactNode;
}

export const Container = ({
    style,
    children,
    isBaselineAlign,
}: IContainerProps) => (
    <View style={[styles.root, style]}>
        <View style={isBaselineAlign ? styles.withBaseline : styles.noBaseline}>
            {children} 
        </View>
        {!isBaselineAlign && <Adjust />}
    </View>
);

export default Container;