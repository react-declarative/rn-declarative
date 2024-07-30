import * as React from 'react';

import { StyleSheet, View } from "react-native";

import CompiledStyles from '../../../../model/CompiledStyles';

const styles = StyleSheet.create({
    root: {
        flexDirection: 'column',
    },
});

interface IFieldWrapperProps {
    style?: CompiledStyles;
    children: React.ReactNode;
}

/**
 * Если фон компонента не прозрачый, требуется сделать дополительный блок
 * для `paddingRight`, `paddingBottom`.
 */
export const FieldWrapper = ({
    style,
    children,
}: IFieldWrapperProps) => (
    <View style={[styles.root, style]}>
        {children}
    </View>
);

export default FieldWrapper;
