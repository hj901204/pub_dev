/**
 *  zy ---- 其他入库单 表格编辑弹窗modal
 */
import React, { Component } from "react";
import { connect } from 'react-redux'
import AddOtherWareHousePageDialogComp from '../../components/InventoryModule/AddOtherWareHousePageDialogComp';
import OtherWarehouseEditDialogAct from '../../actions/InventoryModule/OtherWarehouseEditDialogAct';
import OtherWarehouseEditAct from '../../actions/InventoryModule/OtherWarehouseEditAct';
import OtherWarehouseEditMaterialComp from '../../components/InventoryModule/OtherWarehouseEditMaterialComp';

class OtherWarehouseEditDialogCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    handleCancel = () => {
        if (!this.props.newState.tableLoading) {
            this.props.hide();
        }
    }
    render() {
        let { newState } = this.props;
        return (
            newState.visible ? <OtherWarehouseEditMaterialComp
                visible={newState.visible}
                handleCancel={this.handleCancel}
                className='otherwarehouse-material-dialog'
                {...this.props}
                /> : null
        );
    }
}
OtherWarehouseEditMaterialComp.defaultProps = {
    title: "物料选择",
    // width: 520,
    maskClosable: true
}
const mapStateToProps = (state) => {
    return {
        newState: state.OtherWarehouseEditDialogRedu.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => ({
    // takeBtnLoading: () => {
    //     dispatch(OtherWarehouseEditDialogAct.btnLoading(true))
    // },
    PurchaseList: (pm) => {
      return dispatch(OtherWarehouseEditDialogAct.PurchaseList(pm))
    },
    hide: () => {
        dispatch(OtherWarehouseEditDialogAct.hide(false))
    },
    // checkedTableList: (val) => {
    //     dispatch(OtherWarehouseEditAct.checkedTableList(val))
    // },
    addNewRowToTable: (val) => {
        dispatch(OtherWarehouseEditDialogAct.addNewRowToTable(val))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(OtherWarehouseEditDialogCont)


