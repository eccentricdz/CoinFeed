import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { CoinFeedStoreContext } from "../modules/CoinFeedStore";
import Theme from "../modules/theme";
import { toArticlesUrl } from "../modules/utils";
import Article, { CFArticle } from "./Article";
import CFText from "./CFText";
import ArticleLoader from "./Loaders/ArticleLoader";

const SourceArticles = observer(() => {
    const coinFeedStore = useContext(CoinFeedStoreContext);
    const sourceId = coinFeedStore.activeSource?._id;

    const fetchArticles = async (sourceId: string) => {
        try {
            const response = await fetch(toArticlesUrl(sourceId));
            const articles: ReadonlyArray<CFArticle> = await response.json();

            coinFeedStore.updateArticleStore(sourceId, articles);
            return articles;
        } catch (error) {
            console.error(
                `Error occcured while fetching articles for ${sourceId}: ${error}`
            );
        }
    };

    useEffect(() => {
        if (sourceId && !coinFeedStore.articleCountForActiveSource) {
            fetchArticles(sourceId);
        }
    });

    if (sourceId && coinFeedStore.articleCountForActiveSource) {
        return (
            <FlatList
                data={coinFeedStore.articleStore[sourceId]}
                renderItem={(prop) => <Article {...prop}></Article>}
                keyExtractor={({ title }) => title}
                contentContainerStyle={styles.articlesContainer}
            ></FlatList>
        );
    } else
        return <ArticleLoader style={styles.articlesContainer}></ArticleLoader>;
});

const styles = StyleSheet.create({
    articlesContainer: {
        paddingLeft: Theme.spacing.medium,
        paddingRight: Theme.spacing.medium,
        paddingBottom: 135,
    },
});

export default SourceArticles;
