import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
const CategoryFoodHome = (param) => {
  console.log("sfhsulkahfoiahfo;aif;ojOJAdfi", param)
  const data = param.param
  const id = param.param.category_id
  const name = param.param.category_name
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
          <Image style={styles.image} source={{ uri: data.category_image }} />
        </View>
          <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: '500' }}>
            {name}
          </Text>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({

  mainscreen: {
    // flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 10,
    backgroundColor: 'white',
    // paddingHorizontal: 10,
    width: 100,
    height: 120
  },
  imagePreview: {
    width: 70,
    height: 70,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1e4c5e',
  },
  textcontainer: {
    // flex: 1,
    // justifyContent: 'space-between',
    // flexDirection: 'row',
    // paddingLeft: 5

  },

})
export default CategoryFoodHome