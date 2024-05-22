import React from "react"
import { createIconSetFromFontello } from "react-native-vector-icons";

import fontelloConfig from "~assets/icons/fontello/config.json";
import { Sizes, Colors } from "~theme";

const FIcon = createIconSetFromFontello(fontelloConfig);
const CIcon = props => {
    const {
        name,
        style,
    } = props;

    return (
        <FIcon
            name={name}
            style={[styles.icon, style]} />
    )
}

const styles = {
    icon: {
        color: Colors.dark,
        fontSize: Sizes.medium,
    }
}

export default CIcon;