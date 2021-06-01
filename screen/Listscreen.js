import React, { useEffect, useState, useCallback, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  TextInput,
  Button,
  SafeAreaView
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import UserEmployee from "../components/UserEmployee";
import Card from "../components/UI/Card"
import Colors from "../constants/Colors";
import * as employeeActions from '../store/actions/Employee';

const SEARCH_EMPLOYEE = 'SEARCH_EMPLOYEE';


const formReducer = (state, action) => {
    if (action.type === 'SEARCH_EMPLOYEE') {
        const updatedInputValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedInputValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true
        for (const key in updatedInputValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key]
        }

        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedInputValidities,
            inputValues: updatedInputValues
        }

    }
    return state

}

const ListScreen = props => {

  const employeeData = useSelector(state => state.employeeList.employeeList)
  const searchedData = useSelector(state => state.employeeList.searchedData)


  const [isSearching, setisSeraching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [pageCurrent, setpageCurrent] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dispatch = useDispatch();

  const [formstate, dispatchFormState] = useReducer(formReducer,
    {
        inputValues: {
            Searching:  ''
        },
        formIsValid: isSearching ? true : false
    }
)

/* Fetching the Data */

  useEffect(() => {
    dispatch(employeeActions.loadEmployee());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
        console.log(error);
        Alert.alert('An Error Occoured', error, [{ text: 'ok' }])
    }
}, [error])

/* Refresh the Page */

  const onRefresh = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(employeeActions.loadEmployee());
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

/* Search Handler */

  const searchsubmitHandler = useCallback(async () => {
    setError(null)
    setIsLoading(true);
    setisSeraching(true);
    try {
        await dispatch(employeeActions.searchEmployee(formstate.inputValues.Searching, pageCurrent))
    } catch (err) {
        setError(err.message)
    }
    setIsLoading(false);

  }, [dispatch, formstate])


  const handleLoadmore = useCallback(async () => {
    console.log("handleloadmore");
    setisSeraching(true);
      setIsLoading(true)
      try {
        setpageCurrent(pageCurrent + 7);
    } catch (err) {
        setError(err.message)
    }
    setIsLoading(false)
}, [dispatch])
   
  const textInputHandler = (inputIdentifier, text) => {
    let isValid = false
    if (text.trim().length > 0) {
        isValid = true
    }
    dispatchFormState({
        type: SEARCH_EMPLOYEE,
        value: text,
        isValid: isValid,
        input: inputIdentifier
    })
  }
  
  if (isLoading) {
  return <View style={styles.centered}>
      <ActivityIndicator size='large' color={Colors.tertiaryColor} />
  </View>
  }

  if(employeeData.length === 0){
    return <View style={styles.noProductsText}>
        <Text>No products found! Do Add </Text> 
    </View>
  }

  const renderGridHeader = () => {
    return (
      <Card style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.type}>
            <Text style={styles.title}>Employee Name</Text>
          </View>
          <View style={styles.type}>
            <Text style={styles.title}>Salary</Text>
          </View>
          <View style={styles.type}>
            <Text style={styles.title}>D_o_Join</Text>
          </View>
          <View style={styles.type}>
            <Text style={styles.title}>Gender</Text>
          </View>
          <View style={styles.type}>
            <Text style={styles.title}>Action</Text>
          </View>
        </View>
      </Card>
    );
  };

  const renderFooter = () => {
    return(
      <View>
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  return( 
  <SafeAreaView>
          <View>
            <View  style={styles.txtbox}>
          <TextInput
            placeholder="Enter Employee Name"
            onChangeText={
              textInputHandler.bind(this, 'Searching')
            }
            style={{ padding: 10 }}
          /></View>
          <View>
          <Button title="Search" onPress={searchsubmitHandler} color='#5c3c92' style={styles.Button} />
          </View>
        </View>
    <FlatList
      refreshing={isRefreshing}
      data={isSearching ? searchedData : employeeData}
      ListHeaderComponent={renderGridHeader}
      keyExtractor={itemData => itemData.id.toString()}
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadmore}
      onEndReachedThreshold={1}
      onRefresh = {onRefresh}
      renderItem={itemData =>
          <UserEmployee
              onSelect={() => {props.navigation.navigate('EditEmployeeList', {employeeId: itemData.item.id }) }}
              Emp_Name={itemData.item.Emp_Name}
              Salary={itemData.item.Salary}
              D_o_Join={itemData.item.D_o_Join}
              Gender={itemData.item.Gender}
          />}
  />
  </SafeAreaView>
  )
}
export const screenOptions = (navData) => {
  return {
    headerTitle: "Employee List",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName="md-menu"
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Create"
            iconName="add"
            onPress={() => {
              navData.navigation.navigate('EditEmployeeList');
            }}
          />
        </HeaderButtons>
      );
    },
  };
};
const styles = StyleSheet.create({
  headerMenuButton: {
      marginLeft: 10
  },
  headerEditButton: {
      marginRight: 10
  },
  type: {
    fontFamily: "open-sans",
    fontSize: 12,
    marginVertical: 4,
    width: "20%",
    paddingLeft: 5
  },
  noProductsText:{
      flex:1,
      alignItems:'center',
      justifyContent:'center'
  },
  textinput: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#008952',
    backgroundColor: 'white'
  },
  Button: {
    fontFamily: "open-sans",
    fontSize: 12,
    marginVertical: 10,
    marginLeft: 150,
    width: "20%",
    paddingLeft: 5
  },
  txtbox: {
      display: 'flex',
      borderWidth: 2,
      borderColor: 'grey',
      width:"100%",
      marginTop: 10,
  }
})
export default ListScreen;