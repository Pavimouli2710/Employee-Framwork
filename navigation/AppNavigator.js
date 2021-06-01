import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";

import {
  Platform,
  SafeAreaView,
  View,
  Text,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";


import ListScreen, { screenOptions as EmployeeScreenOptions, } from "../screen/Listscreen";

import Colors from "../constants/Colors";

import EditEmployeeScreen, { screenOptions as EditEmployeeScreenOptions, } from '../screen/EditEmployeeScreen';
import AuthScreen, { screenOptions as authScreenOptions } from '../screen/AuthScreen';
import PlacesListScreen, { screenOptions as placesscreenoptions } from '../screen/PlacesListScreen';
import AddPlaceScreen, { screenOptions as addPlacescreenoptions } from "../screen/AddPlaceScreen";
import * as authActions from "../store/actions/auth";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const SampleStackNavigator = createStackNavigator();

export const EmployeeNavigator = () => {
  return (
    <SampleStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <SampleStackNavigator.Screen
        name="Employee List"
        component={ListScreen}
        options={EmployeeScreenOptions}
      />
      <SampleStackNavigator.Screen
        name="EditEmployeeList"
        component={EditEmployeeScreen}
        options={EditEmployeeScreenOptions}
      />
    </SampleStackNavigator.Navigator>
  );
};

export const PlaceNavigator = () => {
  return (
    <SampleStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <SampleStackNavigator.Screen
        name="Places"
        component={PlacesListScreen}
        options={placesscreenoptions}
      />
      <SampleStackNavigator.Screen
        name="NewPlace"
        component={AddPlaceScreen}
        options={addPlacescreenoptions}
      />
    </SampleStackNavigator.Navigator>
  );
};

const PhoenixDrawerNavigator = createDrawerNavigator();

export const PhoenixAppNavigator = () => {
  const dispatch = useDispatch();

  return (
    <PhoenixDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: Colors.primaryColor,
                  color: "white",
                  padding: 15,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
                >
                  Employee
                </Text>
                <TouchableHighlight
                  underlayColor="red"
                  onPress={() => {
                    dispatch(authActions.logout());
                  }}
                >
                  <View>
                    <Ionicons name="md-exit" size={26} color="white" />
                  </View>
                </TouchableHighlight>
              </View>
              <DrawerItemList {...props} />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primaryColor,
        activeBackgroundColor: Colors.accentColor,
        labelStyle: {
          fontSize: 16,
        },
      }}
    >
      <PhoenixDrawerNavigator.Screen
        name="Employee List"
        component={EmployeeNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "people-outline" : "ios-cart"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <PhoenixDrawerNavigator.Screen
        name="Places List"
        component={PlaceNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-image" : "ios-cart"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </PhoenixDrawerNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

export default PhoenixAppNavigator;