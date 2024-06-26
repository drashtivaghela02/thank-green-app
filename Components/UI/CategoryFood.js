import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
const CategoryFood = (param) => {
    // console.log("sfhsulkahfoiahfo;aif;ojOJAdfi", param.param)
    const data = param.param
    const id = param.search ? param.param.id :param.param.category_id
    const name = param.search ? param.param.name : param.param.category_name
    const image = param.search ? param.param.image : param.param.category_image
    const subcategories = param.param.subcategories


    return (
        <TouchableOpacity onPress={() => param.onSelect(id, name, subcategories)}>
        <View style={styles.mainscreen}>
                <View style={{
                    ...styles.imagePreview, ...{
                        borderWidth: 2, marginHorizontal: 10, borderRadius: 7,
                        // borderColor: bordercolor ? bordercolor : 'black'
                    }
                }}>
                <Image style={styles.image} source={{uri : image}} />
            </View>
            <View style={styles.textcontainer}>
                <Text style={{ fontSize: 19, fontWeight: '500', width: '85%' }} numberOfLines={1}>
                    {name}
                </Text>
                <MaterialCommunityIcons style={styles.sideicon} size={26} name='arrow-right' color='#CCCCCC' />
            </View>
        </View>
        <Divider />
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