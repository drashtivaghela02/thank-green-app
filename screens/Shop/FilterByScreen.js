import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as productAction from "../../store/actions/Products";
import MultiSlider from "@ptomasroos/react-native-multi-slider"; // Import MultiSlider from the library
import CategoryFoodHome from "../../Components/UI/CategoryFoodHome";

function FilterByScreen() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [resData, setResdata] = useState();
  const [priceRange, setPriceRange] = useState([0, 10]); // Initial price range

  useEffect(() => {
    setIsLoading(true);
    dispatch(productAction.getCategory(accessToken))
      .then((response) => {
        setIsLoading(false);
        console.log("Response => ", response?.data);
        setResdata(response?.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching user information:", error);
      });
  }, [accessToken]);

  const onProductSelectHandler = (id, name) => {
    console.log("touched", id);
    props.navigation.navigate("CategoryList", { categoryId: id, name: name });
  };

  const renderCategoryItem = ({ item }) => (
    <CategoryFoodHome param={item} onSelect={onProductSelectHandler} />
  );

  return (
    <View style={styles.body}>
      <Text style={styles.categoryList}>Categories</Text>
      <FlatList
        data={resData}
        keyExtractor={(item) => item.category_id}
        horizontal={true}
        renderItem={renderCategoryItem}
        style={{paddingHorizontal: 10}}
      />
      <Text style={styles.categoryList}>Price Range</Text>
      <View style={{paddingHorizontal: 20}}>
      <MultiSlider
        values={[priceRange[0], priceRange[1]]}
        min={0}
        max={500}
        step={1}
        sliderLength={Dimensions.get("window").width*0.90}
        onValuesChange={(values) => setPriceRange(values)}
        allowOverlap={false}
        snapped
        selectedStyle={{ backgroundColor: "#2c843e", }}
        markerStyle={{ backgroundColor: "white", elevation: 8, height: 20, width: 20,  }}
        vertical={false}
        trackStyle={{ height: 3 }}
      />
      </View>
      <View style={styles.textContainer}>
        <Text style={{ fontSize: 15 }}>{priceRange[0]}</Text>
        <Text style={{ fontSize: 15 }}>{priceRange[1]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    justifyContent: "flex-start",
    backgroundColor: "white",
    // paddingHorizontal: 20,
    paddingVertical: 10,
  },
  categoryList: {
    fontWeight: "500",
    fontSize: 17,
    textAlign: "left",
    paddingHorizontal: 20,

  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,

  },
});

export default FilterByScreen;