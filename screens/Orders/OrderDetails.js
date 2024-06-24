import { AntDesign, Feather, FontAwesome6, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import CustomHeader from "../../Components/UI/CustomHeader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as orderAction from '../../store/actions/Orders';
import moment from "moment";


const OrderDetails = (props) => {

  const Id = props.route.params ? props?.route?.params?.Id : null;
  const detail = props.route.params ? props?.route?.params?.Details : null;
  const order = props?.route?.params?.order

  console.log("ghftufug", order)
  const [isLoading, setIsLoading] = useState(false);
  // const [details, setDetails] = useState();
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setIsLoading(true); // Set loading state to true before fetching data
  //   dispatch(orderAction.getOrderDetailsInfo(Id, accessToken))
  //   .then((response) => {
  //     setDetails(response.data[0]);
  //     console.log("order details",response.data[0]);
  //     setIsLoading(false); // Set loading state to false after fetching data
  //   })
  //   .catch(error => {
  //     setIsLoading(false); // Set loading state to false in case of error
  //     console.error("Error fetching user information:", error);
  //   });
  // }, []);

  // const paymentDetails = details.payment_details
  const details = detail?.data[0]
  const productData = details?.Product_details
  console.log("order detail past order ==>", details);


  return (
    <View style={styles.container}>
      <CustomHeader label='Order Details' press={() => props.navigation.goBack()} />

      <ScrollView>{
        isLoading ?
          <ActivityIndicator size="large" color="#2c843e" />

          :
          <View style={styles.body}>



            <View style={styles.card}>
              <View style={[styles.detail, { gap: 10 }]}>
                <View style={{ gap: 8 }}>
                  <Text style={styles.title}>Order Date : </Text>
                  <Text style={styles.title}>Order Number : </Text>
                  <Text style={styles.title}>Order Status : </Text>
                </View>

                <View style={{ gap: 8 }}>
                  <Text style={styles.subTitle}>{moment(details.Order_date).format("Do MMMM YYYY")}</Text>
                  <Text style={styles.subTitle}>{details?.order_number}</Text>
                  <Text style={styles.subTitle}>Order {details?.order_status[0].toUpperCase() + details?.order_status.substring(1)}</Text>

                </View>
              </View>
            </View>


            {/* Card 2 */}
            <Text style={styles.headingTitle}>Product Details</Text>
            <View style={styles.card}>
              {productData?.map((productDetail, index) => (
                <View key={index}>
                  <Text style={{ fontSize: 15, fontWeight: '500', color: '#888', paddingHorizontal: 10 }}>{productDetail?.subcategory_name}</Text>
                  {productDetail?.products.map((product, productIndex) => (
                    <View key={productIndex} style={styles.mainscreen}>
                      <View style={{ ...styles.imagePreview, ...{ borderWidth: 1, marginHorizontal: 10, borderRadius: 7, borderColor: 'white' } }}>
                        <Image style={styles.image} source={{ uri: product?.product_image }} />
                      </View>
                      <View style={styles.textcontainer}>
                        <View>
                          <Text style={{ fontSize: 15, fontWeight: '500', color: '#888' }}>{product?.product_name}</Text>
                          <Text style={{ fontSize: 13, fontWeight: '400', color: '#888' }}>Net wt: {product?.quantity_variant}</Text>
                          <Text style={{ fontSize: 13, fontWeight: '400', color: '#888' }}>Qty: {product?.quantity}</Text>
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: '800', color: '#666' }}>${product?.order_price}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </View>


            {/* Card 3 */}
            <Text style={styles.headingTitle}>Delivery Address</Text>
            <View style={styles.card}>
              <View style={[styles.detail, { gap: 15 }]}>
                <View>
                  <Image source={require('../../assets/location-pin.png')} style={{ height: 40, width: 15 }} />
                </View>
                <View style={{ gap: 8 }}>
                  <Text style={styles.title}>{details?.delivery_address?.address_type} {details?.delivery_address.landmark ? '- ' + details?.delivery_address?.landmark : ''}</Text>
                  <Text style={[styles.subTitle, { fontSize: 12 }]}>{details?.delivery_address.address}, {details?.delivery_address?.zip_code} </Text>
                </View>
              </View>
            </View>


            {/* Card4 */}

            <Text style={styles.headingTitle}>Delivery Date and Time</Text>
            <View style={styles.card}>
              <View style={[styles.detail, { gap: 7 }]}>
                <View style={{ gap: 8 }}>
                  <Fontisto name="date" size={20} color="black" />
                  <Fontisto name="clock" size={20} color="black" />

                </View>
                <View style={{ gap: 8 }}>
                  <Text style={styles.title}>Delivery Date : </Text>
                  <Text style={styles.title}>Delivery Time : </Text>

                </View>

                <View style={{ gap: 8 }}>
                  <Text style={styles.subTitle}>{details?.delivery_on.split(' ')[0]}</Text>
                  <Text style={styles.subTitle}>{details?.delivery_on.split(' ')[1]}</Text>
                </View>
              </View>
            </View>

            {/* Card5 */}

            <Text style={styles.headingTitle}>Payment Details</Text>
            <View style={styles.detail1}>
              <View>
                <Text style={styles.title1}>Invoice Number </Text>
                <Text style={styles.title1}>Payment Option </Text>
                <Text style={styles.title1}>Order Items </Text>
                <Text style={styles.title1}>Sub Total </Text>
                <Text style={styles.title1}>Discount </Text>
                <Text style={styles.title1}>Delivery Charges </Text>
                <Text style={styles.title2}>Total Amount </Text>
              </View>

              <View style={{ width: '60%' }}>
                <Text style={styles.subTitle1} numberOfLines={1}>{details?.payment_details?.invoice_number}</Text>
                <Text style={styles.subTitle1}>{details?.payment_details?.type}</Text>
                <Text style={styles.subTitle1}>{details?.payment_details?.total_quantity} items</Text>
                <Text style={styles.subTitle1}>${details?.payment_details?.gross_amount.toFixed(2)}</Text>
                <Text style={styles.subTitle1}>${details?.payment_details?.discount_amount.toFixed(2)}</Text>
                <Text style={styles.subTitle1}>${details?.payment_details?.delivery_charge.toFixed(2)}</Text>
                <Text style={styles.subTitle2}>${details?.payment_details?.order_amount.toFixed(2)}</Text>
              </View>
            </View>

            <View>
              {details?.order_status === "delivered" &&
                <TouchableOpacity style={styles.verify} onPress={() => { props.navigation.navigate('ReportIssue', { Id: details?.order_number }); }}>
                  <Text style={styles.verifyButton}>REPORT ISSUE</Text>
                </TouchableOpacity>
              }
              {details?.order_status !== "delivered" && details?.order_status !== "cancel" &&
                <View>
                  <TouchableOpacity style={styles.verify} onPress={() => { props.navigation.navigate('TrackOrder', { Id: details.order_number, status: details.order_status }); }}>
                    <Text style={styles.verifyButton}>TRACK ORDER</Text>
                  </TouchableOpacity>

                  {order === false ? (<TouchableOpacity style={styles.verify1} onPress={() => { props.navigation.navigate('CancelOrder', { Id: details.order_number }); }}>
                    <Text style={styles.verifyButton1}>Cancel Order</Text>
                  </TouchableOpacity>)
                    :
                    (<TouchableOpacity style={styles.verify1} onPress={() => { props.navigation.navigate('Home'); }}>
                      <Text style={styles.verifyButton1}>Continue Shopping</Text>
                    </TouchableOpacity>)}
                </View>
              }

            </View>
          </View>}
      </ScrollView>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  body: {
    flex: 1,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    // backgroundColor: '#f1f0f5',
    // marginBottom: 30
  },
  card: {
    elevation: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    // height: 140,
    width: '100%',
    padding: 5,
    overflow: 'hidden',
    alignSelf: 'center'

  },
  mainscreen: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    backgroundColor: 'white',
    // paddingHorizontal: 5
  },
  imagePreview: {
    width: 60,
    height: 60,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'white'
  },

  image: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',

  },
  // imageContainer: {

  // }
  // image: {
  //     width: 80,
  //     height: 80,
  //     resizeMode: 'contain',
  //     tintColor: 'red'
  // },
  textcontainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5
    // marginHorizontal:10
  },
  headingTitle: {
    fontWeight: '700',
    fontSize: 17,
    paddingBottom: 10,
    paddingTop: 15,
  },

  detail: {
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    // gap: 10
  },
  detail1: {
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 10,
    flexDirection: 'row',
    width: '100%'
  },
  title: {
    fontWeight: '500',
    fontSize: 14
  },
  subTitle: {
    fontWeight: '500',
    fontSize: 14,
    color: '#888',
    paddingRight: 10
  },
  subTitle1: {
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 30,
    textAlign: 'right'
  },
  title1: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 30,
    color: '#888',
  },

  title2: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 30,
    color: '#666',
    paddingVertical: 12
  },
  subTitle2: {
    fontWeight: '800',
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'right',
    paddingVertical: 12

  },
  verify: {
    marginTop: 10,
    // marginBottom: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2c843e',
    borderRadius: 10,
    width: '100%',
  },
  verifyButton: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '500'
  },


  verify1: {
    marginTop: 10,
    // marginBottom: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,

    elevation: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
    overflow: 'hidden',
    alignSelf: 'center'
  },
  verifyButton1: {
    color: '#2c843e',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '500'
  },
});

export default OrderDetails;