//生产领料申请单
import { fromJS } from 'immutable';
import { PRODUCTIONRECEIVEREDU } from '../../consts/ActTypes';

let initState = fromJS({
    tabLoading: false,
    dataSource: [],
    proReceiveLoading: false,
    proReceiveViewData: [],
    proRecbouncedData: [],
    producRecId: null,
    sourceType: '',
    productionOrderCode: null,
    pm: {},
    add: {
        proOrderList: [],
        acquisitionOrgList: [],
        proOrderCodeList: [],
        empCodeList: [],
        producRecLoading: false,
        producRecListLoading: false,
        selectDataList: [],
    },
    edit: {
        acquisitionOrgList: [],
        proOrderCodeList: [],
        empCodeList: [],
        producRecLoading: false,
        producRecListLoading: false,
        selectDataList: [],
    },
    pDeptName: {},
    typeName: null,
});

const ProductionReceiveRedu = (state = initState, action) => {
    switch (action.type) {
        case PRODUCTIONRECEIVEREDU:
            return action.state;
        default:
            return state;
    }
}

export default ProductionReceiveRedu;