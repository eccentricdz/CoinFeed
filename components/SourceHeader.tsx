import { observer } from "mobx-react-lite";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { CoinFeedStoreContext } from "../modules/CoinFeedStore";
import CFText, { CFTypography } from "./CFText";
import { Feather } from "@expo/vector-icons";
import Theme from "../modules/theme";
import Divider, { DividerType } from "./Divider";
import { concat } from "ramda";
import * as WebBrowser from "expo-web-browser";
import HeaderLoader from "./Loaders/HeaderLoader";

const SourceHeader = observer(() => {
    const { activeSource } = useContext(CoinFeedStoreContext);
    const handlePress = () =>
        WebBrowser.openBrowserAsync(toUrl(activeSource?.website || ""));
    if (activeSource) {
        return (
            <Pressable style={styles.container} onPress={handlePress}>
                <CFText type={CFTypography.H1}>
                    {activeSource?.name || ""}
                </CFText>
                <View style={styles.websiteRow}>
                    <CFText type={CFTypography.H4}>
                        {activeSource?.website || ""}
                    </CFText>
                    <Feather
                        name="arrow-up-right"
                        size={14}
                        color={Theme.color.gray}
                    />
                </View>
                <Divider
                    type={DividerType.THICK}
                    style={{ backgroundColor: activeSource.colorOne }}
                ></Divider>
            </Pressable>
        );
    } else return <HeaderLoader style={styles.container}></HeaderLoader>;
});

const toUrl = (hostname: string) => concat("https://", hostname);

const styles = StyleSheet.create({
    websiteRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: Theme.spacing.small,
        marginBottom: 26,
    },
    container: {
        width: "100%",
        paddingLeft: Theme.spacing.medium,
        paddingRight: Theme.spacing.medium,
        paddingTop: 88,
    },
});

export default SourceHeader;
