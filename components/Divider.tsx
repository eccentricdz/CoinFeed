import { StyleSheet, View } from "react-native";
import Theme from "../modules/theme";

export enum DividerType {
    THICK = 4,
    THIN = 2,
}

const Divider = ({ type }: { type: DividerType }) => {
    return (
        <View
            style={StyleSheet.flatten([styles.divider, { height: type }])}
        ></View>
    );
};

const styles = StyleSheet.create({
    divider: {
        backgroundColor: Theme.color.base,
    },
});

export default Divider;
