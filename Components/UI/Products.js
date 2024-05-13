import React, { useState } from 'react';
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";

const Products = (props) => {
  const [selectedOption, setSelectedOption] = useState(props.param.quantity_variants[0].quantity_variant); // Assuming the first size as the initial value
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowOptions(false); // Close the selection list after selecting an option
  };

  const data = props.param;

  return (
    <TouchableOpacity
    // onPress={() => props.onSelect(data.id, data.name)}
    >
      <View style={styles.mainscreen}>
        <View style={{
          ...styles.imagePreview, ...{
            borderWidth: 2, marginHorizontal: 10, borderRadius: 7,
          }
        }}>
          <Image style={styles.images} source={{ uri: data.images }} />
        </View>
        <View style={styles.textcontainer}>
          <Text style={{ fontSize: 16, fontWeight: '500', color: '#555' }}>
            {data.product_description}
          </Text>
          <TouchableOpacity onPress={toggleOptions} style={{ width: '100%', borderColor: '#555', borderWidth: 1, borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 14, color: '#555' }}>{selectedOption}</Text>
            <AntDesign name='down' size={16} color="#888" />

          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={styles.actual}>${data.quantity_variants[0].actual_price}</Text>
              <Text style={styles.selling}>${data.quantity_variants[0].selling_price}</Text>
            </View>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
            {/* <TouchableOpacity onPress={toggleOptions} style={{ marginRight: 8 }}>
                <Text style={{ fontSize: 16, color: '#555' }}>{selectedOption}</Text>
              </TouchableOpacity> */}
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 8, backgroundColor: '#2c843e', borderRadius: 5, width: '50%' }}>
              <MaterialCommunityIcons name="cart-variant" size={24} color='white' />
              <Text style={{ fontSize: 17, fontWeight: '500', color: 'white', marginLeft: 5 }}> Add</Text>
            </TouchableOpacity>
            {/* </View> */}
          </View>

          {showOptions && (
            <View style={styles.optionsContainer}>
              {data.quantity_variants.map((option, index) => (
                <TouchableOpacity key={index} onPress={() => handleOptionSelect(option.quantity_variant)}>
                  <Text>{option.quantity_variant}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
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
    borderColor: 'white'
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
});

export default Products;
