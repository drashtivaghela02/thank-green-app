import React, { useEffect, useState } from 'react';
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import { addToCart } from '../../store/actions/Cart';
import * as cartItem from '../../store/actions/Cart'
import { useDispatch, useSelector } from 'react-redux';


const SearchProducts  = (props) => {
  const cartItems = useSelector(state => state?.cart?.items)
  // console.log("search products ddata",props.param)
  const data = props?.param;

  const [quantityVarientId, setQuantityVarientId] = useState(data?.quantity_variants[0]?.quantity_variant_id ?? '')
  const [cartItemId, setCartitemId] = useState(`${data?.product_id}-${data?.quantity_variants[0]?.quantity_variant_id}`)

  const [selectedOption, setSelectedOption] = useState(data?.quantity_variants[0]?.quantity_variant ?? 'null'); // Assuming the first size as the initial value
  const [actual, setActuals] = useState(data?.quantity_variants[0]?.actual_price ?? 0)
  const [selling, setSelling] = useState(data?.quantity_variants[0]?.selling_price ?? 0)
  const [showOptions, setShowOptions] = useState(false);

  const dispatch = useDispatch();




  return (
    <View>
      <TouchableOpacity
        onPress={() => props.onSelect(data?.product_id, data)}
        style={styles.mainscreen}>
        <TouchableOpacity
          // onPress={() => props.onSelect(data.product_id, data)}
          style={{
            ...styles.imagePreview, ...{
              borderWidth: 2, marginHorizontal: 10, borderRadius: 7,
            }
          }}>
          <Image style={styles.images} source={{ uri: data?.images }} />
        </TouchableOpacity>
        <View style={styles.textcontainer}>
          <Text style={{ fontSize: 16, fontWeight: '500', color: '#555' }}>
            {data?.product_title}
          </Text>
          <View style={{ width: '100%', borderColor: '#555', borderWidth: 1, borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 14, color: '#555' }}>Net wt. {selectedOption}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={styles.selling}>${selling}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Divider />
    </View>
  )
}

const styles = StyleSheet.create({
  mainscreen: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  imagePreview: {
    width: 80,
    height: 80,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'white',
  },
  images: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1e4c5e',
  },
  textcontainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 8, padding: 5
  },
  actual: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    textDecorationLine: 'line-through',
  },
  selling: {
    fontSize: 18,
    fontWeight: '700'
  },
  optionsContainer: {
    position: 'absolute',
    top: 67,
    left: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    zIndex: 1,
    width: '100%'
  },
  Cart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#2c843e',
    borderRadius: 5,
    width: '50%'
  }
});

export default SearchProducts ;