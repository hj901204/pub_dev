import { fromJS, Record } from 'immutable';
import * as AT from '../consts/ActTypes';

let initState = fromJS({
    tabLoading: false,
    departmentLoading: false,
    add_department_visiable: false,
    edit_department_visiable: false,
    add_address_visiable:false,
    DepartmentId: null,
    dataSource: [],
    paging:{},
    side_Loading: false,
    side_visible:false,
    searchPm: {
        key: "",
        page: 1,
        pageSize: 20
    },
    record: {},
    pDeptName:{},
    deptMgr:{},
    deptMgrName:{},
    detail:{},
    address:{},
    defaultRowKey:[],
    detailAddressName:""
});

const DepartmentRedu = (state = initState, action) => {
    switch (action.type) {
        case AT.DEPARTMENTREDU:
            return action.state;
        // case AT.TAB_LOADING:
        //     return state.set("tabLoading", action.tabLoading);
        // case AT.DEPARTMENT_LOADING:
        //     return state.set("departmentLoading", action.departmentLoading);
        // case AT.GET_DEPARTMENT_LIST:
        //     const { list} = action.data;
        //     return state.set("dataSource", action.data);
        // case 'ADD_SEX':
        //     return {
        //         ...state,
        //         data: state.data.map(row => {
        //             if (action.selectedRowKeys.includes(row.key.toString())) {
        //                 return {
        //                     ...row,
        //                     address: row.age
        //                 }
        //             }
        //             return row
        //         })
        //     }
        // case 'OPEN_MODAL':
        //     return state.set("visible", !action.visible);
        // case 'OPEN_SIDEBAR':
        //     return state.set("side_visible", action.tag);
        // case 'CLOSE_SIDEBAR':
        //     return state.set("side_visible", action.tag);
        // case 'UPDATE_DATA':
        //     return {
        //         ...state,
        //         data: state.data.map(row => {
        //             if (action.data.key === row.key.toString()) {
        //                 return {
        //                     ...row,
        //                     name: action.data.newName,
        //                     age: action.data.newAge
        //                 }
        //             }
        //             return row
        //         }),
        //         visible: !state.visible
        //     }
        // case 'CONCEL':
        //     return state.set("visible", !action.visible);


        // case 'BIGINPICKAPPLE':
        //     return {
        //         ...state
        //     }
        // case 'DONEPICKAPPLE':
        //     return {
        //         ...state,
        //         apples: [
        //             ...state.apples,
        //             {
        //                 id: state.newAppleId,
        //                 weight: action.weight,
        //                 isEaten: false
        //             }
        //         ],
        //         newAppleId: state.newAppleId + 1
        //     }
        // case 'FAILPICKAPPLE':
        //     return {
        //         ...state
        //     }
        // case 'EATAPPLE':
        //     return {
        //         ...state,
        //         apples: state.apples.map(apple => {
        //             if (apple.id === action.id) {
        //                  return {
        //                      ...apple,
        //                      isEaten:true
        //                  }
        //                 //return Object.assign({},apple,{isEaten:true})
        //             }
        //             return apple
        //         })
        //     }
        default:
            return state;
    }
}


export default DepartmentRedu;