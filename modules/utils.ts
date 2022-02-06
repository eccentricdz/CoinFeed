// @ts-nocheck
import { compose, join, append, split, toLower, concat, __ } from "ramda";
import { SERVER_URL, SOURCES_API, SOURCE_IMAGE_DIR } from "./constants";

export const toSourceImageUrl: (name: string) => string = compose(
    join("/"),
    append(__, [SERVER_URL, SOURCE_IMAGE_DIR]),
    concat(__, ".png"),
    join("-"),
    split(" "),
    toLower
);

export const SOURCES_URL = concat(SERVER_URL, SOURCES_API);
