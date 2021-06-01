import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { createStore, combineReducers, applyMiddleware } from "redux";

import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import Colors from "./constants/Colors";
import authReducer from "./store/reducers/auth";
import employeeReducer from "./store/reducers/Employee"
import placesReducer from "./store/reducers/places-reducer"
import { init, initial } from "./helpers/db";
import AppNavigator from "./navigation/AuthNavigator";


init().then(() => {
  console.log('Initialized database');
}).catch(err => {
  console.log('Initialized database failed');
  console.log(err);
})

initial().then(() => {
  console.log('Initialized Place database');
}).catch(err => {
  console.log('Initialized Place database failed');
  console.log(err);
})

const rootReducer = combineReducers({
  employeeList: employeeReducer,
  auth: authReducer,
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          return setFontLoaded(true);
        }}
        onError={() => {
          console.log("Error");
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accentColor,
    alignItems: "center",
    justifyContent: "center",
  },
});