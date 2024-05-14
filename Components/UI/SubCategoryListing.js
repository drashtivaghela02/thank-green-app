import { Image, Text } from "react-native"
import { StyleSheet, TouchableOpacity, View } from "react-native"

const SubCategoryListing = (props) => {
  console.log(props.param)
  const id = props.param.subcategory_id;
  const subCategoryName = props.param.subcategory_name
  const data = props.param
  return (
    <View style={styles.gridItem}>
      <TouchableOpacity
        style={{ flex: 1}}
        onPress={() => props.onSelect(id, subCategoryName )}
      >
        <View style={styles.container} >
          <View style={{ flex: 1 }}>
            <Image source={{ uri: data.subcategory_image }} style={styles.image} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center', 
            justifyContent: 'center',
            padding: 8,
            backgroundColor: 'white',
            width: '100%',
            elevation: 3
          }}>
          <Text style={{
            fontSize: 17, fontWeight: '500', 
            textAlign: "center"
          }}> {subCategoryName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 0.5,
    margin: 10,
    borderRadius: 8,
    elevation: 8,
    borderRadius: 5,
    backgroundColor: 'white',
    height: 180,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
})

export default SubCategoryListing;