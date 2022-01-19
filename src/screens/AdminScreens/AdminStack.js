import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddItemScreen from "./AddItemScreen";
import InitAdminScreen from "./InitAdminScreen";
import EditItemScreen from "./EditItemScreen";
import EditItemScreen2 from "./EditItemScreen2";

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator
      initialRouteName="InitAdminScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="InitAdminScreen"
        component={InitAdminScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="AddItemScreen"
        component={AddItemScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="EditItemScreen"
        component={EditItemScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="EditItemScreen2"
        component={EditItemScreen2}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}
