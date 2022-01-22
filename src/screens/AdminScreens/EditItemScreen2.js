import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function EditItemScreen2({ navigation, route }) {
  const { item } = route.params;
  const [image, setImage] = useState(item.imageUrl);
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.storageQuantity);
  const [price, setPrice] = useState(item.price);
  const [like, setLike] = useState(item.like);
  const [description, setDescription] = useState(item.description);
  const [type, setType] = useState(item.type);
  const [popular, setPopular] = useState(item.popular);
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
      price == 0 ||
      description == "" ||
      type == ""
    ) {
      return false;
    }
    return true;
  };

  const post = async () => {
    let uploadUri = image;
    setUploading(true);
    try {
      if (uploadUri !== item.imageUrl) {
        let firestoreRef = storage().ref("images/" + item.id);
        await firestoreRef.delete();
        firestoreRef = storage().ref("images/" + item.id);
        await firestoreRef.putFile(uploadUri);
        uploadUri = await firestoreRef.getDownloadURL();
      }

      let newPostRef = database().ref("products/" + item.id);
      newPostRef.set({
        imageUrl: uploadUri,
        name: name,
        type: type,
        price: parseFloat(price),
        like: like,
        popular: popular,
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
    <View
      style={{ flex: 1, alignItems: "baseline", justifyContent: "flex-start" }}
    >
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
          <Text
            style={{
              marginLeft: 55,
              marginTop: 40,
              fontSize: 30,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Edit Product
          </Text>
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
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: "#AEAEAE",
              alignSelf: "center",
              top: -100,
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
              defaultValue={item.name}
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
                selectedValue={item.type}
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
                defaultValue={"" + item.price}
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
                defaultValue={"" + item.storageQuantity}
                onChangeText={(quantity) => setQuantity(quantity)}
                maxLength={5}
                style={[styles.editProduct, { width: 75 }]}
              />
            </View>
          </View>
          <View style={{ height: 150, flexDirection: "column", top: -80 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={[styles.name, { margin: 10 }]}>
                Product's description
              </Text>
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  borderRadius: 25,
                  borderWidth: 1,
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 30,
                }}
                onPress={() => {
                  setPopular(!popular);
                }}
              >
                <AntDesign
                  name="star"
                  size={24}
                  color={popular ? "#FAD02C" : "black"}
                />
              </TouchableOpacity>
            </View>
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
              defaultValue={item.description}
            />
          </View>
          <TouchableOpacity
            style={{
              marginHorizontal: 25,
              padding: 10,
              borderRadius: 10,
              backgroundColor: "#122636",
              alignItems: "center",
              top: -50,
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
  backgroundImage: {
    marginHorizontal: 20,
    height: 200,
    borderRadius: 100,
    width: 200,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#AEAEAE",
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
  headerBtn: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  detailsContainer: { flex: 1, paddingHorizontal: 20, marginTop: 20 },
  inputText: {
    top: -80,
    justifyContent: "space-between",
    flexDirection: "row",
    height: 40,
    fontSize: 16,
    marginVertical: 16,
    marginHorizontal: 10,
  },
  editProduct: {
    width: 200,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#122636",
  },
  name: {
    color: "gray",
    paddingVertical: 10,
    fontSize: 16,
  },
});
