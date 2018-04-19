//生产订单
import { fromJS } from 'immutable';
import { PRODUCTIONREDU } from '../../consts/ActTypes';

let initState = fromJS({
    tabLoading: false,
    dataSource: [],
    ProViewData: {},
    saleList: [],
    editProOrdLoading: false,
    addProOrdLoading: false,
    proOrdViewLoading: false,
    updateBom: false,
    resetRecord: false,
    add: {
        productValue: "",
        materialCode: "",
        orderCode: "",
        productionNumber: "",
        measureUnitName: "",
        bomCode: "",
        getFreightSpaceData: [],
        pDeptName: [],
        lineNumber: "",
        bomVersion: "",
        materialUnit: "",
        sourceCodeDilog: false,
    },
    edit: {
        productValue: "",
        materialCode: "",
        orderCode: "",
        productionNumber: "",
        measureUnitName: "",
        bomCode: "",
        getFreightSpaceData: [],
        pDeptName: [],
        lineNumber: "",
        bomVersion: "",
        materialUnit: "",
        sourceCodeDilog: false,
    }
});

const ProductionRedu = (state = initState, action) => {
    switch (action.type) {
        case PRODUCTIONREDU:
            return action.state;
        default:
            return state;
    }
}

export default ProductionRedu;