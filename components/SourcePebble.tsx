import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Pressable, Image, StyleSheet } from "react-native";
import { CoinFeedStoreContext } from "../modules/CoinFeedStore";
import { toSourceImageUrl } from "../modules/utils";
import { Source } from "./SourceBuffet";

const SourcePebble = observer(
    ({ item, index }: { item: Source; index: number }) => {
        const coinFeedStore = useContext(CoinFeedStoreContext);
        return (
            <Pressable
                style={
                    index === coinFeedStore.sourcesCount - 1
                        ? StyleSheet.compose(styles.pebbles, styles.lastPebble)
                        : styles.pebbles
                }
                onPress={(_) => coinFeedStore.updateActiveSource(item)}
            >
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
    },
    lastPebble: {
        marginRight: 0,
    },
});

export default SourcePebble;
