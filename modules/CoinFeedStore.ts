import { autorun, makeAutoObservable, observable } from "mobx";
import { compose, concat, differenceWith, __ } from "ramda";
import { createContext } from "react";
import { CFArticle } from "../components/Article";
import { Source } from "../components/SourceBuffet";
import { keyComparator } from "./utils";

export interface ArticleStore {
    [_id: string]: Array<CFArticle>;
}

export enum VerticalScrollDirection {
    UP = "up",
    DOWN = "down",
}

export class CoinFeedStore {
    sources: Source[] = [];
    activeSource?: Source = undefined;
    articleStore: ArticleStore = {};

    articleScrollDirection: VerticalScrollDirection =
        VerticalScrollDirection.DOWN;

    constructor() {
        makeAutoObservable(this);
    }

    get areSourcesLoaded(): boolean {
        return this.sources && this.sources.length > 0;
    }

    get sourcesCount(): number {
        return this.sources.length;
    }

    get activeArticles(): Array<CFArticle> {
        return (
            (this.activeSource && this.articleStore[this.activeSource._id]) ||
            []
        );
    }

    get articleCountForActiveSource(): number {
        return (this.activeArticles && this.activeArticles.length) || 0;
    }

    updateSources(sources: Source[]) {
        this.sources = compose(
            concat(this.sources),
            differenceWith(keyComparator<Source, "_id">("_id"), sources)
        )(this.sources);
    }

    replaceSources = (sources: Source[]) => {
        this.sources = sources;
    }

    updateActiveSource(source: Source) {
        this.activeSource = source;
    }

    updateArticleStore(sourceId: string, articles: ReadonlyArray<CFArticle>) {
        const sourceArticles = this.articleStore[sourceId] || [];

        this.articleStore[sourceId] = compose(
            concat(__, sourceArticles),
            differenceWith(keyComparator<CFArticle, "link">("link"), articles)
        )(sourceArticles);
    }

    updateArticleScrollDirection(direction: VerticalScrollDirection) {
        this.articleScrollDirection = direction;
    }
}

const coinFeedStore = new CoinFeedStore();

autorun(() => {
    console.log(`============================================================`);

    console.log(`List of sources: ${JSON.stringify(coinFeedStore.sources)}`);
    console.log(`Sources Loaded: ${coinFeedStore.areSourcesLoaded}`);
    console.log(`Sources Count: ${coinFeedStore.sourcesCount}`);
    console.log(`Active source: ${JSON.stringify(coinFeedStore.activeSource)}`);
    console.log(
        `Articles loaded: ${coinFeedStore.articleCountForActiveSource}`
    );
    console.log(
        `Articles scroll direction: ${coinFeedStore.articleScrollDirection}`
    );
});

export const CoinFeedStoreContext = createContext(coinFeedStore);
export default coinFeedStore;
