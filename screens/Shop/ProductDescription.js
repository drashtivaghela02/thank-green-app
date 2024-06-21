import { AntDesign, Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as productAction from '../../store/actions/Products';
import Products from "../../Components/UI/Products";
import Carousel from "react-native-reanimated-carousel";
import * as cartItem from '../../store/actions/Cart'
import { Pagination } from "react-native-snap-carousel";
import CartIcon from "../../Components/UI/CartIcon";
import Colors from "../../Constant/Colors";

const ProductDescription = props => {
  const ProductId = props.route.params.ProductId ? props.route.params.ProductId : '';
  // const data = props.route.params.data ? props.route.params.data : [];
  const cartItems = useSelector(state => state?.cart?.items)

  console.log("hello", cartItems)
  const accessToken = useSelector(state => state.auth.accessToken)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setResdata] = useState(null);
  const [cartItemId, setCartitemId] = useState(`${ProductId}-${data?.quantity_variants[0]?.quantity_variant_id}`)
  const [quantityVarientId, setQuantityVarientId] = useState(data?.quantity_variants[0]?.quantity_variant_id ?? '')
  const [selectedOption, setSelectedOption] = useState(data?.quantity_variants[0]?.quantity_variant ?? '');
  const [isFavourite, setIsFavourite] = useState(data?.is_favorite ? data?.is_favorite : 0)
  const [actual, setActuals] = useState(data?.quantity_variants[0]?.actual_price ?? 0)
  const [selling, setSelling] = useState(data?.quantity_variants[0]?.selling_price ?? 0)
  const [qty, setQty] = useState(cartItems[cartItemId]?.quantity ?? 1);
  const [showOptions, setShowOptions] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleFavouriteToggle = () => {
    if (isFavourite === 1) {
      console.log("Second")
      dispatch(productAction.removeFromFavorites(ProductId, accessToken));
      setIsFavourite(0)
    } else {
      console.log("first")
      dispatch(productAction.addToFavorites(ProductId, accessToken));
      setIsFavourite(1)
    }
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(productAction.getProducts(ProductId, accessToken))
      .then((response) => {
        setIsLoading(false);
        setResdata(response?.data?.product[0]);
        setQuantityVarientId(response?.data?.product[0].quantity_variants[0]?.quantity_variant_id)
        setCartitemId(`${ProductId}-${response?.data?.product[0].quantity_variants[0]?.quantity_variant_id}`)
        setSelectedOption(response?.data?.product[0].quantity_variants[0]?.quantity_variant);
        setActuals(response?.data?.product[0].quantity_variants[0]?.actual_price);
        setSelling(response?.data?.product[0].quantity_variants[0]?.selling_price);
        setIsFavourite(response?.data?.product[0]?.is_favorite)
        setQty(cartItems[`${ProductId}-${data?.quantity_variants[0]?.quantity_variant_id}`].quantity)
        console.log("product description=> ", response?.data?.product[0])
      })
      .catch(error => {
        setIsLoading(false);
        // console.error("Error fetching user information:", error);
        console.log("Error fetching user information:", error);

      });
  }, [accessToken, qty])

  const handleOptionSelect = (quantityVId) => {
    for (let variant of data?.quantity_variants) {
      if (variant.quantity_variant_id === quantityVId) {
        setQuantityVarientId(quantityVId)
        setCartitemId(`${ProductId}-${quantityVId}`)
        setSelectedOption(variant.quantity_variant);
        setActuals(variant.actual_price);
        setSelling(variant.selling_price);
      }
    }
    setShowOptions(false);
  };

  if (cartItems[cartItemId]) {
    console.log("cart item exists", cartItems[cartItemId].quantity)
    // setQty(cartItems[cartItemId].quantity)
  }

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size={50} color={Colors.green} />
  //     </View>
  //   )
  // }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.body}>
        <View style={{ height: Dimensions.get('window').height * 0.60, }}>
          <Carousel
            data={data?.images ?? []}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={{ width: '100%', height: '100%' }} />
            )}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width}
            width={Dimensions.get("window").width}
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={data?.images?.length ?? 0}
            activeDotIndex={activeSlide}
            containerStyle={{ backgroundColor: 'transparent', position: 'absolute', bottom: 10, width: '100%' }}
            dotStyle={{ width: 15, height: 8, borderRadius: 5, backgroundColor: 'rgba(255, 255, 255, 0.92)' }}
            inactiveDotStyle={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'rgba(255, 255, 255, 0.92)' }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
              <AntDesign name="arrowleft" size={28} color='white' style={{ elevation: 5, shadowColor: 'black' }} onPress={() => { props.navigation.goBack() }} />
              <CartIcon press={() => { props.navigation.navigate('CheckOut') }} />

            </View>
          </View>
        </View>

        <View style={{ backgroundColor: 'white', overflow: 'hidden', marginTop: -27, paddingHorizontal: 20, paddingTop: 25, borderTopLeftRadius: 40, borderTopRightRadius: 40, shadowColor: 'black', elevation: 5 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
            <View>
              <Text style={styles.title}>{data?.product_title ?? ''}</Text>
              <Text style={styles.quantity}>Net wt. {selectedOption}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.actual}>${actual}</Text>
              <Text style={styles.selling}>${selling}</Text>
            </View>
          </View>

          <Text style={{ fontSize: 14, color: '#666', }}>{data?.product_description ?? ''}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '500' }}>Quantity</Text>
            <View style={[styles.Cart, { justifyContent: 'space-between', alignItems: 'center' }]}>
              <TouchableOpacity disabled={qty === 1}
                onPress={() => {
                  setQty(qty - 1)
                  dispatch(cartItem.removeFromCart(`${ProductId}-${quantityVarientId}`))
                }}>
                <AntDesign name="minuscircleo" size={24} color="#666" />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, fontWeight: '500', color: cartItems[cartItemId] ? Colors.green : '#666' }}>{cartItems[cartItemId] ? String(cartItems[cartItemId].quantity).padStart(2, '0') : String(qty).padStart(2, '0')}</Text>
              <TouchableOpacity
                disabled={!cartItems[cartItemId]}
                onPress={() => {
                  setQty(qty + 1)
                  dispatch(cartItem.addToCart(data, quantityVarientId))
                }}>
                <AntDesign name="pluscircleo" size={24} color="#666" />
              </TouchableOpacity>
            </View>
          </View>


          <View style={{ marginBottom: 15 }}>

            <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: 5 }}>Size</Text>
            <TouchableOpacity onPress={toggleOptions} style={{ width: '100%', borderColor: '#f0f0f0', backgroundColor: '#f0f0f0', borderWidth: 1, borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, paddingHorizontal: 10 }}>
              <Text style={{ fontSize: 14, color: '#555' }}>{
                selectedOption ??
                'no-data'
              }</Text>
              <AntDesign name='down' size={16} color="#888" />

            </TouchableOpacity>
            {showOptions && (
              <View style={styles.optionsContainer}>
                {data?.quantity_variants.map((option, index) => (
                  <TouchableOpacity key={index} onPress={() => handleOptionSelect(option?.quantity_variant_id)}>
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

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, marginBottom: 25 }}>
            <View style={{
              borderRadius: 8,
              elevation: 5,
              backgroundColor: 'white',
              overflow: 'hidden',
              padding: 8
            }}>

              <TouchableOpacity
                // onPress={() => { isFavourite === 1 ? setIsFavourite(0) : setIsFavourite(1) }}
                onPress={handleFavouriteToggle}
              >
                {isFavourite === 1
                  ? <MaterialIcons name="favorite" size={24} color="red" />
                  : <MaterialIcons name="favorite-border" size={24} color="#888" />
                }
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.Cart, {
                width: '85%',
                backgroundColor: '#2c843e',
                elevation: 8,
                overflow: 'hidden'
              }]}
              onPress={() => {
                cartItems[cartItemId] ? props.navigation.navigate('CheckOut')
                  : dispatch(cartItem.addToCart(data, quantityVarientId))
              }}
            >
              <MaterialCommunityIcons name="cart-variant" size={24} color='white' />
              <Text style={{ fontSize: 17, fontWeight: '500', color: 'white', marginLeft: 5 }}>{cartItems[cartItemId] ? ' Go to Cart' : ' Add to Cart'}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    position: 'absolute',
    top: 0,
    paddingTop: 40,
    paddingHorizontal: 20,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.10,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  heading: {
    fontWeight: '500',
    fontSize: 30,
    color: 'white',
  },
  body: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: "white"
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