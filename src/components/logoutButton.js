import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Auth } from "aws-amplify";

export default function LogoutButton() {
  return (
    <TouchableOpacity
      onPress={() => {
        Auth.signOut();
      }}
      style={styles.logout}
    >
      <AntDesign name="logout" size={20} color="white" />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  logout: {
    position: "absolute",
    zIndex: 10,
    left: 10,
    top: 30,
    width: 30,
    height: 30,
    backgroundColor: "#4d0099",
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
