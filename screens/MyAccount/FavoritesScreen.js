import { FlatList, Text } from "react-native";
import { StyleSheet, View } from "react-native"
import CustomHeader from "../../Components/UI/CustomHeader";
import FavouriteProductData from "../../Components/UI/FavouriteProductData";

const FavoritesScreen = props => {

  const products = [
    {
      "product_id": 3,
      "category_name": "fruites & vegetables",
      "subcategory_name": "Fresh fruit",
      "product_title": "Fresho mango",
      "images": "https://res.cloudinary.com/djuz5lkbf/image/upload/v1713157089/ThankGreen/i4hjtd4uacvcg4w9zbuy.jpg",
      "quantity_variants": [
        {
          "actual_price": 19.99,
          "selling_price": 19.49,
          "quantity_variant": "500g"
        }
      ],
      "product_description": "Fresho mango",
      "product_start_delivery_time": "13:00:00",
      "product_end_delivery_time": "22:00:30"
    },
    {
      "product_id": 6,
      "category_name": "snacks",
      "subcategory_name": "Chips",
      "product_title": "Nachos",
      "images": "https://res.cloudinary.com/djuz5lkbf/image/upload/v1713157316/ThankGreen/bhnej4nn0topd8hy9yef.jpg",
      "quantity_variants": [
        {
          "actual_price": 59,
          "selling_price": 49.99,
          "quantity_variant": "250g"
        }
      ],
      "product_description": "Nachos",
      "product_start_delivery_time": "07:30:00",
      "product_end_delivery_time": "17:00:00"
    },
    {
      "product_id": 8,
      "category_name": "snacks",
      "subcategory_name": "biscuits",
      "product_title": "Chocolate biscuits",
      "images": "https://res.cloudinary.com/djuz5lkbf/image/upload/v1713157455/ThankGreen/ajiprcvbqc5tk5ul6ghj.jpg",
      "quantity_variants": [
        {
          "actual_price": 55.5,
          "selling_price": 48.5,
          "quantity_variant": "250g"
        }
      ],
      "product_description": "Chocolate biscuits",
      "product_start_delivery_time": "09:15:15",
      "product_end_delivery_time": "15:15:15"
    }
  ]
  return (
    <View style={styles.container} >
      <CustomHeader label='Favorites' press={() => { props.navigation.goBack() }} />
      <View style={{margin: 10}}>

        <FlatList
          keyExtractor={(item) => item.product_id}
          data={products}
          numColumns={2}
          renderItem={itemData =>
            <FavouriteProductData
              param={itemData.item}
              // onSelect={onProductSelectHandler}
            />
          }
        />
      </View>
    </View>

  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default FavoritesScreen;