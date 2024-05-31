import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import CategoryFoodHome from "../../Components/UI/CategoryFoodHome";
import { useDispatch } from "react-redux";
import * as filter from '../../store/actions/Products'

function FilterByScreen({ route }) {
  const { resData } = route?.params;
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState(resData?.categoryFilter);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([resData?.priceFilter?.minPrice, resData?.priceFilter?.maxPrice] ?? [0, 50]);

  console.log("resdAta in Filter by screen ", resData);
  console.log("PriceChange. ", priceRange, selectedCategories);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryId)) {
        return prevSelectedCategories.filter(id => id !== categoryId);
      } else {
        return [...prevSelectedCategories, categoryId];
      }
    });
    dispatch(filter.FilterBy({ categoryFilter: selectedCategories, priceFilter: priceRange }))
  };

  const renderCategoryItem = ({ item }) => (
    <CategoryFoodHome
      param={item}
      isSelected={selectedCategories.includes(item?.category_id)}
      onSelect={handleCategorySelect}
    />
  );

  return (
    <View style={styles.body}>
      <Text style={styles.categoryList}>Categories</Text>
      <FlatList
        data={categoryData}
        keyExtractor={(item) => item?.category_id}
        horizontal={true}
        renderItem={renderCategoryItem}
        style={{ paddingHorizontal: 10 }}
      />
      <Text style={styles.categoryList}>Price Range</Text>
      <View style={{ paddingHorizontal: 20 }}>
        <MultiSlider
          values={[priceRange[0], priceRange[1]]}
          min={priceRange[0]}
          max={priceRange[1]}
          step={5}
          sliderLength={Dimensions.get("window").width * 0.90}
          onValuesChange={(values) => {
            setPriceRange(values)
            dispatch(filter.FilterBy({ categoryFilter: selectedCategories, priceFilter: values }))
          }}
          allowOverlap={false}
          snapped
          selectedStyle={{ backgroundColor: "#2c843e" }}
          markerStyle={{ backgroundColor: "white", elevation: 8, height: 20, width: 20 }}
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