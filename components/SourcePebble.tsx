import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Pressable, Image, StyleSheet } from "react-native";
import { CoinFeedStoreContext } from "../modules/CoinFeedStore";
import { toSourceImageUrl } from "../modules/utils";
import Divider, { DividerType } from "./Divider";
import { Source } from "./SourceBuffet";

const Highlight = ({ isActive }: { isActive: boolean }) =>
    isActive ? (
        <Divider type={DividerType.THICK} style={styles.hightlight}></Divider>
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
                <Image
                    progressiveRenderingEnabled
                    source={{
                        uri: toSourceImageUrl(item.name),
                        width: 64,
                        height: 64,
                    }}
                ></Image>
                <Highlight isActive={isActive}></Highlight>
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
    hightlight: {
        transform: [{ translateY: 20 }],
    },
});

export default SourcePebble;
