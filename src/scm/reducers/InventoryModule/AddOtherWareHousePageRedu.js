import { fromJS, Record } from 'immutable'
import { ADDOTHERWAREHOUSWPAGEREDU } from '../../consts/ActTypes'

let initialData = fromJS({
    addWareHouse: {
        autoDataSource:[],
        dataSource: [],
        searchSource: [],
        listLoading: false,
        saveLoading: false,
        orderTypes: [],
        addOredit: true,
        checkedTableList: {},
        initialOrderInfo: [],
        tableData: [],  // 表格最终数据
        index: 0,
    }
});

const AddOtherWareHousePageRedu = (state = initialData, action) => {
    switch (action.type) {
        case ADDOTHERWAREHOUSWPAGEREDU:
            return action.state;
        default:
            return state;
    }
}

export default AddOtherWareHousePageRedu