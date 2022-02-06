import { autorun, makeAutoObservable } from "mobx";
import { createContext } from "react";
import { Source } from "../components/SourceBuffet";

export class CoinFeedStore {
    sources: Source[] = [];
    activeSource?: Source = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    get areSourcesLoaded() {
        return this.sources && this.sources.length > 0;
    }

    updateSources(sources: Source[]) {
        this.sources = sources;
    }
}

const coinFeedStore = new CoinFeedStore();

autorun(() => {
    console.log(`List of sources: ${JSON.stringify(coinFeedStore)}`);
    console.log(`Sources Loaded: ${coinFeedStore.areSourcesLoaded}`)
});

export const CoinFeedStoreContext = createContext(coinFeedStore);
export default coinFeedStore;
