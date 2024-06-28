import React, { useEffect, useState } from 'react';
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import { addToCart } from '../../store/reducer/Cart';
import * as cartItem from '../../store/actions/Cart'
import { useDispatch, useSelector } from 'react-redux';


const Products = (props) => {
  console.log("Products from category id", props);
  const cartItems = useSelector(state => state?.cart?.items)

  const data = props.param;

  const [quantityVarientId, setQuantityVarientId] = useState(props?.param?.quantity_variants[0]?.quantity_variant_id ?? '')
  const [cartItemId, setCartitemId] = useState(`${data.product_id}-${data?.quantity_variants[0].quantity_variant_id ?? ''}`)


  const [selectedOption, setSelectedOption] = useState(props?.param?.quantity_variants[0]?.quantity_variant);
  const [actual, setActuals] = useState(props?.param?.quantity_variants[0]?.actual_price)
  const [selling, setSelling] = useState(props?.param?.quantity_variants[0]?.selling_price)
  const [qty, setQty] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  const dispatch = useDispatch();

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (quantityVId) => {
    for (let variant of data?.quantity_variants) {
      if (variant.quantity_variant_id === quantityVId) {
        // console.log("VArients idasdfajfnl.zn ", variant);
        setQuantityVarientId(quantityVId)
        setSelectedOption(variant?.quantity_variant);
        setActuals(variant?.actual_price);
        setSelling(variant?.selling_price);
        setCartitemId(`${data?.product_id}-${quantityVId}`)
      }
    }
    setShowOptions(false);
  };
  useEffect(() => {
    if (cartItems[`${props?.param?.product_id}-${quantityVarientId}`]) {
      console.log("sdhfljh", `${props?.param?.product_id}-${quantityVarientId}`)
      setQty(cartItems[`${props?.param?.product_id}-${quantityVarientId}`]?.quantity)
    }
    else {
      console.log("hiiiezlkjflz");
      setQty(0)
    }
  }, [cartItems])
  // console.log("etwtuoafevy7na8ohyf7ar0n7",data.images)

  return (
    <View>
      <View style={styles.mainscreen}>
        <TouchableOpacity
          onPress={() => props.onSelect(data?.product_id, data)}
          style={{
            ...styles.imagePreview, ...{
              borderWidth: 2, marginHorizontal: 10, borderRadius: 7,
            }
          }}>
          <Image style={styles.images} source={{ uri: data?.images[0] ?? '' }} />
        </TouchableOpacity>
        <View style={styles.textcontainer}>
          <Text style={{ fontSize: 16, fontWeight: '500', color: '#555' }}>
            {data?.product_title}
          </Text>
          <TouchableOpacity onPress={toggleOptions} style={{ width: '100%', borderColor: '#555', borderWidth: 1, borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 14, color: '#555' }}>{selectedOption}</Text>
            <AntDesign name='down' size={16} color="#888" />

          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={styles.actual}>${actual}</Text>
              <Text style={styles.selling}>${selling}</Text>
            </View>

            {qty < 1
              ? (<TouchableOpacity onPress={() => {
                setQty(qty + 1)
                dispatch(cartItem.addToCart(data, quantityVarientId))
              }}
                style={styles.Cart}>
                <MaterialCommunityIcons name="cart-variant" size={24} color='white' />
                <Text style={{ fontSize: 17, fontWeight: '500', color: 'white', marginLeft: 5 }}> Add</Text>
              </TouchableOpacity>)
              : (
                <View style={[styles.Cart, { justifyContent: 'space-between' }]}>

                  <TouchableOpacity onPress={() => {
                    setQty(qty - 1)
                    props.onRemoveItem()
                  }}><AntDesign name="minuscircleo" size={24} color="white" /></TouchableOpacity>

                  <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>{cartItems[cartItemId] ? cartItems[cartItemId]?.quantity : String(qty).padStart(2, '0')}</Text>
                  <TouchableOpacity onPress={() => {
                    setQty(qty + 1)
                    console.log("product lisisting quantity", quantityVarientId)
                    dispatch(cartItem.addToCart(data, quantityVarientId))
                  }}><AntDesign name="pluscircleo" size={24} color="white" /></TouchableOpacity>
                </View>
              )}
          </View>

          {showOptions && (
            <View style={styles.optionsContainer}>
              {data.quantity_variants.map((option, index) => (
                <TouchableOpacity key={index} onPress={() => handleOptionSelect(option?.quantity_variant_id)}>
                  <Text>{option?.quantity_variant}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
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
    fontSize: 16,
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

export default Products;