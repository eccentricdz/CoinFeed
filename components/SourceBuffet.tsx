import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { CoinFeedStoreContext } from "../modules/CoinFeedStore";
import SourcePebble from "./SourcePebble";

export interface Source {
    name: string;
    feedUrl: string;
    website: string;
    colorOne: string;
    colorTwo: string;
    _id: string;
}

const SourceBuffet = observer(() => {
    const { sources } = useContext(CoinFeedStoreContext);
    return (
        <FlatList
            horizontal
            data={sources}
            renderItem={(prop) => <SourcePebble {...prop}></SourcePebble>}
            keyExtractor={({ _id }) => _id}
            style={styles.buffet}
            contentContainerStyle={styles.bufferContainer}
        />
    );
});

const styles = StyleSheet.create({
    buffet: {
        height: 112,
        position: "absolute",
        width: "100%",
        bottom: 0,
    },
    bufferContainer: {
        padding: 24,
    },
});

export default SourceBuffet;
