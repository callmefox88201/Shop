import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { windowHeight, windowWidth } from "./Dimensions";

export default function FormInput({
  labelValue,
  placeHolderText,
  iconType,
  ...rest
}) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={25} color="#656" />
      </View>
      <TextInput
        value={labelValue}
        placeholder={placeHolderText}
        numberOfLines={1}
        style={styles.input}
        placeholderTextColor="#656"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: "100%",
    height: windowHeight / 15,
    borderColor: "#ccc",
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  iconStyle: {
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "#ccc",
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: "Lato-Regular",
    color: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
