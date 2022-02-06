import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { FlatList, Text } from "react-native";
import { CoinFeedStoreContext } from "../modules/CoinFeedStore";
import SourcePebble from "./SourcePebble";

export interface Source {
    name: string;
    url: string;
    colorOne: string;
    colorTwo: string;
    _id: string;
}

const SourceBuffet = observer(() => {
    const { areSourcesLoaded, sources } = useContext(CoinFeedStoreContext);
    if (areSourcesLoaded) {
        return (
            <FlatList
                horizontal
                data={sources}
                renderItem={SourcePebble}
                keyExtractor={({ _id }) => _id}
            />
        );
    } else return <Text>Loading..</Text>;
});

export default SourceBuffet;
