import React from 'react';
import {Icon} from 'react-native-elements';
import { Sizes } from '~theme';

export const IconType = {
    material: 'material',
    materialCommunity: 'material-community',
    simpleLineIcon: 'simple-line-icon',
    zocial: 'zocial',
    fontAwesome: 'font-awesome',
    octicon: 'octicon',
    ionicon: 'ionicon',
    foundation: 'foundation',
    evilicon: 'evilicon',
    entypo: 'entypo',
    antdesign: 'antdesign',

};

const IconVector = props => {
    const {name, size, style, type, color, onPress} = props;
   return (
       <Icon
           name={name || ''}
           size={size || Sizes.medium}
           style={style || 'regular'}
           type={type || 'material-community'}
           color={color || 'black'}
           onPress={onPress}
       />
   )
};

export default IconVector;