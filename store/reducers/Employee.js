import Employee from "../../models/Employee";
import { CREATE_EMPLOYEE, EDIT_EMPLOYEE, SET_EMPLOYEE, SEARCH_EMPLOYEE } from "../actions/Employee";

let DummyData =[
    { id:"1", Emp_Name: "Rajesh", Salary: "25000", D_o_Join: "15.06.2019", Gender: "Male"},
    { id:"2", Emp_Name: "Divya", Salary: "45000.5", D_o_Join: "27.04.2017", Gender: "Female"},
    { id:"3", Emp_Name: "John", Salary: "35000", D_o_Join: "07.08.2017", Gender: "Male"}
]

const initialState = {
    
    employeeList: [],
    searchedData: []
}

export default (state = initialState, action) => {
        switch (action.type) {
            case SET_EMPLOYEE:
            return{
                employeeList : action.employee.map(
                    emp => new Employee(emp.id.toString(), emp.Emp_Name, emp.Salary, emp.D_o_Join, emp.Gender)),
                searchedData: []
            }

            case SEARCH_EMPLOYEE:
            return {
                ...state,
                searchedData: state.searchedData.concat(action.employeeDetail)
            }

            case CREATE_EMPLOYEE :
                const newEmployee = new Employee(
                    action.employeeDetail.id.toString(),
                    action.employeeDetail.Emp_Name,
                    action.employeeDetail.Salary,
                    action.employeeDetail.D_o_Join,
                    action.employeeDetail.Gender
                )
                console.log(newEmployee);
            return {
                ...state,
                employeeList: state.employeeList.concat(newEmployee)
            }

            case EDIT_EMPLOYEE:
                const userEmployeeIndex = state.employeeList.findIndex(Emp => 
                    Emp.id === action.employeeDetails.id)
                const neweditEmployee = new Employee(
                    state.employeeList[userEmployeeIndex].id,
                    action.employeeDetails.Emp_Name,
                    action.employeeDetails.Salary,
                    action.employeeDetails.D_o_Join,
                    action.employeeDetails.Gender
                )
                const updatedEmployee = [...state.employeeList]
                updatedEmployee[userEmployeeIndex] = neweditEmployee;

                console.log(neweditEmployee);
            return {
                ...state,
                employeeList: updatedEmployee
            }
        
            default:    return state;
        };
}