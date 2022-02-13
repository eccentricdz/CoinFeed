import { LinearGradient } from "expo-linear-gradient";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { CoinFeedStoreContext } from "../modules/CoinFeedStore";
import Theme from "../modules/theme";
import SourcePebble from "./SourcePebble";
import SourceLoader from "./Loaders/SourceLoader";

export interface Source {
    name: string;
    feedUrl: string;
    website: string;
    colorOne: string;
    colorTwo: string;
    _id: string;
}

const SourceBuffet = observer(() => {
    const { sources, areSourcesLoaded } = useContext(CoinFeedStoreContext);
    if (areSourcesLoaded) {
        return (
            <View style={styles.container}>
                <LinearGradient
                    style={styles.gradient}
                    colors={["transparent", Theme.color.dark]}
                ></LinearGradient>
                <FlatList
                    horizontal
                    data={sources}
                    renderItem={(prop) => (
                        <SourcePebble {...prop}></SourcePebble>
                    )}
                    keyExtractor={({ _id }) => _id}
                    style={styles.buffet}
                    contentContainerStyle={styles.bufferContainer}
                />
            </View>
        );
    } else {
        return <SourceLoader style={styles.container}></SourceLoader>
    }
});

const styles = StyleSheet.create({
    buffet: {
        height: 112,
    },
    bufferContainer: {
        padding: 24,
        backgroundColor: Theme.color.dark,
        margin: 0,
    },
    gradient: {
        height: 50,
        margin: 0,
        transform: [{ translateY: 1 }],
    },
    container: {
        width: "100%",
        height: 162,
        position: "absolute",
        bottom: 0,
    },
});

export default SourceBuffet;
