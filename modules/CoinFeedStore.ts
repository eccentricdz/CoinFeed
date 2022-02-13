import { autorun, makeAutoObservable } from "mobx";
import { concat, mergeWith } from "ramda";
import { createContext } from "react";
import { CFArticle } from "../components/Article";
import { Source } from "../components/SourceBuffet";

export interface ArticleStore {
    [_id: string]: ReadonlyArray<CFArticle>;
}

export class CoinFeedStore {
    sources: Source[] = [];
    activeSource?: Source = undefined;
    articleStore: ArticleStore = {};

    constructor() {
        makeAutoObservable(this);
    }

    get areSourcesLoaded(): boolean {
        return this.sources && this.sources.length > 0;
    }

    get sourcesCount(): number {
        return this.sources.length;
    }

    get articleCountForActiveSource(): number {
        return this.activeSource &&
            this.articleStore[this.activeSource._id] &&
            this.articleStore[this.activeSource._id].length || 0;
    }

    updateSources(sources: Source[]) {
        this.sources = sources;
    }

    updateActiveSource(source: Source) {
        this.activeSource = source;
    }

    updateArticleStore(sourceId: string, articles: ReadonlyArray<CFArticle>) {
        const articleStoreInter = mergeWith(
            concat,
            { [sourceId]: articles },
            this.articleStore
        );

        /**
         * Remove the duplicated from the list of articles for a given source.
         */
        this.articleStore[sourceId] = [
            ...new Map<string, CFArticle>(
                articleStoreInter[sourceId].map((article: CFArticle) => [
                    article.title,
                    article,
                ])
            ).values(),
        ];
    }
}

const coinFeedStore = new CoinFeedStore();

autorun(() => {
    console.log(`============================================================`);
    
    console.log(`List of sources: ${JSON.stringify(coinFeedStore.sources)}`);
    console.log(`Sources Loaded: ${coinFeedStore.areSourcesLoaded}`);
    console.log(`Sources Count: ${coinFeedStore.sourcesCount}`);
    console.log(`Active source: ${JSON.stringify(coinFeedStore.activeSource)}`);
    console.log(`Articles loaded: ${coinFeedStore.articleCountForActiveSource}`);
    
});

export const CoinFeedStoreContext = createContext(coinFeedStore);
export default coinFeedStore;
