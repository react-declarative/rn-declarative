import { StyleSheet } from "react-native";

export type CompiledStyles = ReturnType<typeof StyleSheet.create>[string];

export default CompiledStyles;
