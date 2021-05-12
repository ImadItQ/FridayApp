import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ApplianceScreen from "../Screens/AppliancesScreen";
import SettingScreen from "../Screens/SettingsScreen";
import AccountScreen from "../Screens/AcountScreen";
const Tab = createBottomTabNavigator();

const Footer = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          borderRadius: 5,
          height: 70,
          backgroundColor: "#9900cc",
        },
      }}
    >
      <Tab.Screen
        name="Appliance"
        component={ApplianceScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="bulb1"
                size={30}
                color={focused ? "white" : "#ff99ff"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="user"
                size={30}
                color={focused ? "white" : "#ff99ff"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="setting"
                size={30}
                color={focused ? "white" : "#ff99ff"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default Footer;

const styles = StyleSheet.create({
  icon: {},
});
