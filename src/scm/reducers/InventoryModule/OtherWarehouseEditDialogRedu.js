import { fromJS, Record } from 'immutable'
import { OHTER_WAREHOUSE_EDIT_DIALOG } from '../../consts/ActTypes'

let initialData = fromJS({
    visible: false,
    // tableLoading:false,
    // btnLoading:false,
    // dataSource: [],
    // paging:{
    //     current:1,
    //     pageSize:10,
    //     total:10, 
    // },
    // search:{
    //      pageSize:10,
    //      page:1,
    // },
    materialData: {}, // 填充物料编码弹窗的数据，也可以是表格中被选中的数据,
    editRow: {},
});

const OtherWarehouseEditDialogRedu = (state = initialData, action) => {
    switch (action.type) {
        case OHTER_WAREHOUSE_EDIT_DIALOG:
            return action.state;
        default:
            return state;
    }
}

export default OtherWarehouseEditDialogRedu