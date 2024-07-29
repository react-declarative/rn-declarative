import { StyleSheet } from "react-native";

export type StyleProperties = Parameters<typeof StyleSheet.create>[0][string];

export default StyleProperties;
