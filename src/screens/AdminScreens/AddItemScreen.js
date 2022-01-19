import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  ImageBackground,
} from "react-native";
import { AuthContext } from "../AuthScreens/AuthProvider";
import FormButton from "../AuthScreens/FormButton";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import database from "@react-native-firebase/database";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export default function AddItemScreen({ navigation }) {
  const [image, setImage] = useState("temp");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Table");
  const [uploading, setUploading] = useState(false);

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then((image) => {
      const imageUri = image.path;
      setImage(imageUri);
    });
  };

  const validate = () => {
    if (
      image == "temp" ||
      name == "" ||
      quantity == 0 ||
      price == 0 ||
      description == ""
    ) {
      return false;
    }
    return true;
  };

  const post = async () => {
    const uploadUri = image;
    setUploading(true);
    try {
      let newPostRef = database().ref("products/").push();
      let newPostId = newPostRef.key;
      let firestoreRef = storage().ref("images/" + newPostId);
      await firestoreRef.putFile(uploadUri);
      let downloadUri = await firestoreRef.getDownloadURL();
      newPostRef.set({
        imageUrl: downloadUri,
        name: name,
        type: type,
        price: price,
        like: 0,
        popular: false,
        storageQuantity: quantity,
        description: description,
      });
      setUploading(false);
      alert("done");
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E7F2F8" }}>
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
          Add Product
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={{
            borderRadius: 12,
            borderWidth: 1,
            marginHorizontal: 20,
            height: 300,
            width: 300,
            alignSelf: "center",
          }}
          onPress={() => choosePhotoFromLibrary()}
        >
          <Image style={styles.backgroundImage} source={{ uri: image }} />
        </TouchableOpacity>

        <View style={styles.detailsContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                color: "#122636",
                width: "45%",
              }}
            >
              Product's name:
            </Text>
            <TextInput
              style={{
                borderRadius: 10,
                borderWidth: 1,
                width: 170,
                fontSize: 17,
                textAlign: "center",
                justifyContent: "center",
              }}
              onChangeText={(name) => setName(name)}
              maxLength={15}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              height: 50,
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                color: "#122636",
                width: "45%",
              }}
            >
              Type
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#999",
                width: 170,
              }}
            >
              <Picker
                selectedValue={type}
                onValueChange={(value, index) => setType(value)}
                mode="dropdown"
              >
                <Picker.Item label="Table" value="Table" />
                <Picker.Item label="Chair" value="Chair" />
                <Picker.Item label="Bed" value="Bed" />
                <Picker.Item label="Wardrobe" value="Wardrobe" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                color: "#122636",
                width: "45%",
              }}
            >
              Product's price:
            </Text>
            <TextInput
              style={{
                borderRadius: 10,
                borderWidth: 1,
                width: "20%",
                fontSize: 20,
                textAlign: "center",
                justifyContent: "center",
              }}
              keyboardType="numeric"
              onChangeText={(price) => setPrice(price)}
              maxLength={5}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                color: "#122636",
                width: "45%",
              }}
            >
              Product's quantity:
            </Text>
            <TextInput
              style={{
                borderRadius: 10,
                borderWidth: 1,
                width: "20%",
                fontSize: 20,
                textAlign: "center",
                justifyContent: "center",
              }}
              keyboardType="numeric"
              onChangeText={(quantity) => setQuantity(quantity)}
              maxLength={5}
            />
          </View>
          <View>
            <Text
              style={{
                marginVertical: 10,
                fontWeight: "bold",
                fontSize: 17,
                color: "#122636",
              }}
            >
              Description
            </Text>
            <TextInput
              style={{
                color: "#000",
                fontSize: 17,
                textAlign: "left",
                textAlignVertical: "top",
                borderRadius: 10,
                borderWidth: 1,
                padding: 5,
                height: 140,
              }}
              multiline={true}
              onChangeText={(description) => setDescription(description)}
              maxLength={300}
            />
          </View>
        </View>
        <View style={{ margin: 20 }}>
          <TouchableOpacity
            style={{
              width: 70,
              height: 35,
              backgroundColor: "#74BDCB",
              alignSelf: "flex-end",
              borderRadius: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              if (validate()) {
                post();
              }
            }}
          >
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    marginHorizontal: 20,
    height: 300,
    borderRadius: 15,
    width: 300,
    alignSelf: "center",
  },
  header: {
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: { flex: 1, paddingHorizontal: 20, marginTop: 20 },
});
