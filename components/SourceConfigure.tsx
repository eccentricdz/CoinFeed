import { Pressable, View, StyleSheet } from "react-native";
import {
    RenderItemParams,
} from "react-native-draggable-flatlist";
import Theme from "../modules/theme";
import CFText from "./CFText";
import { Source } from "./SourceBuffet";
import SourceImage from "./SourceImage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";

const SourceConfigure = ({
    item,
    isActive,
    drag,
}: RenderItemParams<Source>) => {
    return (
            <Pressable
                onLongPress={() => {
                    drag();
                    impactAsync(ImpactFeedbackStyle.Light);
                }}
                disabled={isActive}
                style={styles.listItem}
            >
                <View style={styles.listItemLeft}>
                    <MaterialCommunityIcons
                        name="drag-vertical"
                        size={30}
                        color={Theme.color.gray}
                    />
                    <SourceImage
                        item={item}
                        size={48}
                        style={{
                            marginEnd: Theme.spacing.medium,
                            marginStart: Theme.spacing.medium,
                        }}
                    ></SourceImage>
                    <CFText>{item.name}</CFText>
                </View>
                <View></View>
            </Pressable>
    );
};

const styles = StyleSheet.create({
    listItem: {
        width: "100%"
    },
    listItemLeft: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: Theme.spacing.medium,
        paddingBottom: Theme.spacing.medium,
        justifyContent: "flex-start"
    },
});

export default SourceConfigure;
