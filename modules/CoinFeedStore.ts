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

    get sourcesCount() {
        return this.sources.length;
    }

    updateSources(sources: Source[]) {
        this.sources = sources;
    }

    updateActiveSource(source: Source) {
        this.activeSource = source;
    }
}

const coinFeedStore = new CoinFeedStore();

autorun(() => {
    console.log(`List of sources: ${JSON.stringify(coinFeedStore.sources)}`);
    console.log(`Sources Loaded: ${coinFeedStore.areSourcesLoaded}`);
    console.log(`Sources Count: ${coinFeedStore.sourcesCount}`);
    console.log(`Active source: ${JSON.stringify(coinFeedStore.activeSource)}`);
});

export const CoinFeedStoreContext = createContext(coinFeedStore);
export default coinFeedStore;
