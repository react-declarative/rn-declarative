import * as React from 'react';

import { StyleSheet, View } from "react-native";

import Adjust from '../Adjust';

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
});

interface IContainerProps {
    style?: CompiledStyles;
    children: React.ReactNode;
}

export const Container = ({
    style,
    children,
}: IContainerProps) => (
    <View style={[styles.root, style]}>
        <View style={styles.content}>
            {children} 
        </View>
        <Adjust />
    </View>
);

export default Container;
