import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import SocialButton from "./SocialButton";
import { AuthContext } from "./AuthProvider";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const { register } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>
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
      <FormInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeHolderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />
      <FormButton
        buttonTitle="Sign Up"
        onPress={() => {
          if (password === confirmPassword) register(email, password);
          else alert("Recheck the password!");
        }}
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{" "}
        </Text>
        <TouchableOpacity onPress={() => alert("Terms Clicked!")}>
          <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <TouchableOpacity onPress={() => alert("Terms Clicked!")}>
          <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>

      <SocialButton
        buttonTitle="Sign Up With Facebook"
        btnType="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={() => {}}
      />

      <SocialButton
        buttonTitle="Sign Up With Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => {}}
      />

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.navButtonText}>Have an acount? Sign In</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato-Regular",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "Lato-Regular",
    color: "grey",
  },
});
