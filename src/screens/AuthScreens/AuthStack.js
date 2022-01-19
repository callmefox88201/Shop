import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-community/async-storage";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import OnBoardScreen from "./OnBoardScreen";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import {
  backgroundColor,
  shadowColor,
} from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const [isFirstLauch, setIsFirstLauch] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLauch(true);
      } else {
        setIsFirstLauch(false);
      }
    });
  }, []);

  let routeName;

  if (isFirstLauch == null) {
    return null;
  } else if (isFirstLauch == true) {
    routeName = "OnBoardScreen";
  } else {
    routeName = "LoginScreen";
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="OnBoardScreen"
        component={OnBoardScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={({ navigation }) => ({
          title: "",
          headerStyle: {
            backgroundColor: "#f9fafd",
            shadowColor: "#f9fafd",
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <FontAwesome.Button
                name="long-arrow-left"
                size={25}
                backgroundColor="#f9fafd"
                color="#333"
                onPress={() => navigation.navigate("LoginScreen")}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
