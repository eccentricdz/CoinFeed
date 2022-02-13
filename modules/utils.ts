import { formatDistanceToNow } from "date-fns";
import { compose, join, append, split, toLower, concat, __ } from "ramda";
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

export const toArticlesUrl: (id: string) => string = concat(
    concat(SERVER_URL, ARTICLES_API)
);

export const toRelativeTime = (pubDate: string) =>
    formatDistanceToNow(new Date(pubDate), {
        includeSeconds: true,
        addSuffix: true,
    });
