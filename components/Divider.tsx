import { StyleSheet, View, ViewProps } from "react-native";
import Theme from "../modules/theme";

export enum DividerType {
    THICK = 4,
    THIN = 2,
}

const Divider = ({ type, ...props }: { type: DividerType } & Partial<ViewProps>) => {
    return (
        <View
            style={StyleSheet.flatten([styles.divider, { height: type }, props?.style])}
        ></View>
    );
};

const styles = StyleSheet.create({
    divider: {
        backgroundColor: Theme.color.base,
    },
});

export default Divider;
