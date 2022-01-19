import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const dots = ({ selected }) => {
  let backgroundColor;
  backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";
  return (
    <View
      style={{ width: 6, height: 6, marginHorizontal: 3, backgroundColor }}
    ></View>
  );
};

const skip = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 8 }} {...props}>
    <Text style={{ fontSize: 16 }}>Skip</Text>
  </TouchableOpacity>
);

const next = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 8 }} {...props}>
    <Text style={{ fontSize: 16 }}>Next</Text>
  </TouchableOpacity>
);

const done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 8 }} {...props}>
    <Text style={{ fontSize: 16 }}>Done</Text>
  </TouchableOpacity>
);

export default function OnBoardScreen({ navigation }) {
  return (
    <Onboarding
      SkipButtonComponent={skip}
      NextButtonComponent={next}
      DoneButtonComponent={done}
      DotComponent={dots}
      onSkip={() => navigation.replace("LoginScreen")}
      onDone={() => navigation.navigate("LoginScreen")}
      pages={[
        {
          backgroundColor: "#a6e4d0",
          image: <Image source={require("../../images/onboarding-img1.png")} />,
          title: "Onboarding 1",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#fdeb93",
          image: <Image source={require("../../images/onboarding-img2.png")} />,
          title: "Onboarding 2",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#e9bcbe",
          image: <Image source={require("../../images/onboarding-img3.png")} />,
          title: "Onboarding 3",
          subtitle: "Done with React Native Onboarding Swiper",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
