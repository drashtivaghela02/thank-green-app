import { AntDesign, Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as productAction from '../../store/actions/Products';
import Products from "../../Components/UI/Products";


const ProductDescription = props => {
  const ProductId = props.route.params.ProductId;
  const data = props.route.params.data;
  console.log("hello", ProductId, data)

  const accessToken = useSelector(state => state.auth.accessToken)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [resData, setResdata] = useState();
  const [selectedOption, setSelectedOption] = useState(data.quantity_variants[0].quantity_variant); // Assuming the first size as the initial value
  const [isFavourite, setIsFavourite] = useState(data.is_favorite)
  const [actual, setActuals] = useState(data.quantity_variants[0].actual_price)
  const [selling, setSelling] = useState(data.quantity_variants[0].selling_price)
  const [qty, setQty] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (quantity_variant, selling, actual) => {
    setSelectedOption(quantity_variant);
    setActuals(actual);
    setSelling(selling);
    setShowOptions(false); // Close the selection list after selecting an option
    // dispatch(addToCart(selling))
  };
  // useEffect(() => {
  //   setIsLoading(true);
  //   dispatch(productAction.getProducts(SubCategoryId, accessToken))
  //     .then((response) => {
  //       setIsLoading(false);
  //       console.log("sgdagfv xzv=> ", response?.data)
  //       setResdata(response?.data);
  //     })
  //     .catch(error => {
  //       setIsLoading(false);
  //       console.error("Error fetching user information:", error);
  //     });
  // }, [accessToken])

  // const onProductSelectHandler = (id) => {
  //   props.navigation.navigate('ProductDescription', { ProductId: id })
  // }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2c843e', '#1e4c5e']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.6, y: 1 }}
      >
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <AntDesign name="arrowleft" size={28} color='white' onPress={() => { props.navigation.goBack() }} />
            <MaterialCommunityIcons name="cart-variant" size={28} color="white" />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, }}>
            <Text numberOfLines={1} style={styles.heading}>{data.product_title}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <View style={{ width: '100%' }}>
          <Image source={{ uri: data.images }} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height * 0.35, }} />
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
            <View>
              <Text style={styles.title}>{data.product_title}</Text>
              <Text style={styles.quantity}>Net wt.{selectedOption}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.actual}>${actual}</Text>
              <Text style={styles.selling}>${selling}</Text>
            </View>
          </View>
          <Text style={{ fontSize: 14, color: '#666', }}>{data.product_description}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '500' }}>Quantity</Text>
            <View style={[styles.Cart, { justifyContent: 'space-between', alignItems: 'center' }]}>
              <TouchableOpacity onPress={() => setQty(qty + 1)}><AntDesign name="pluscircleo" size={24} color="#666" /></TouchableOpacity>
              <Text style={{ fontSize: 18, fontWeight: '500', color: '#666' }}>{qty}</Text>
              <TouchableOpacity onPress={() => setQty(qty - 1)}><AntDesign name="minuscircleo" size={24} color="#666" /></TouchableOpacity>
            </View>
          </View>


          <View style={{ marginBottom: 15 }}>

            <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: 5 }}>Size</Text>
            <TouchableOpacity onPress={toggleOptions} style={{ width: '100%', borderColor: '#f0f0f0', backgroundColor: '#f0f0f0', borderWidth: 1, borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, paddingHorizontal: 10 }}>
              <Text style={{ fontSize: 14, color: '#555' }}>{selectedOption}</Text>
              <AntDesign name='down' size={16} color="#888" />

            </TouchableOpacity>
            {showOptions && (
              <View style={styles.optionsContainer}>
                {data.quantity_variants.map((option, index) => (
                  <TouchableOpacity key={index} onPress={() => handleOptionSelect(option?.quantity_variant, option?.selling_price, option?.actual_price)}>
                    <Text>{option?.quantity_variant}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>

            <MaterialCommunityIcons name="truck-minus-outline" size={24} color="black" />
            <Text style={{ color: '#2c843e' }}> Free Delivery on purchase above $10</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{
              borderRadius: 8,
              elevation: 5,
              backgroundColor: 'white',
              overflow: 'hidden',
              padding: 8
            }}>

              <TouchableOpacity
                onPress={() => { isFavourite === 1 ? setIsFavourite(0) : setIsFavourite(1) }}
              >
                {isFavourite === 1
                  ? <MaterialIcons name="favorite" size={24} color="red" />
                  : <MaterialIcons name="favorite-border" size={24} color="#888" />
                }
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.Cart, {
              width: '85%',
              backgroundColor: '#2c843e',
              elevation: 8,
              overflow: 'hidden'
            }]}>
              <MaterialCommunityIcons name="cart-variant" size={24} color='white' />
              <Text style={{ fontSize: 17, fontWeight: '500', color: 'white', marginLeft: 5 }}> Add to Cart</Text>
            </TouchableOpacity>
          </View>


        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: Dimensions.get('window').height * 0.17
  },
  heading: {
    fontWeight: '500',
    fontSize: 30,
    color: 'white',
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'center',
    // paddingHorizontal: 30,
  },
  image: {
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: '600'
  },
  quantity: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c843e'
  },
  btnSecondary: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#fff',
  },
  textStyle: {
    fontSize: 19,
    // lineHeight: 26,
    fontWeight: '500',
    color: 'white',
    padding: 8,
    alignSelf: 'center'
  },
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
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    textDecorationLine: 'line-through',
  },
  selling: {
    fontSize: 20,
    fontWeight: '700'
  },
  optionsContainer: {
    position: 'absolute',
    top: 75,
    // left: 5,
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
    borderRadius: 5,
    width: '35%',

  }
});

export default ProductDescription;