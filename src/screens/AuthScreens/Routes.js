import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AdminStack from "../AdminScreens/AdminStack";

export default function Routes() {
  return (
    <NavigationContainer>
      <AdminStack />
    </NavigationContainer>
  );
}
