import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function InitAdminScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E7F2F8",
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "900",
            color: "#20315f",
            fontFamily: "Inter-Bold",
          }}
        >
          ADMIN PANEL
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#74BDCB",
          padding: 20,
          width: "90%",
          borderRadius: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 20,
        }}
        onPress={() => {
          navigation.navigate("AddItemScreen");
        }}
      >
        <Text
          style={{
            fontSize: 19,
            color: "#20315f",
            fontFamily: "Roboto-MediumItalic",
          }}
        >
          Add Product
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#20315f" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#FFA384",
          padding: 20,
          width: "90%",
          borderRadius: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 20,
        }}
        onPress={() => navigation.navigate("EditItemScreen")}
      >
        <Text
          style={{
            fontSize: 19,
            color: "#20315f",
            fontFamily: "Roboto-MediumItalic",
          }}
        >
          Edit Product
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#20315f" />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
