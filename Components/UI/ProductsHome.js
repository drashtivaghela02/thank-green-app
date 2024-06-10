import React, { useEffect, useState } from "react";
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import * as cartItem from '../../store/actions/Cart'
import { useDispatch, useSelector } from 'react-redux';

const ProductsHome = (props) => {
  const cartItems = useSelector(state => state?.cart?.items)
  const favoriteProductIds = useSelector(state => state.product.favoriteProductIds);
  const id = props.param.product_id;
  const data = props.param;
  const [qty, setQty] = useState(0);
  const [fav, setFav] = useState(props.favourites ? props.favourites : data?.is_favorite)
  const dispatch = useDispatch();
  console.log("Home product data", data)
  let actual_price = '$' + data.quantity_variants[0].actual_price ?? 0
  let selling_price = data.quantity_variants[0].selling_price ?? 0
  // if (!selling_price) {
  //   selling_price = data.quantity_variants[0].actual_price
  //   actual_price = ''
  // }

  useEffect(() => {
    if (cartItems[`${id}-${data.quantity_variants[0].quantity_variant_id}`]) {
      setQty(cartItems[`${id}-${data.quantity_variants[0].quantity_variant_id}`]?.quantity)
    }
    else {
      console.log("hiiiezlkjflz");
    }
    if (favoriteProductIds[id]) {
      console.log("yesyesyesyeysyeysy")
      setFav(1);
    }

  })

  return (
    <View style={styles.gridItem}>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => props.onSelect(id, data)} >
        <View style={styles.container} >
          <View style={{ flex: 1 }}>
            <Image source={{ uri: data.images[0] }} style={styles.image} />
            <View style={{ position: 'absolute', top: 0, right: 0, padding: 5, backgroundColor: 'white', borderBottomLeftRadius: 10, elevation: 6, opacity: 0.8 }}>
              {fav === 1 ? <MaterialIcons name="favorite" size={24} color="red" /> : <MaterialIcons name="favorite-border" size={24} color="#888" />}
            </View>
          </View>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5 }}>
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={styles.title}>{data.product_title}</Text>
              <Text style={styles.weight}>Net wt. {data.quantity_variants[0].quantity_variant}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.actual}>{actual_price}</Text>
              <Text style={styles.selling}>{'$' + selling_price}</Text>
            </View>

          </View>
        </View>
        {qty < 1
          ? (
            <TouchableOpacity
              onPress={() => {
                setQty(qty + 1)
                dispatch(cartItem.addToCart(data, data?.quantity_variants[0]?.quantity_variant_id))
              }}
              style={styles.qtyContainer1}>
              <MaterialCommunityIcons name="cart-variant" size={24} color='white' />
              <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}> Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.qtyContainer2}>
              <TouchableOpacity onPress={() => {
                setQty(qty + 1)
                dispatch(cartItem.addToCart(data, data?.quantity_variants[0]?.quantity_variant_id))
              }}>
                <AntDesign name="pluscircleo" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{String(qty).padStart(2, '0')}</Text>
              <TouchableOpacity onPress={() => {
                setQty(qty - 1)
                props.onRemoveItem()
              }}>
                <AntDesign name="minuscircleo" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
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
    // width: '90%'
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
  qtyContainer1: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 8, backgroundColor: '#2c843e', width: '100%', },
  qtyContainer2: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', padding: 8, backgroundColor: '#2c843e', width: '100%', },
  qtyText: { fontSize: 17, fontWeight: '500', color: 'white' }
})

export default ProductsHome;