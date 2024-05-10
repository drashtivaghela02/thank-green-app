import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import CustomHeader from "../../Components/UI/CustomHeader";

const NotificationScreen = (props) => {
  return (
    <View style={styles.container}>
      <CustomHeader label="Notifications" press={() => props.navigation.goBack()} />

      <View style={styles.body}>

        <View style={styles.date}>
          <Text style={styles.dateInfo}>Sat 20 Mar 2020, 30:30 pm</Text>
        </View>
        <View style={styles.productContainer}>
          <View style={{}}>
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: "https://res.cloudinary.com/djuz5lkbf/image/upload/v1713157089/ThankGreen/i4hjtd4uacvcg4w9zbuy.jpg" }}
            />
          </View>
          <View>
            <Text style={styles.productInfo}>Fresho Oranges</Text>
            <Text numberOfLines={2} style={styles.deliveryInfo}>Product delivered on 20 Mar 2020, 03:30 pm</Text>
          </View>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    paddingHorizontal: 30,
    // paddingVertical: 10,
  },
  date: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15
  },
  dateInfo: {
    fontSize: 15,
    fontWeight: '600'
  },
  productContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20
  },
  productInfo: {
    color: "#555",
    fontSize: 15,
    fontWeight: '500'
  },
  deliveryInfo: {
    color: "#888",
    fontSize: 13,
    fontWeight: '500',
    maxWidth: Dimensions.get("window").width * 0.70
  },

})

export default NotificationScreen;