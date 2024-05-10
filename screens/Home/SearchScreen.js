import { View } from "react-native";
import CustomHeader from "../../Components/UI/CustomHeader";


const SearchScreen = (props) => {
  return (
    <View>
      <CustomHeader label = "Search" press={() => props.navigation.goBack()} /> 
    </View>
  )
}

export default SearchScreen;