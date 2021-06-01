import React, { useState, useCallback, useEffect, useReducer } from 'react';
import { Alert, Text, View, StyleSheet, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addEmployee, editEmployees } from "../store/actions/Employee";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import { Picker } from "@react-native-picker/picker";
import EmployeeDate from '../components/PhoenixDateTime';
import Colors from '../constants/Colors';

const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';


const formReducer = (state, action) => {
    if (action.type === 'CREATE_EMPLOYEE') {
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

const EditEmployeeScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const employeeId = props.route.params ? props.route.params.employeeId : null; 

    const editingemployee = useSelector(state => state.employeeList.employeeList.find(Emp => Emp.id === employeeId))
    const searcheditingemployee = useSelector(state => state.employeeList.searchedData.find(Emp => Emp.id === employeeId))
    // console.log('editemployeescreen', employeeId, searcheditingemployee);
    //const searchistrue = isSearching ? searcheditingemployee : editingemployee;
    const dispatch = useDispatch()

    const [formstate, dispatchFormState] = useReducer(formReducer,
        {
            inputValues: {
                Emp_Name: editingemployee ? editingemployee.Emp_Name : '',
                Salary: editingemployee ? editingemployee.Salary : '',
                D_o_Join: editingemployee ? editingemployee.D_o_Join : '',
                Gender: editingemployee ? editingemployee.Gender : ''
            },
            inputValidities: {
                Emp_Name: editingemployee ? true : false,
                Salary: editingemployee ? true : false,
                D_o_Join: editingemployee ? true : false,
                Gender: editingemployee ? true : false
            },
            formIsValid: editingemployee ? true : false
        }
    )





    useEffect(() => {
        if (error) {
            console.log(error);
            Alert.alert('An Error Occoured', error, [{ text: 'ok' }])
        }
    }, [error])

    const submitHandler = useCallback(async () => {

        if (!formstate.formIsValid) {
            Alert.alert('No Data', 'Please enter the form details correctly')
            return
        }
        setError(null)
        setIsLoading(true);
        try {
            if (editingemployee) {
                await dispatch(editEmployees(employeeId,formstate.inputValues.Emp_Name, formstate.inputValues.Salary, formstate.inputValues.D_o_Join, formstate.inputValues.Gender));
            } else {
                await dispatch(addEmployee(formstate.inputValues.Emp_Name, formstate.inputValues.Salary, formstate.inputValues.D_o_Join, formstate.inputValues.Gender))
                Alert.alert('Employee Created Successfully !!!')
            }
            props.navigation.goBack();
        } catch (err) {
            setError(err.message)
         }
        setIsLoading(false);
    }, [dispatch, formstate])

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return (
                  <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                      title="Edit Screen"
                      iconName="save-outline"
                      onPress={submitHandler}
                    />
                  </HeaderButtons>
                );
              },
        })
    }, [submitHandler])
    
    const textInputHandler = (inputIdentifier, text) => {
        let isValid = false
        if (text.trim().length > 0) {
            isValid = true
        }
        dispatchFormState({
            type: CREATE_EMPLOYEE,
            value: text,
            isValid: isValid,
            input: inputIdentifier
        })
    }
    
    const [gender, setSelectedValue] = useState("");

    const dateInputHandler = (inputIdentifier, date) => {
        textInputHandler('D_o_Join', date.toString())
    }

    const salaryInputHandler = (inputIdentifier, INTEGER) => {
        let isValid = false
        if (INTEGER.trim().length > 0) {
            isValid = true
        }
        dispatchFormState({
            type: CREATE_EMPLOYEE,
            value: INTEGER,
            isValid: isValid,
            input: inputIdentifier
        })
    }

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.tertiaryColor} />
        </View>
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Employee Name</Text>
                    <TextInput
                        style={styles.input}
                        type="text"
                        value={formstate.inputValues.Emp_Name}
                        onChangeText={textInputHandler.bind(this, 'Emp_Name')} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Salary</Text>
                    <TextInput
                        style={styles.input}
                        type="number"
                        value={formstate.inputValues.Salary}
                        keyboardType='number-pad'
                        onChangeText={salaryInputHandler.bind(this, 'Salary')} />
                </View>
                <View style={styles.formControl}>
                <Text style={styles.label}>Date of Join
                    {/* <DatePicker
                    testID="dateTimePicker"
                    type="date"
                    value={formstate.inputValues.D_o_Join}
                    mode={mode}
                    display="default"
                    onChange={onChange}
                    onDateChange={dateInputHandler.bind(onChange, 'D_o_Join')}
                    /> */}
                    <EmployeeDate onChangeDate={dateInputHandler} /></Text>
                    <Text>{formstate.inputValues.D_o_Join}</Text>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Gender
                    <Picker
                        selectedValue={gender}
                        value={formstate.inputValues.Gender}
                        style={{ height: 50, width: 150 }}
                        onValueChange={textInputHandler.bind(gender => setSelectedValue(gender), 'Gender')}
                    >
                        <Picker.Item label=" " />
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                    </Picker>
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}

export const screenOptions = (navData) => {
    const routeParams = navData.route.params ? navData.route.params : {};
    return {
        headerTitle: routeParams.employeeId ? 'EditEmployee' : 'Add Screen',
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        marginVertical: 8

    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        fontSize: 22
    },
    headerSaveButton: {
        marginRight: 10
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
export default EditEmployeeScreen;