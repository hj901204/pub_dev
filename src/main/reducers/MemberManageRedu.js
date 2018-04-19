import { fromJS, Record  } from 'immutable'
import { MEMBERCHANGEREDU } from '../consts/ActTypes'

let recode = fromJS({
    memberCodeArr: [],
    dataSource: [],
    paging:{},
    infoDetials: {},
    departinfo: {},
    searchPm: {
        deptCode:'',
        employeeName:'',
        phone: '',
        page: 1,
        pageSize: 10
    },
    record: {},
    headerBar_visible: [
        'none','block'
    ],
    tableLoading: false,
    side_Loading: false,
    //批量移动部门
    MoveDepVisiable:false,
    MoveDepLoading:false,
    movedep: {
        empCodes:[],
        newDeptCode:null,
    },
    pDeptName:{},
    MoveDepList:{
        conditions: [{
            "field": "status",
            "value": 1,
            "operation": 0
            }],
   relations: "status"
    },

});

const MemberManageRedu = ( state = recode, action) => {
    switch (action.type) {
        case MEMBERCHANGEREDU:
            return action.state;
        default:
            return state;
    }
}

export default MemberManageRedu