import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import database from "@react-native-firebase/database";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

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
        price: price,
        like: like,
        popular: popular,
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
          Edit Product
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
              defaultValue={name}
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
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View>
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
                    width: "55%",
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
                    marginHorizontal: 5,
                  }}
                  keyboardType="numeric"
                  onChangeText={(price) => setPrice(price)}
                  maxLength={5}
                  defaultValue={price}
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
                    width: "55%",
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
                    marginHorizontal: 5,
                  }}
                  keyboardType="numeric"
                  onChangeText={(quantity) => setQuantity(parseInt(quantity))}
                  maxLength={5}
                  defaultValue={"" + quantity}
                />
              </View>
            </View>
            <TouchableOpacity
              style={{
                alignSelf: "center",
                borderRadius: 30,
                borderWidth: 1,
                width: 50,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
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
              defaultValue={description}
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
            <Text>Post</Text>
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
