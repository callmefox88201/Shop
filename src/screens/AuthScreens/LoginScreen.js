import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import SocialButton from "./SocialButton";
import { AuthContext } from "./AuthProvider";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { login } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Image source={require("../../images/logo.png")} style={styles.logo} />
      <Text style={styles.text}>RN</Text>
      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeHolderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeHolderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      <FormButton
        buttonTitle="Sign In"
        onPress={() => login(email, password)}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      <SocialButton
        buttonTitle="Sign In With Facebook"
        btnType="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={() => {}}
      />

      <SocialButton
        buttonTitle="Sign In With Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => {}}
      />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("SignupScreen")}
      >
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
  },
  text: {
    fontFamily: "Kufam-SemiBoldItalic",
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato-Regular",
  },
});
