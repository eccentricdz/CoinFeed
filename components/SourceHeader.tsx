import { observer } from "mobx-react-lite";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { CoinFeedStoreContext } from "../modules/CoinFeedStore";
import CFText, { CFTypography } from "./CFText";
import { Feather } from '@expo/vector-icons';
import Theme from "../modules/theme";
import Divider, { DividerType } from "./Divider";
import { concat } from "ramda";
import * as WebBrowser from 'expo-web-browser';

const SourceHeader = observer(() => {
    const { activeSource } = useContext(CoinFeedStoreContext);
    const handlePress = () => WebBrowser.openBrowserAsync(toUrl(activeSource?.website || ""))
    return (
        <Pressable style={styles.container} onPress={handlePress}>
            <CFText type={CFTypography.H1}>{activeSource?.name || ""}</CFText>
            <View style={styles.websiteRow}>
                <CFText type={CFTypography.H4}>{activeSource?.website || ""}</CFText>
                <Feather name="arrow-up-right" size={14} color={Theme.color.gray} />
            </View>
            <Divider type={DividerType.THICK}></Divider>
        </Pressable>
    );
});

const toUrl = (hostname: string) => concat("https://", hostname)

const styles = StyleSheet.create({
    websiteRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
        marginBottom: 26
    },
    container: {
        width: "100%",
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 88 
    }
})

export default SourceHeader;
