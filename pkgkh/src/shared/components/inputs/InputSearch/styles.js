import { StyleSheet } from "react-native";
import { Colors, Sizes,parseSize } from '~theme';

export default styles = StyleSheet.create({
    container: {
        justifyContent:'center',
    },
    content: {
      marginTop:Sizes.margin,
    },
    wrapInputSearch: {
        height: parseSize(40),
        backgroundColor:Colors.white,
        flexDirection: 'row',
        borderWidth: Sizes.border,
        borderColor: Colors.darkGrey,
        borderRadius: Sizes.radius,
        alignItems: 'center',
        justifyContent:'center',
        paddingHorizontal: Sizes.padding,
    },
    iconSearch: {
        fontSize: 24,
        color: Colors.darkGrey,
    },
    textInputSearch: {
        flex:1,
        marginLeft: Sizes.margin,
        fontFamily: 'Hahmlet-Regular',
        fontSize: 12,
        color: Colors.dark,
    }
});