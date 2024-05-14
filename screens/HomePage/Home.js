import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, ScrollView } from "react-native";
import CustomHeader from "../../Components/UI/CustomHeader";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Entypo, Feather, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import CategoryFood from "../../Components/UI/CategoryFood";
import CategoryFoodHome from "../../Components/UI/CategoryFoodHome";
import { useDispatch, useSelector } from "react-redux";
import * as homeAction from '../../store/actions/Home';
import { useEffect, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import { Image } from "react-native";
import ProductsHome from "../../Components/UI/ProductsHome";

const Home = props => {
  const accessToken = useSelector(state => state.auth.accessToken)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [bannerData, setBannerData] = useState([])
  const [category, setCategory] = useState([])
  const [pastOrders, setPastOrders] = useState([])
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [resData, setResdata] = useState();

  useEffect(() => {
    setIsLoading(true);
    dispatch(homeAction.getHome(accessToken))
      .then((response) => {
        setIsLoading(false);
        console.log("sgdagfv xzv=> ", response?.data?.recommendedProducts)
        setResdata(response?.data);
        setBannerData(response?.data?.banner)
        setCategory(response?.data?.categoryList)
        setPastOrders(response?.data?.pastOrders)
        setRecommendedProducts(response?.data?.recommendedProducts)

      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching user information:", error);
      });
  }, [accessToken])

  const onCategorySelectHandler = () => {
    console.log("dsfiuhshi")
  }
  const onProductSelectHandler = (id, data) => {
    props.navigation.navigate('ProductDescription', { ProductId: id, data: data})
  }

  const renderItem = ({ item }) => {
    return (
      <Image source={{ uri: item.banner_image }} style={styles.image} />
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2c843e', '#1e4c5e']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.7, y: 1 }}
      >
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between', alignItems: 'center' }}>
            <Entypo name="menu" size={28} color="white" onPress={() => props.navigation.toggleDrawer()} />
            <View>
              <Text style={styles.subHeading} >Deliver to</Text>
              <Text numberOfLines={1} style={styles.heading}>Culture Tea Bar, Broad...</Text>
            </View>
            <Ionicons name="notifications-outline" size={28} color="white" onPress={() => { props.navigation.navigate('Notifications') }} />
            <MaterialCommunityIcons name="cart-variant" size={28} color='white' onPress={() => { props.navigation.navigate('CheckOut') }} />
          </View>
          <View style={styles.container2}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('HomeSearch')}
              style={styles.searchContainer}>
              <Feather name="search" size={18} color="black" style={{ marginLeft: 1 }} />
              <Text style={{ fontSize: 17 }}>Search</Text>
            </TouchableOpacity>
            <AntDesign name="bars" size={28} color="white" />
            {/* <FontAwesome6 name="bars-staggered" size={24} color="white" onPress={() => { props.navigation.goBack() }} /> */}
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.body}>

        <View style={styles.container1}>
          <Carousel
            data={bannerData}
            renderItem={renderItem}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width}
            width={Dimensions.get("window").width}

          />
        </View>
        <View>
          <Text style={styles.categoryList}>Categories</Text>
          <FlatList
            data={category}
            keyExtractor={(item) => item.category_id}
            horizontal={true}
            renderItem={itemData =>
              <CategoryFoodHome
                param={itemData.item}
                onSelect={onCategorySelectHandler}
              />}
          />
        </View>
        <View>
          <Text style={styles.categoryList}>Past Orders</Text>
          <FlatList
            data={pastOrders}
            keyExtractor={(item) => item.product_id}
            horizontal={true}
            style={{ paddingHorizontal: 10 }}
            renderItem={itemData =>
              <ProductsHome
                param={itemData.item}
                onSelect={onProductSelectHandler}
              />}
          />
        </View>
        <View>
          <Text style={styles.categoryList}>Reccomended Products</Text>
          <FlatList
            data={recommendedProducts}
            keyExtractor={(item) => item.product_id}
            horizontal={true}
            style={{ paddingHorizontal: 10 }}
            renderItem={itemData =>
              <ProductsHome
                param={itemData.item}
                onSelect={onProductSelectHandler}
              />}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 45,
    paddingHorizontal: 20,
    height: Dimensions.get('window').height * 0.20
  },
  heading: {
    fontWeight: '500',
    fontSize: 18,
    color: 'white',
    width: Dimensions.get('window').width * 0.55
  },
  subHeading: {
    // paddingTop: 4,
    color: 'white',
    fontWeight: 'bold',
    fontWeight: '400'
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  body: {
    // flex: 1,
    // alignItems: 'center',
    justifyContent: "flex-start",
    backgroundColor: 'white',
    // paddingHorizontal: 20,
    // paddingBottom: 50,
  },
  container1: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: '100%'
    height: 200,

  },
  image: {
    // width: '100%',
    height: 180,
  },
  categoryList: {
    fontWeight: '400',
    fontSize: 20,
    textAlign: "left",
    paddingHorizontal: 20
  }
})