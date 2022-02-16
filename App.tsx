import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import SourceArticles from "./components/SourceArticles";
import SourceBuffet from "./components/SourceBuffet";
import SourceHeader from "./components/SourceHeader";
import coinFeedStore, { CoinFeedStoreContext } from "./modules/CoinFeedStore";
import Theme from "./modules/theme";
import { fetchSources } from "./modules/utils";
import AppLoading from "expo-app-loading";

const App = observer(() => {
    useEffect(() => {
        fetchSources(coinFeedStore);
    }, []);

    if (coinFeedStore.activeSource) {
        return (
            <CoinFeedStoreContext.Provider value={coinFeedStore}>
                <View style={styles.container}>
                    <SourceHeader></SourceHeader>
                    <SourceArticles></SourceArticles>
                    <SourceBuffet></SourceBuffet>
                    <StatusBar style="inverted" />
                </View>
            </CoinFeedStoreContext.Provider>
        );
    } else return <AppLoading></AppLoading>;
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.color.dark,
        alignItems: "center",
    },
});

export default App;
