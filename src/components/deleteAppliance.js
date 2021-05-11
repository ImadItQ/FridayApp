import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function DeleteAppliance({ closeModal, deleteAnAppliance }) {
  return (
    <View style={styles.modalView}>
      <View>
        <Text style={styles.modalText}>Want to delete appliance?</Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={deleteAnAppliance}>
          <View style={styles.deleteButton}>
            <Text style={styles.deleteText}>Delete</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={closeModal}>
          <View style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    justifyContent: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 30,
    width: "70%",
    height: "30%",
  },
  modalText: {
    textAlign: "center",
    marginBottom: 10,
  },
  deleteButton: {
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 3,
    borderRadius: 10,
  },
  deleteText: {
    fontSize: 14,
    fontWeight: "600",
    color: "red",
  },
  cancelButton: {
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 10,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "black",
  },
  buttonView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
