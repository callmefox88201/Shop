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
            onPress={() => navigation.navigate("EditItemScreen2", { item })}
          >
            <View
              style={{
                height: 80,
                elevation: 15,
                borderRadius: 20,
                backgroundColor: "white",
                marginVertical: 10,
                marginHorizontal: 20,
                // paddingHorizontal: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={styles.backgroundImage}
                source={{ uri: item.imageUrl }}
              />
              <View
                style={{
                  height: 100,
                  marginLeft: 10,
                  paddingVertical: 20,
                  flex: 1,
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 14, color: "grey" }}>{item.type}</Text>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                  ${item.price}
                </Text>
              </View>
              <View style={{ width: 120 }}>
                <Text style={{ fontSize: 17 }}>
                  Quantity: {item.storageQuantity}
                </Text>
              </View>
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
    height: 80,
    width: 80,
  },
});
