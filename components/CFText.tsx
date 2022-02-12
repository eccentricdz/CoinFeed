import { prop } from "ramda";
import { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TextComponent, TextStyle } from "react-native";
import Theme from "../modules/theme";

export enum CFTypography {
    BASE = "base",
    H1 = "h1",
    H3 = "h3",
    H4 = "h4",
}

const CFText = ({
    type,
    children,
    ...props
}: {
    type?: CFTypography;
    children?: ReactNode;
}) => <Text style={textStyles[type || CFTypography.BASE]} {...props}>{children}</Text>;

const styles: { [key: string]: StyleProp<TextStyle> } = StyleSheet.create({
    base: {
        color: Theme.color.base,
        fontFamily: "sans-serif",
        fontSize: 16,
    },
    h1: {
        textTransform: "uppercase",
        fontSize: 30,
        fontWeight: "bold"
    },
});

const { base } = styles;
const h1 = StyleSheet.compose(base, styles.h1);
const textStyles: { [key: string]: StyleProp<TextStyle> } = { base, h1 };

export default CFText;
