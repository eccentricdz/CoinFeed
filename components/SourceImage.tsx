import { Source } from "./SourceBuffet";
import { Image, ImageProps } from "react-native";
import { toSourceImageUrl } from "../modules/utils";

const SourceImage = ({ item: { name }, size, ...rest }: { item: Source, size?: number } & Partial<ImageProps>) => {    
    return (
        <Image
            progressiveRenderingEnabled
            source={{
                uri: toSourceImageUrl(name),
                width: size || 64,
                height: size || 64,
            }}
            {...rest}
        ></Image>
    );
};

export default SourceImage;
