import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ApplianceList({
  item,
  toggleAppliance,
  deleteAppliance,
}) {
  return (
    <TouchableOpacity onPress={toggleAppliance} onLongPress={deleteAppliance}>
      <Text
        style={{
          ...styles.item,
          backgroundColor:
            item.appliance_status == "on" && item.appliance_type == "Heavy"
              ? "#ff6666"
              : item.appliance_status == "on" &&
                item.appliance_type == "Moderate"
              ? "#66ccff"
              : item.appliance_status == "on" && item.appliance_type == "Low"
              ? "#85e085"
              : item.appliance_status == "off"
              ? "white"
              : "white",
        }}
      >
        {item.appliance_name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    marginBottom: 10,
    borderColor: "#000",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
  },
});
