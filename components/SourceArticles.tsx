import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { CoinFeedStoreContext } from "../modules/CoinFeedStore";
import Theme from "../modules/theme";
import { toArticlesUrl } from "../modules/utils";
import Article, { CFArticle } from "./Article";
import Divider, { DividerType } from "./Divider";
import ArticleLoader from "./Loaders/ArticleLoader";

const SourceArticles = observer(() => {
    const coinFeedStore = useContext(CoinFeedStoreContext);
    const sourceId = coinFeedStore.activeSource?._id;
    const articles =
        (sourceId &&
            coinFeedStore.articleCountForActiveSource &&
            coinFeedStore.articleStore[sourceId]) ||
        [];
    const [refreshing, setRefreshing] = useState(false);

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

    const handleRefresh = async () => {
        setRefreshing(true);
        if (sourceId) await fetchArticles(sourceId);
        setRefreshing(false);
    }

    useEffect(() => {
        if (sourceId && !coinFeedStore.articleCountForActiveSource) {
            fetchArticles(sourceId);
        }
    });

    return (
        <FlatList
            data={articles}
            renderItem={(prop) => <Article {...prop}></Article>}
            keyExtractor={({ title }) => title}
            contentContainerStyle={styles.articlesContainer}
            ItemSeparatorComponent={() => (
                <Divider type={DividerType.THIN}></Divider>
            )}
            ListEmptyComponent={() => (
                <ArticleLoader style={styles.articlesContainer}></ArticleLoader>
            )}
            initialNumToRender={5}
            onRefresh={handleRefresh}
            refreshing={refreshing}
        ></FlatList>
    );
});

const styles = StyleSheet.create({
    articlesContainer: {
        paddingLeft: Theme.spacing.medium,
        paddingRight: Theme.spacing.medium,
        paddingBottom: 135,
    },
});

export default SourceArticles;
