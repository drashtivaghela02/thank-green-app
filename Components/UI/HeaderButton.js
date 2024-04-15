import { AntDesign, Ionicons, FontAwesome} from '@expo/vector-icons';
import React from 'react';
import { Platform } from 'react-native';

import { HeaderButtons } from 'react-navigation-header-buttons';

const CustomHeaderButtun = props => {
    return <HeaderButtons 
        {...props} 
        IconComponent = {FontAwesome}
        iconSize={23}
        color='blue'
    />
};
export default CustomHeaderButtun;