import React, { useState } from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

const FavouriteProductData = (props) => {
  const [favourites, setFavorites] = useState(true)
  let actual_price = '$' + props.param.quantity_variants[0].actual_price
  let selling_price = props.param.quantity_variants[0].selling_price
  if (!selling_price) {
    selling_price = props.param.quantity_variants[0].actual_price
    actual_price = ''
  }

  return (
    <View style={styles.gridItem}>
      <TouchableOpacity style={{ flex: 1 }} onPress={props.onSelect} >
        <View style={styles.container} >
          <View style={{ flex: 1 }}>
            <Image source={{ uri: props.param.images }} style={styles.image} />
            <View style={{position: 'absolute', top: 0, right: 0, padding: 5, backgroundColor:'white',borderBottomLeftRadius: 10, elevation: 6, opacity: 0.8}}>
              {favourites ? <MaterialIcons name="favorite" size={24} color="red" /> :<MaterialIcons name="favorite-border" size={24} color="#888" />}
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5 }}>
            <View>
              <Text numberOfLines={1} style={styles.title}>{props.param.product_title}</Text>
              <Text style={styles.weight}>Net wt. {props.param.quantity_variants[0].quantity_variant}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.actual}>{actual_price}</Text>
              <Text style={styles.selling}>{'$' + selling_price}</Text>
            </View>

          </View>
        </View>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 8, backgroundColor: '#2c843e', width: '100%', }}>
          <MaterialCommunityIcons name="cart-variant" size={24} color='white' />
          <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}> Add</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
   gridItem: {
    width: Dimensions.get('window').width / 2 - 20,
    marginVertical: 10,
    marginRight: 20,
    borderRadius: 8,
    elevation: 8,
    backgroundColor: 'white',
    height: 200,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    flex: 0.9,
    fontSize: 14,
    fontWeight: '600',
    width: '80%'
  },
  weight: {
    fontSize: 11,
    color: '#888',
    fontWeight: '500'
  },
  actual: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    textDecorationLine: 'line-through',
  },
  selling: {
    fontSize: 16,
    fontWeight: '700'
  },
})

export default FavouriteProductData;