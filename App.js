import React from "react";
import Routes from "./src/screens/AuthScreens/Routes";
import { AuthProvider } from "./src/screens/AuthScreens/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
