import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const CategoryFoodHome = ({ param,search ,isSelected, onSelect }) => {
  // console.log("onselect home category",param)
  const data = param;
  // const id = param.category_id;
  // const name = param.category_name;
  const id = search ? param.id : param.category_id
  const name = search ? param.name : param.category_name
  const image = search ? param.image : param.category_image
  return (
    <TouchableOpacity onPress={() => onSelect(id, name)}>
      <View style={styles.mainscreen}>
        <View style={[styles.imagePreview,isSelected && styles.selected]}>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
        <Text numberOfLines={1} style={styles.text}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainscreen: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: 100,
    height: 120,
  },
  selected: {
    borderColor: '#2c843e',
    borderWidth: 3,
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
    borderColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1e4c5e',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default CategoryFoodHome;
