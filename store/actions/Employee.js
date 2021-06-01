import Employee from "../../models/Employee"
import { insertEmployee, fetchEmployees,editEmployee, searchEmployees, limitEmployees } from "../../helpers/db"

export const CREATE_EMPLOYEE = "CREATE_EMPLOYEE";
export const SET_EMPLOYEE = "SET_EMPLOYEE";
export const EDIT_EMPLOYEE = "EDIT_EMPLOYEE";
export const SEARCH_EMPLOYEE = "SEARCH_EMPLOYEE";


export const addEmployee = ( Emp_Name, Salary, D_o_Join, Gender) => {
    return async (dispatch, getState) => {
    try {
        const employee = await insertEmployee(
            Emp_Name,
            Salary,
            D_o_Join,
            Gender
        );
        console.log(employee);
        dispatch({
            type: CREATE_EMPLOYEE,
            employeeDetail: {id: employee.insertId, Emp_Name: Emp_Name, Salary: Salary, D_o_Join: D_o_Join, Gender: Gender}
        })
        
    } catch (err) {
        console.log(err);
        throw err;
    }     
    };
};

export const searchEmployee = (Searching, pageCurrent) => {
    return async (dispatch, getState) => {
    try {
        const employee = await searchEmployees(
            Searching,
            pageCurrent
        );
        console.log(employee.rows._array);
        const empsearched = employee.rows._array
        dispatch({
            type: SEARCH_EMPLOYEE,
            employeeDetail: empsearched
        })
        
    } catch (err) {
        console.log(err);
        throw err;
    }     
    };
};

export const loadEmployee = () => {
    return async dispatch => {
        try {
            const employees = await fetchEmployees();
            console.log(employees);
            dispatch({ type: SET_EMPLOYEE, employee: employees.rows._array })
            
            
        } catch (err) {
            throw err;
        }
       
    };
};

export const editEmployees = (id, Emp_Name, Salary, D_o_Join, Gender) => {
    return async (dispatch, getState) => {
        try {
            const employee = await editEmployee(
                Emp_Name,
                Salary,
                D_o_Join,
                Gender,
                id
            );
            console.log(employee);
            dispatch({
                type: EDIT_EMPLOYEE,
                employeeDetails: {id: id,Emp_Name: Emp_Name, Salary: Salary, D_o_Join: D_o_Join, Gender: Gender}
            })
            
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}