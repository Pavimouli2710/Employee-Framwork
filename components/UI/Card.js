import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.accentColor,
  },
});

export default Card;
