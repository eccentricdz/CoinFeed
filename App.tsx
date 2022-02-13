import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";
import { createContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CFText from "./components/CFText";
import SourceArticles from "./components/SourceArticles";
import SourceBuffet from "./components/SourceBuffet";
import SourceHeader from "./components/SourceHeader";
import coinFeedStore, { CoinFeedStoreContext } from "./modules/CoinFeedStore";
import Theme from "./modules/theme";
import { SOURCES_URL } from "./modules/utils";

const App = observer(() => {
    const fetchSources = async () => {
        try {
            const response = await fetch(SOURCES_URL);
            const sources = await response.json();
            coinFeedStore.updateSources(sources);
            if (!coinFeedStore.activeSource)
                coinFeedStore.updateActiveSource(sources[0]);
        } catch (error) {
            console.error(`Error occured while fetching sources: ${error}`);
        }
    };

    useEffect(() => {
        fetchSources();
    }, []);

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
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.color.dark,
        alignItems: "center",
    },
});

export default App;
