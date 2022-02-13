import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Pressable, Image, StyleSheet, View } from "react-native";
import { CoinFeedStoreContext } from "../modules/CoinFeedStore";
import { toSourceImageUrl } from "../modules/utils";
import { Source } from "./SourceBuffet";

const Highlight = ({ isActive, color }: { isActive: boolean; color: string }) =>
    isActive ? (
        <View
            style={StyleSheet.flatten([
                styles.hightlight,
                { backgroundColor: color },
            ])}
        ></View>
    ) : null;

const SourcePebble = observer(
    ({ item, index }: { item: Source; index: number }) => {
        const coinFeedStore = useContext(CoinFeedStoreContext);
        const isActive = coinFeedStore.activeSource?._id === item._id;
        
        return (
            <Pressable
                style={
                    index === coinFeedStore.sourcesCount - 1
                        ? StyleSheet.compose(styles.pebbles, styles.lastPebble)
                        : styles.pebbles
                }
                onPress={(_) => coinFeedStore.updateActiveSource(item)}
            >
                <Highlight
                    isActive={isActive}
                    color={item.colorOne}
                ></Highlight>
                <Image
                    progressiveRenderingEnabled
                    source={{
                        uri: toSourceImageUrl(item.name),
                        width: 64,
                        height: 64,
                    }}
                ></Image>
            </Pressable>
        );
    }
);

const styles = StyleSheet.create({
    pebbles: {
        marginRight: 16,
        zIndex: 0.5,
        alignItems: "center",
    },
    lastPebble: {
        marginRight: 0,
    },
    hightlight: {
        height: 8,
        width: 8,
        borderRadius: 8,
        position: "absolute",
        top: -20,
        left: 28,
    },
});

export default SourcePebble;
