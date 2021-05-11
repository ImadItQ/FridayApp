import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
export default function AddButton({ showModal }) {
  return (
    <TouchableOpacity style={styles.addButton} onPress={showModal}>
      <Text style={styles.addbuttonText}>+</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    zIndex: 10,
    right: 10,
    bottom: 80,
    width: 60,
    height: 60,
    backgroundColor: "#4d0099",
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 9,
  },
  addbuttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
});
