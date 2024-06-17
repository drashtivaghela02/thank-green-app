import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, TouchableOpacity } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { Text } from "react-native";

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
  return (
    <View style={styles.container}>
      <View  style={ clicked ? styles.searchBar__clicked  : styles.searchBar__unclicked } >
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />

        {clicked && (
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              setSearchPhrase("")
              Keyboard.dismiss();
                setClicked(false);
            }} />
            {/* <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                setClicked(false);
              }}
            >
              <View style={styles.btnSecondary}>
                <Text style={styles.btnSecondaryText}>Cancel</Text>
              </View>
            </TouchableOpacity> */}
          </View>
        )}
      </View>
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    // margin: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "85%",

  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#f1f0f5",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#f1f0f5",
    borderRadius: 15,
    alignItems: "center",
    // justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "80%",
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1,
    // paddingVertical: 5,
    // paddingHorizontal: 20,
    // borderWidth: 1,
    // backgroundColor: '#fff',
    // borderColor: '#fff',
  },
  btnSecondaryText: {
    fontSize: 16,
    // lineHeight: 26,
    fontWeight: '600',
    color: '#2c843e',
  },
});