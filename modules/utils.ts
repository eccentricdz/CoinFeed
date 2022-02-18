import { formatDistanceToNow } from "date-fns";
import { compose, join, append, split, toLower, concat, __ } from "ramda";
import { CoinFeedStore } from "./CoinFeedStore";
import {
    ARTICLES_API,
    SERVER_URL,
    SOURCES_API,
    SOURCE_IMAGE_DIR,
} from "./constants";

// @ts-ignore
export const toSourceImageUrl: (name: string) => string = compose(
    join("/"),
    // @ts-ignore
    append(__, [SERVER_URL, SOURCE_IMAGE_DIR]),
    concat(__, ".png"),
    join("-"),
    split(" "),
    toLower
);

export const SOURCES_URL = concat(SERVER_URL, SOURCES_API);
export const ARTICLES_URL = concat(SERVER_URL, ARTICLES_API);

export const toRelativeTime = (pubDate: string) =>
    formatDistanceToNow(new Date(pubDate), {
        includeSeconds: true,
        addSuffix: true,
    });

export const fetchSources = async (coinFeedStore: CoinFeedStore) => {
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

/**
 * A curried function that returns a comparator for objects of type T.
 * @param key a valid key in type T
 * @returns a comparator function that compares the key K
 */
export function keyComparator<T, K extends keyof T>(key: K) {
    return (x: T, y: T) => x[key] === y[key];
}

export const peek = <T>(x: T): T => {
    console.log(`Peeking at value: ${x}`);
    return x;
};
