
// React Native Date Picker – To Pick the Date using Native Calendar
// https://aboutreact.com/react-native-datepicker/

// import React in our code
import React, { useState } from "react";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
  TextInput,
} from "react-native";

//import DatePicker from the package we installed
import DateTimePicker from "@react-native-community/datetimepicker";

const EmployeeDate = (props) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
      props.onChangeDate(mode, moment(selectedDate).format("YYYY-MM-DD"));
  
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.datetimecontainer}>
        <TouchableHighlight onPress={showDatepicker}>
          <View>
            <Ionicons
              name="md-calendar"
              size={28}
              color={Colors.primaryColor}
            />
          </View>
        </TouchableHighlight>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
  datetimecontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EmployeeDate;
