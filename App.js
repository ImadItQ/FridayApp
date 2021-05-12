import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Footer from "./src/Components/footer";
import { withAuthenticator } from "aws-amplify-react-native";
import awsconfig from "../Firday/src/aws-exports";
import Amplify from "aws-amplify";
Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

function App() {
  return (
    <NavigationContainer>
      <Footer />
    </NavigationContainer>
  );
}

export default withAuthenticator(App);
