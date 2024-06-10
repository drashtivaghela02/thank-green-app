import React, { useEffect, useState } from 'react';
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import { addToCart } from '../../store/actions/Cart';
import { useDispatch } from 'react-redux';
import * as cartItem from '../../store/actions/Cart'


const CartProduct = (props) => {
  const dispatch = useDispatch();

  const ProductData = props?.param ?? {};
  const data = ProductData?.productData ?? {};
  const quantityVariants = data?.quantity_variants ?? [];

  console.log("Checkout page products", ProductData.quantity)
  const [quantityVarientId, setQuantityVarientId] = useState(quantityVariants[0]?.quantity_variant_id ?? '')
  const [selectedOption, setSelectedOption] = useState(quantityVariants[0]?.quantity_variant ?? '')
  const [actual, setActuals] = useState(quantityVariants[0]?.actual_price ?? 0)
  const [selling, setSelling] = useState(quantityVariants[0]?.selling_price ?? 0)
  const [qty, setQty] = useState(ProductData?.quantity)
  const [showOptions, setShowOptions] = useState(false)

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  useEffect(() => {
    if (ProductData?.quantityId) {
      handleOptionSelect(ProductData?.quantityId)
    }
    setQty(ProductData?.quantity)
  })
  const handleOptionSelect = (quantityVId) => {
    for (let variant of data?.quantity_variants) {
      if (variant.quantity_variant_id === quantityVId) {
        // console.log("VArients idasdfajfnl.zn ", variant);
        setQuantityVarientId(quantityVId)
        setSelectedOption(variant.quantity_variant);
        setActuals(variant.actual_price);
        setSelling(variant.selling_price);
      }
    }
    setShowOptions(false); // Close the selection list after selecting an option
    // dispatch(addToCart(selling))
  };


  return (
    <View>
      <View style={styles.mainscreen}>
        <TouchableOpacity
          onPress={() => props.onSelect(data.product_id, data)}
          style={{
            ...styles.imagePreview, ...{
              borderWidth: 2, marginRight: 10, borderRadius: 7,
            }
          }}>
          <Image style={styles.images} source={{ uri: data?.images?.[0] }} />
        </TouchableOpacity>
        <View style={styles.textcontainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#555' }}>
              {data?.product_title}
            </Text>
            <AntDesign name="delete" size={20} color="black" onPress={props.onDeleteItem} />
          </View>
          <TouchableOpacity
            // onPress={toggleOptions}
            style={{ width: '100%', borderColor: '#555', borderWidth: 1, borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 14, color: '#555' }}>{selectedOption}</Text>
            {/* <AntDesign name='down' size={16} color="#888" /> */}

          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <Text style={styles.selling}>${selling}</Text>
              <Text style={styles.actual}>${actual}</Text>
            </View>


            <View style={[styles.Cart, { gap: 15 }]}>

              <TouchableOpacity
                disabled={qty <= 1}
                onPress={() => {
                  setQty(qty - 1)
                  props.onRemoveItem()
                }}>
                <AntDesign name="minuscircleo" size={25} />
              </TouchableOpacity>

              <Text style={{ fontSize: 20, fontWeight: '500', }}>{String(qty).padStart(2, '0')}</Text>
              <TouchableOpacity
                onPress={() => {
                  setQty(qty + 1)
                  props.onAddItem()
                }} >
                <AntDesign name="pluscircleo" size={25} />
              </TouchableOpacity>
            </View>

          </View>

          {showOptions && (
            <View style={styles.optionsContainer}>
              {data.quantity_variants.map((option, index) => (
                <TouchableOpacity key={index} onPress={() => { handleOptionSelect(option?.quantity_variant_id) }}>
                  <Text>{option?.quantity_variant}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  mainscreen: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
    paddingHorizontal: 20,
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
    fontSize: 14,
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
    justifyContent: 'flex-end',
    padding: 8,
    paddingRight: 0,
    borderRadius: 5,
    width: '50%'
  }
});

export default CartProduct;