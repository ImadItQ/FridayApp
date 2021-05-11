import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Accounts</Text>
      <View style={styles.icon}>
        <AntDesign name="user" size={100} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#26004d",
    textAlign: "center",
  },
  icon: {
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "700",
    color: "white",
  },
});
