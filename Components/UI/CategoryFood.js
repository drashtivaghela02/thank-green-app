import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { View,StyleSheet, Image, Text } from 'react-native'
const CategoryFood = ({text,imagepath,bordercolor}) => {
  return (
    <View style={styles.screen}>
      <View style={styles.mainscreen}>
        <View style={{...styles.imagecontainer,...{bordercolor:bordercolor?bordercolor:'black'}}}>
        <Image style={styles.image} source={imagepath}/>
        </View>
        <View style={styles.textcontainer}>
        <Text>
            {text}
        </Text>
        <MaterialCommunityIcons style={styles.sideicon} size={22} name='arrow-right' color='#CCCCCC' />
        </View>
    </View>
    <View style={styles.line}></View>
            </View>
  )
}
const styles=StyleSheet.create({
    mainscreen:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    sideicon:{
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    imagecontainer:{
        // height:20,
        // width:20,
        borderWidth:2,
        marginHorizontal:5,
    },
    image:{
        width:100,
        height:100,
        resizeMode:'contain',
        tintColor:'red'
    },
    textcontainer:{
        flex:1,
        justifyContent:'space-between',
        flexDirection:'row',
        marginHorizontal:10
    },
    line:{
        borderWidth:1,
        borderColor:'#CCCCCC'
    },
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default CategoryFood