import { Platform } from "react-native";

export const makeTestId = (id: string | undefined) => {
    if (!id) {
        return {};
    }
    return Platform.OS === 'android' ?
        { accessible: true, accessibilityLabel: id } :
        { testID: id };
};

export default makeTestId;
