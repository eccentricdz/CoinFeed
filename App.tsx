import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";
import { createContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
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
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSources();
    }, []);

    if (coinFeedStore.areSourcesLoaded) {
        return (
            <CoinFeedStoreContext.Provider value={coinFeedStore}>
                <View style={styles.container}>
                    <SourceHeader></SourceHeader>
                    <SourceBuffet></SourceBuffet>
                    <StatusBar style="inverted" />
                </View>
            </CoinFeedStoreContext.Provider>
        );
    } else return <Text>Loading..</Text>
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.color.dark,
        alignItems: "center",
    },
});

export default App;
