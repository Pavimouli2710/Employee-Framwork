import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import PhoenixAppNavigator, { AuthNavigator } from "./AppNavigator";
import StartupScreen from "../screen/StartupScreen";

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => {
    return !!state.auth.token;
  });
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  return (
    <NavigationContainer>
      {isAuth && <PhoenixAppNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
