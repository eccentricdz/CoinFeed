import { LinearGradient } from "expo-linear-gradient";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useRef } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Animated } from "react-native";
import {
    CoinFeedStoreContext,
    VerticalScrollDirection,
} from "../modules/CoinFeedStore";
import Theme from "../modules/theme";
import SourcePebble from "./SourcePebble";
import SourceLoader from "./Loaders/SourceLoader";
import { compose } from "ramda";

export interface Source {
    name: string;
    feedUrl: string;
    website: string;
    colorOne: string;
    colorTwo: string;
    _id: string;
}

const SourceBuffet = observer(() => {
    const { sources, articleScrollDirection } =
        useContext(CoinFeedStoreContext);
    const sourceBufferPos = useRef(new Animated.Value(0)).current;

    const slideUp = () => {
        Animated.timing(sourceBufferPos, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const slideDown = () => {
        Animated.timing(sourceBufferPos, {
            toValue: 162,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        if (articleScrollDirection === VerticalScrollDirection.UP) slideDown();
        else slideUp();
    }, [articleScrollDirection]);

    return (
        <Animated.View
            style={StyleSheet.flatten([
                styles.container,
                { transform: [{ translateY: sourceBufferPos }] },
            ])}
        >
            <LinearGradient
                style={styles.gradient}
                colors={["transparent", Theme.color.dark]}
            ></LinearGradient>
            <FlatList
                horizontal
                data={sources}
                renderItem={(prop) => <SourcePebble {...prop}></SourcePebble>}
                keyExtractor={({ _id }) => _id}
                style={styles.buffet}
                contentContainerStyle={styles.bufferContainer}
                ListEmptyComponent={() => (
                    <SourceLoader style={styles.bufferContainer}></SourceLoader>
                )}
                initialNumToRender={5}
            />
        </Animated.View>
    );
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
