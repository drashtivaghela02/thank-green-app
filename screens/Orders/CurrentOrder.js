import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PastOrderScreen from "./PastOrderScreen";

import * as orderAction from '../../store/actions/Orders';


function CurrentOrder({navigation}) {
  const [isLoading, setIsLoading] = useState(false); // Set an initial value
  const [currentOrders, setCurrentOrders] = useState([]); // State to hold past orders
  const [details, setDetails] = useState();

  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true); // Set loading state to true before fetching data
    dispatch(orderAction.getOrderInfo(accessToken))
      .then((response) => {
        setIsLoading(false); // Set loading state to false after fetching data
        setCurrentOrders(response.data.currentOrders); // Set fetched data to state
        console.log(response.data.currentOrders);
      })
      .catch(error => {
        setIsLoading(false); // Set loading state to false in case of error
        console.error("Error fetching user information:", error);
      });
  }, [accessToken]);

  console.log("currentOrders ==>", currentOrders); // Logging pastOrders instead of isLoading
  if (isLoading) {
  <ActivityIndicator size='large' color='#2c843e' />
  }
  const onProductSelectHandler = (id) => {
    console.log("You have touched product", id)

    setIsLoading(true); // Set loading state to true before fetching data
    dispatch(orderAction.getOrderDetailsInfo(id, accessToken))
    .then((response) => {
      setDetails(response.data[0]);
      console.log("order details",response);
      setIsLoading(false); // Set loading state to false after fetching data
      navigation.navigate('OrderDetails', {Id: id, Details: response, order: false })
    })
    .catch(error => {
      setIsLoading(false); // Set loading state to false in case of error
      console.error("Error fetching user information:", error);
    });
  }
  return (
    <FlatList 
    data={currentOrders} // Passing curent order as data
    keyExtractor={item => item.order_number} // Adjust keyExtractor as per your data structure
    renderItem={itemData => 
      <PastOrderScreen
        param={itemData.item}
        onSelect = {onProductSelectHandler}
      />
    }
  />
  );
}

export default CurrentOrder