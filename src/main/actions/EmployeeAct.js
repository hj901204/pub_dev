import { ReqApi } from '../../base/services/ReqApi'
import { Urls } from '../../base/consts/urls';
import { EMPLOYEEREDU } from '../consts/ActTypes';

const actions = {
    TabLoading: (value) => (dispatch, getState) => {
        let state = getState()[EMPLOYEEREDU].set('tabLoading', value);
        dispatch({ type: EMPLOYEEREDU, state });
    },
    EmployeeLoading: (value) => (dispatch, getState) => {
        let state = getState()[EMPLOYEEREDU].set('employeeLoading', value);
        dispatch({ type: EMPLOYEEREDU, state })
    },
    SidebarVisiable: (value) => (dispatch, getState) => {
        let state = getState()[EMPLOYEEREDU].set('sidebar_visiable', value);
        dispatch({ type: EMPLOYEEREDU, state });
    },
    AddEmployeeVisiable: (value) => (dispatch, getState) => {
        let state = getState()[EMPLOYEEREDU].set('add_employee_visiable', value);
        dispatch({ type: EMPLOYEEREDU, state });
    },
    EditEmployeeVisiable: (value, id) => (dispatch, getState) =>  {
        let state = getState()[EMPLOYEEREDU].set('edit_employee_visiable', value);
        if (id||id===null) state = state.set('empCode', id);
        dispatch({ type: EMPLOYEEREDU, state });
    },
   

    Employee: (value) => (dispatch, getState) => {
        let telStart={telStart:value.telNo.substr(0,3)}
        let telEnd={telEnd:value.telNo.substr(5)}
        let state = getState()[EMPLOYEEREDU].set('employee', value);
        dispatch({ type: EMPLOYEEREDU, state });
    },

   
    // GetEmployeeList: (data) => (dispatch, getState) => {
    //     let { list, total, page, pageSize } = data;
    //     let state = getState()[EMPLOYEEREDU].set('dataSource', list)
    //         .set("paging", { total, current: page, pageSize });
    //     dispatch({ type: EMPLOYEEREDU, state });
    // },

    EmployeeDetail: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.EmployeeLoading(true));
        return ReqApi.post({
            url: Urls.GET_DETAILS_INFO,
            pm
        }).then(json => {
            if (json.status === 2000) {
                dispatch(actions.Employee(json.data));
            }
            dispatch(actions.EmployeeLoading(false));
            return json;
        });
    },
   
    
    AddEmployee: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.EmployeeLoading(true));
        return ReqApi.post({
            url: Urls.EMPLOYEE_ADD,
            pm
        }).then(json => {
            dispatch(actions.EmployeeLoading(false));
            return json;
        })
    },
   
    EditEmployee: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.EmployeeLoading(true));
        let employeeNumber = getState()[EMPLOYEEREDU].get('empCode');
        return ReqApi.post({
            url: Urls.EMPLOYEE_UPDATE,
            pm: { ...pm, employeeNumber}
        }).then(json => {
            dispatch(actions.EmployeeLoading(false));
            return json
        })
    },
    
}

export default actions;