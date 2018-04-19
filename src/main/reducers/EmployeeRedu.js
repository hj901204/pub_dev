import { fromJS, Record ,Map} from 'immutable';
import { EMPLOYEEREDU }from '../consts/ActTypes';

let initState = fromJS({
    tabLoading: false,
    employeeLoading: false,
    add_employee_visiable: false,
    edit_employee_visiable: false,
    sidebar_visiable: false,
    MoveDeptVisiable:false,
    empCode: null,
    dataSource: [],
    record: {},
//     employee: {
//         empName: null,
//         phone: null,
//         telNo: null,
//         dept: {deptCode:null},
//         position: {positionCode:null},
//         email: null,
//         office: {countryCode:null},
//         empNo: null,
//         entryDate: null,
//         identityType: {identityCode:null},
//         identityNO: null,
//         gender: {genderCode:null},
//         maritalStatus: {maritalStatusCode:null},
//         nationality: {nationalityCode:null},
//         ethnicity:{ethnicityCode: null},
//         nativePlace: null,
//         homeAddr: null,
//         emergencyContact: null,
//         emergencyPhone: null,
//  }
});


const EmployeeRedu = (state = initState, action) => {
    switch (action.type) {
        case EMPLOYEEREDU:
            return action.state; 
        default:    
            return state;
    }
}

export default EmployeeRedu;