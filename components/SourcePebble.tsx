import { Pressable, Image } from "react-native";
import { toSourceImageUrl } from "../modules/utils";
import { Source } from "./SourceBuffet";

const SourcePebble = ({ item }: { item: Source }) => {
    console.log(toSourceImageUrl(item.name));
    return (
        <Pressable>
            <Image
                source={{
                    uri: toSourceImageUrl(item.name),
                    width: 64,
                    height: 64,
                }}
            ></Image>
        </Pressable>
    );
};

export default SourcePebble;
