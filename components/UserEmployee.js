import React from 'react';
import { Text, View, StyleSheet,Button ,TouchableNativeFeedback } from 'react-native';
import Colors from "../constants/Colors";
import Card from "../components/UI/Card"

const UserEmployee = (props) => {
      Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <TouchableNativeFeedback onPress={props.onSelect} useForeground >
      <Card style={styles.gridItem}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.type}>
                <Text style={styles.name}>{props.Emp_Name}</Text>
              </View>
              <View style={styles.type}>
                <Text style={styles.name}>{parseFloat(props.Salary).toFixed(2)}</Text>
              </View>
              <View style={styles.type}>
                <Text style={styles.name}>{props.D_o_Join}</Text>
              </View>
              <View style={styles.type}>
                <Text style={styles.name}>{props.Gender}</Text>
              </View>
              <View style={styles.type}>
              <Button title='Edit' onPress={props.onSelect} color='rgb(47, 91, 105)' />
              </View>
            </View>
          </View>
      </Card>
      </TouchableNativeFeedback>
    );
  };

const styles = StyleSheet.create({
  header: {
    margin: 5,
    backgroundColor: "#ccc",
  },
  headerMenuButton: {
    paddingLeft: 15,
  },
  headerEditButton: {
    paddingRight: 15,
  },
  gridItem: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 5,
    backgroundColor: Colors.operationColor,
  },
  type: {
    fontFamily: "open-sans",
    fontSize: 12,
    marginVertical: 30,
    width: "20%",
    paddingLeft: 5
  },
  status: {
    fontFamily: "open-sans",
    fontSize: 12,
    marginVertical: 4,
    width: "40%",
  },
  touchable: {
    overflow: "hidden",
  },
  name: {
    fontFamily: "open-sans",
    fontSize: 14,
    marginVertical: 4,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 12,
    marginVertical: 2,
  },
  address: {
    fontSize: 14,
    color: "#000",
  },
  imageContainer: {
    width: "15%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default UserEmployee;