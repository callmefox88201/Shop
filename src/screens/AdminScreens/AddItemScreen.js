import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import database from "@react-native-firebase/database";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

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
        price: parseFloat(price),
        like: 0,
        popular: false,
        storageQuantity: parseInt(quantity),
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
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerBtn}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={40}
              onPress={navigation.goBack}
              color="#fff"
            />
          </View>
          <Text style={styles.helloWorldStyle}>Add product</Text>
        </View>

        <View
          style={{
            backgroundColor: "#FFF",
            top: -50,
            borderRadius: 50,
            height: screenHeight * 0.8,
            marginHorizontal: 20,
            width: screenWidth * 0.9,
          }}
        >
          <TouchableOpacity
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
              backgroundColor: "#AEAEAE",
              alignSelf: "center",
              top: -70,
            }}
            onPress={() => choosePhotoFromLibrary()}
          >
            <Image style={styles.backgroundImage} source={{ uri: image }} />
          </TouchableOpacity>
          <View style={styles.inputText}>
            <Text style={styles.name}>Product's name:</Text>
            <TextInput
              placeholder="Name"
              style={styles.editProduct}
              onChangeText={(name) => setName(name)}
              maxLength={15}
            />
          </View>

          <View style={styles.inputText}>
            <Text style={styles.name}>Product's type:</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#999",
                width: 200,
                borderRadius: 10,
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

          <View style={[styles.inputText, { justifyContent: "center" }]}>
            <View style={{ width: "50%", flexDirection: "row" }}>
              <Text style={styles.name}>Price:</Text>
              <TextInput
                keyboardType="numeric"
                onChangeText={(price) => setPrice(price)}
                maxLength={5}
                style={[styles.editProduct, { width: 75, marginLeft: 25 }]}
              />
            </View>
            <View
              style={{
                width: "50%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.name}>Quantity:</Text>
              <TextInput
                keyboardType="numeric"
                onChangeText={(quantity) => setQuantity(quantity)}
                maxLength={5}
                style={[styles.editProduct, { width: 75 }]}
              />
            </View>
          </View>

          <View style={{ height: 150, flexDirection: "column", top: -50 }}>
            <Text style={[styles.name, { margin: 10 }]}>
              Product's description
            </Text>
            <TextInput
              placeholder="Description"
              style={[
                styles.editProduct,
                {
                  height: 100,
                  width: "80%",
                  alignSelf: "center",
                  borderRadius: 10,
                  textAlignVertical: "top",
                },
              ]}
              multiline={true}
              onChangeText={(description) => setDescription(description)}
              maxLength={300}
            />
          </View>
          <TouchableOpacity
            style={{
              marginHorizontal: 25,
              padding: 10,
              borderRadius: 10,
              backgroundColor: "#122636",
              alignItems: "center",
              top: -20,
            }}
            onPress={() => {
              if (validate()) {
                post();
              }
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>
              POST
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "baseline",
    justifyContent: "flex-start",
  },
  inputText: {
    top: -50,
    justifyContent: "space-between",
    flexDirection: "row",
    height: 40,
    fontSize: 16,
    marginVertical: 16,
    marginHorizontal: 10,
  },
  helloWorldStyle: {
    // paddingLeft: 30,
    // paddingTop: 50,
    marginLeft: 55,
    marginTop: 50,
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  name: {
    color: "gray",
    paddingVertical: 10,
    fontSize: 16,
  },
  editProduct: {
    width: 200,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#122636",
  },
  headerBtn: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 45,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    // alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#122636",
    width: screenWidth,
    height: (screenHeight * 1) / 3,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  backgroundImage: {
    marginHorizontal: 20,
    height: 150,
    borderRadius: 75,
    width: 150,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#aeaeae",
  },
});
