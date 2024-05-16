import { AntDesign, Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as productAction from '../../store/actions/Products';
import Products from "../../Components/UI/Products";


const ProductsListing = props => {
  const SubCategoryId = props.route.params.SubCatId;
  const name = props.route.params.SubCatName;
  console.log("hello", SubCategoryId, name)

  const accessToken = useSelector(state => state.auth.accessToken)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [resData, setResdata] = useState();

  useEffect(() => {
    setIsLoading(true);
    dispatch(productAction.getProductsFromSubCat(SubCategoryId, accessToken))
      .then((response) => {
        setIsLoading(false);
        console.log("sgdagfv xzv=> ", response?.data)
        setResdata(response?.data);
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching user information:", error);
      });
  }, [accessToken])

  const onProductSelectHandler = (id, data) => {
    props.navigation.navigate('ProductDescription', { ProductId: id, data: data})
  }

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
            <Text numberOfLines={1} style={styles.heading}>{name}</Text>
            <MaterialIcons name="filter-list" size={28} color="white" onPress={() => { props.navigation.navigate('Filters') }} />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <View style={{ flex: 1, width: '100%' }}>
          <FlatList
            data={resData}
            keyExtractor={(item) => item.product_id}
            renderItem={itemData =>
              <Products
                param={itemData.item}
                onSelect={onProductSelectHandler}
              />}
          />
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
    alignItems: 'center',
    // paddingHorizontal: 30,
  },
  image: {
    width: '100%',
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
  }
});

export default ProductsListing;