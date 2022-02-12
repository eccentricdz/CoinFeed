import { observer } from "mobx-react-lite";
import { View } from "react-native";
import React, { useContext } from "react";
import { CoinFeedStoreContext } from "../modules/CoinFeedStore";
import CFText, { CFTypography } from "./CFText";

const SourceHeader = observer(() => {
    const { activeSource } = useContext(CoinFeedStoreContext);
    return (
        <View>
            <CFText type={CFTypography.H1}>{activeSource?.name || ""}</CFText>
            <CFText>{activeSource?.website || ""}</CFText>
        </View>
    );
});

export default SourceHeader;
