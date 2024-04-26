import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
const CategoryFood = ({ text, imagepath, bordercolor, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
        <View style={styles.mainscreen}>
            <View style={{...styles.imagePreview,...{ borderWidth: 2, marginHorizontal: 10, borderRadius: 7, borderColor: bordercolor ? bordercolor : 'black' }}}>
                <Image style={styles.image} source={{uri : imagepath}} />
            </View>
            <View style={styles.textcontainer}>
                <Text style={{ fontSize: 19, fontWeight: '500' }}>
                    {text}
                </Text>
                <MaterialCommunityIcons style={styles.sideicon} size={26} name='arrow-right' color='#CCCCCC' />
            </View>
        </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({

    mainscreen: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'white',
        paddingHorizontal: 10
    },
    imagePreview:{
        width : 80,
        height: 80,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow:'hidden',
        borderWidth: 1,
        borderColor: 'white'
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: '#1e4c5e',
        
    },
    // imageContainer: {
        
    // }
    // image: {
    //     width: 80,
    //     height: 80,
    //     resizeMode: 'contain',
    //     tintColor: 'red'
    // },
    textcontainer: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 5
        // marginHorizontal:10
    },
    // line:{
    //     borderWidth:10,
    //     // borderColor:'#CCCCCC'
    // },

})
export default CategoryFood