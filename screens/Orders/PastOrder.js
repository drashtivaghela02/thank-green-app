import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import PastOrderScreen from "./PastOrderScreen";
import { useDispatch, useSelector } from "react-redux";

import * as orderAction from '../../store/actions/Orders';
import { ActivityIndicator } from "react-native-paper";
import usePagination from "../../Components/UI/usePagination";
import Colors from "../../Constant/Colors";
import { Text } from "react-native";

const INITIAL_PAGE = 1;

const PastOrder = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false); // Set an initial value
  const [pastOrders, setPastOrders] = useState([]); // State to hold past orders
  const [details, setDetails] = useState();
  const [orderCount, setOrderCount] = useState(0);

  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();
 
  const fetchPastOrders = (page) => {
    setIsLoading(true); // Set loading state to true before fetching data
    dispatch(orderAction.getOrderInfo(1, page ,accessToken))
      .then((response) => {
        setIsLoading(false); // Set loading state to false after fetching data
        setPastOrders((prevData) => [...prevData, ...response?.data?.pastOrders]); // Set fetched data to state
        setOrderCount(response?.data?.total_past_orders);
        console.log(response?.data?.pastOrders);
      })
      .catch(error => {
        setIsLoading(false); // Set loading state to false in case of error
        console.error("Error fetching user information:", error);
      });
  }
  
  const { currentPage, handleEndReached } = usePagination({
    fetchFunction: fetchPastOrders,
    totalPages: Math.ceil(orderCount / 10),
    initialPage: INITIAL_PAGE,
  });

  useEffect(() => {
  fetchPastOrders(INITIAL_PAGE)
  }, [accessToken]);

  console.log("pastOrders ==>", pastOrders); // Logging pastOrders instead of isLoading

  if (isLoading) {
  <ActivityIndicator size="large" color="#2c843e"/>
}

  const onProductSelectHandler = (id) => {
    console.log("You have touched product", id)

    setIsLoading(true); // Set loading state to true before fetching data
    dispatch(orderAction.getOrderDetailsInfo(id, accessToken))
    .then((response) => {
      setDetails(response?.data[0]);
      console.log("order details",response);
      setIsLoading(false); // Set loading state to false after fetching data
      navigation.navigate('OrderDetails', {Id: id, Details: response ,order: false})
    })
    .catch(error => {
      setIsLoading(false); // Set loading state to false in case of error
      console.error("Error fetching user information:", error);
    });
    // navigation.navigate('OrderDetails', {Id: id, data: details })
  }
  return (
    orderCount === 0 && !isLoading ?
    (<View style={styles.logoContainer} >
      <Image source={require('../../assets/Order.png')} style={styles.logo} />
      <Text style={styles.bodyMainText}>No order available</Text>
      <Text style={styles.bodyText}>The best deals are just a click away. Start shopping today!</Text>
    </View>)
    : ( <FlatList 
      data={pastOrders} // Passing pastOrders as data
      keyExtractor={item => item.order_number} // Adjust keyExtractor as per your data structure
      renderItem={itemData => 
        <PastOrderScreen
          param={itemData.item}
          onSelect = {onProductSelectHandler}
        />
      }
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      ListFooterComponent={isLoading ? <ActivityIndicator size="large" style={{ paddingTop: 5 }} color={Colors.green} /> : null}
      />)
  );
}

const styles = StyleSheet.create({
  bodyMainText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    paddingVertical: 10
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 350
  },
  bodyText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#b4b4b4',
  }
});

export default PastOrder;