import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, ScrollView, ActivityIndicator, ImageBackground, Modal, Pressable, StatusBar, Platform } from "react-native";
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
import * as cartItem from '../../store/actions/Cart';
import CartIcon from "../../Components/UI/CartIcon";
import ScreenLoader from "../../Components/UI/ScreenLoader";
import Colors from "../../Constant/Colors";
import CouponHome from "../../Components/UI/CouponHome";
import * as orderAction from '../../store/actions/Orders';
import usePagination from "../../Components/UI/usePagination";

const INITIAL_PAST_PAGE = 1;
const INITIAL_RECO_PAGE = 1;
const ITEMS_PER_PAGE = 10;

const Home = props => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [again, setAgain] = useState(true)
  const [bannerData, setBannerData] = useState([]);
  const [couponsData, setCouponsData] = useState([]);
  const [category, setCategory] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [resData, setResdata] = useState();
  const [pastOrderCount, setPastOrderCount] = useState(0);
  const [recomendedCount, setRecomendedCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [TnC, setTnC] = useState({});
  const keyValuePairs = Object.keys(TnC).map(key => ({ key, value: TnC[key] }));
  const favoriteProductIds = useSelector(state => state.product.favoriteProductIds);

  const fetchHomePage = (pastPage, recoPage) => {
    setIsLoading(true);
    console.log(accessToken);
    dispatch(homeAction.getHome(pastPage, recoPage, accessToken))
      .then((response) => {
        setIsLoading(false);
        console.log("Home PAge=> ", response?.data?.banner[0]?.banners);
        setResdata(response?.data);
        setBannerData(response?.data?.banner[0]?.banners);
        setCouponsData(response?.data?.coupons);
        setCategory(response?.data?.categoryFilter);
        setPastOrders((prevData) => pastPage === INITIAL_PAST_PAGE ? response?.data?.pastOrders : [...prevData, ...response?.data?.pastOrders]);
        setRecommendedProducts((prevData) => recoPage === INITIAL_RECO_PAGE ? response?.data?.recommendedProducts : [...prevData, ...response?.data?.recommendedProducts]);
        setPastOrderCount(response?.data?.total_past_orders);
        setRecomendedCount(response?.data?.total_recommended_products);
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error fetching user information:", error);
      });
  };

  const { currentPage: pastPage, handleEndReached: handlePastOrdersEndReached } = usePagination({
    fetchFunction: (page) => {
      setAgain(false)
      fetchHomePage(page, INITIAL_RECO_PAGE)
    },
    totalPages: Math.ceil(pastOrderCount / ITEMS_PER_PAGE),
    initialPage: INITIAL_PAST_PAGE,
  });

  const { currentPage: recoPage, handleEndReached: handleRecomendedEndReached } = usePagination({
    fetchFunction: (page) => {
      setAgain(false)
      fetchHomePage(INITIAL_PAST_PAGE, page)
    },
    totalPages: Math.ceil(recomendedCount / ITEMS_PER_PAGE),
    initialPage: INITIAL_RECO_PAGE,
  });

  useEffect(() => {
    fetchHomePage(INITIAL_PAST_PAGE, INITIAL_RECO_PAGE);
    // setAgain(false)
  }, [accessToken]);

  const handleTnC = (id) => {
    console.log("TNC data id getting", id);
    dispatch(orderAction.getCouponTnC(id, accessToken))
      .then((response) => {
        setTnC(response?.data);
        console.log("TNC data getting", response);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching user information:', error);
      });
  };

  const onCategorySelectHandler = (id, name) => {
    console.log("touched", id);
    props.navigation.navigate('CategoryProducts', { categoryId: id, name: name });
  };

  const onProductSelectHandler = (id, data) => {
    props.navigation.navigate('ProductDescription', { ProductId: id, data: data });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('BannerScreen', { id: item.id })}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>
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
              <Text style={styles.subHeading}>Deliver to</Text>
              <Text numberOfLines={1} style={styles.heading}>Culture Tea Bar, Broad...</Text>
            </View>
            <Ionicons name="notifications-outline" size={28} color="white" onPress={() => { props.navigation.navigate('Notifications') }} />
            <CartIcon press={() => { props.navigation.navigate('CheckOut') }} />
          </View>
          <View style={styles.container2}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('HomeSearch')}
              style={styles.searchContainer}>
              <Feather name="search" size={18} color="black" style={{ marginLeft: 1 }} />
              <Text style={{ fontSize: 17 }}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      
      {isLoading && again ? <ScreenLoader />
        :
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.modalText, { fontWeight: '600', fontSize: 16 }]}>Terms and Conditions</Text>
              <FlatList
                data={keyValuePairs}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (
                  <Text style={styles.modalText}>
                    {item.key}: {item.value}
                  </Text>
                )}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={styles.couponContainer}>
          <FlatList
            data={couponsData}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={itemData =>
              <CouponHome
                param={itemData.item}
                onShowTerms={() => {
                  setModalVisible(true);
                  handleTnC(itemData.item.id);
                }}
              />}
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

        {accessToken !== null && <View>
          <Text style={styles.categoryList}>Past Orders</Text>
          <FlatList
            data={pastOrders}
            keyExtractor={(item) => item.product_id}
            horizontal={true}
            style={{ paddingHorizontal: 10 }}
            renderItem={itemData =>
              <ProductsHome
                param={itemData.item}
                favourites={favoriteProductIds[itemData?.item?.product_id] ? 1 : 0}
                onSelect={onProductSelectHandler}
                onRemoveItem={() => { dispatch(cartItem.removeFromCart(`${itemData?.item?.product_id}-${itemData?.item?.quantity_variants[0].quantity_variant_id}`)) }}
              />}
            onEndReached={handlePastOrdersEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isLoading ? <ActivityIndicator size="large" color={Colors.green} style= {{paddingHorizontal: 10, paddingVertical: 75,}} /> : null}
          />
        </View>}

        <View>
          <Text style={styles.categoryList}>Recommended Products</Text>
          <FlatList
            data={recommendedProducts}
            keyExtractor={(item) => item.product_id}
            horizontal={true}
            style={{ paddingHorizontal: 10 }}
            renderItem={itemData =>
              <ProductsHome
                param={itemData.item}
                onSelect={onProductSelectHandler}
                onRemoveItem={() => { dispatch(cartItem.removeFromCart(`${itemData?.item?.productId}-${itemData?.item?.quantity_variants[0]?.quantity_variant_id}`)) }}
              />}
            onEndReached={handleRecomendedEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isLoading ? <ActivityIndicator size="large" color={Colors.green} style= {{paddingHorizontal: 10, paddingVertical: 75,}} /> : null}
          />
        </View>
      </ScrollView>
      }
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0, //45,
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
    color: 'white',
    fontWeight: '400'
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  body: {
    justifyContent: "flex-start",
    backgroundColor: 'white',
  },
  container1: {
    height: 200,
  },
  image: {
    height: 180,
  },
  couponContainer: {
    // paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 10,
    gap: 20
  },
  categoryList: {
    fontWeight: '400',
    fontSize: 20,
    textAlign: "left",
    paddingHorizontal: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  modalView: {
    height: Dimensions.get('window').height*0.42,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 5,
  },
  buttonClose: {
    backgroundColor: Colors.green,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});