//生产退料申请单
import { fromJS } from 'immutable';
import { PRODUCTIONRETURNREDU } from '../../consts/ActTypes';

let initState = fromJS({
    tabLoading: false,
    dataSource: [],
    proReturnViewData: [],
    proReturnLoading: false,
    ReturnGetDetail: {},
    addProductionReturnLoading: false,
    editProductionReturnLoading: false,
    EditReturnDataSource: [],
    AddReturnDataSource: [],
    returnTabLoading: false,
    add: {
        productionOrderList: [],
        deptList: [],
        empList: "",
        productionOrg: "",

    },
    edit: {
        productionOrderList: [],
        deptList: [],
        empList: "",
        productionOrg: "",


    }
});

const ProductionReturnRedu = (state = initState, action) => {
    switch (action.type) {
        case PRODUCTIONRETURNREDU:
            return action.state;
        default:
            return state;
    }
}

export default ProductionReturnRedu;