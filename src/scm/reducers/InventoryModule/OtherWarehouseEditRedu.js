import { fromJS, Record } from 'immutable'
import { OTHE_WAREHOUSE_EIDT } from '../../consts/ActTypes'

let initialData = fromJS({
    editWareHouse: {
        formInfo: {},
        initialOrderInfo: [],  // 取到的订单信息
        orderTypes: [],
        checkedTableList: {},
        index: 0,
        tableData: [],  // 表格最终数据 ---- 待提交 
        autoDataSource: [], // 收货站点 ? 
        searchSource: [],// 收货站点
        listLoading: false,
        saveLoading: false,
        delRows: [], // 可编辑表格---删除行list
        pageloading: false,
        saveLoading: false
    }
});

const OtherWarehouseEditRedu = (state = initialData, action) => {
    switch (action.type) {
        case OTHE_WAREHOUSE_EIDT:
            return action.state;
        default:
            return state;
    }
}

export default OtherWarehouseEditRedu