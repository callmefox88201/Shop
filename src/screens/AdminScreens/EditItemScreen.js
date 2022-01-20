import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import storage from "@react-native-firebase/storage";
import database from "@react-native-firebase/database";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;

export default function EditItemScreen({ navigation }) {
  const [data, setData] = useState([]);
  const get = () => {
    database()
      .ref("products/")
      .on("value", function (snapshot) {
        let array = [];
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          array.push({
            id: childSnapshot.key,
            imageUrl: childData.imageUrl,
            name: childData.name,
            type: childData.type,
            price: childData.price,
            like: childData.like,
            popular: childData.popular,
            storageQuantity: childData.storageQuantity,
            description: childData.description,
          });
        });
        setData(array);
      });
  };
  useEffect(() => {
    get();
    return () => {
      setData([]);
    };
  }, []);
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerBtn}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={25}
            onPress={navigation.goBack}
          />
        </View>
        <Text
          style={{ fontWeight: "bold", fontSize: 25, marginHorizontal: 80 }}
        >
          Edit Product
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => {
          return item.id;
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              borderRadius: 10,
              borderWidth: 1,
              padding: 5,
              marginHorizontal: 10,
              marginBottom: 10,
            }}
            onPress={() => navigation.navigate("EditItemScreen2", { item })}
          >
            <Image
              style={styles.backgroundImage}
              source={{ uri: item.imageUrl }}
            />
            <View>
              <Text style={{ fontSize: 20 }}>name: {item.name}</Text>
              <Text style={{ fontSize: 20 }}>type: {item.type}</Text>
              <Text style={{ fontSize: 20 }}>price: {item.price}</Text>
              <Text style={{ fontSize: 20 }}>
                quantity: {item.storageQuantity}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  headerBtn: {
    height: 50,
    width: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    marginHorizontal: 20,
    height: 120,
    borderRadius: 15,
    width: 120,
    alignSelf: "center",
  },
});
