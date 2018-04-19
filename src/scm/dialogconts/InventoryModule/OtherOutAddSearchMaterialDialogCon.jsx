/**
 * Created by MW on 2017/3/24.
 */
import React, { Component,PropTypes } from "react";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormModalComp from '../../../base/components/FormModalComp';
import  OtherOutAddSearchMaterialDialogAct from '../../actions/InventoryModule/OtherOutAddSearchMaterialDialogAct';
import AddOtherWareHousePageDialogComp from '../../components/InventoryModule/AddOtherWareHousePageDialogComp';


class MemberAddDialogCont extends Component{
    constructor(props, context) {
        super(props, context);
    }

    handleSubmit = (checkedList) => {
        let {currentSelect} = this.props;
        let {index,record,text} = currentSelect;
        let cloneRow = {};
/*        Object.assign(cloneRow,checkedList);*/
        delete cloneRow.status;
  /*      cloneRow.id = checkedList.id;*/
        cloneRow.materialModel = checkedList.model;
        cloneRow.materialUnitName = checkedList.measureUnitName;
        cloneRow.materialUnitCode = checkedList.measureUnit;


        cloneRow.materialCode = checkedList.materialCode;
        cloneRow.materialName = checkedList.materialName;
        cloneRow.materialSpec = checkedList.materialSpec;
/*        cloneRow.planAmount = checkedList.planAmount;*/
        cloneRow.model = checkedList.model;

        this.props.actions.editRow(cloneRow,index);
/*        this.props.actions.setIsEdit();*/
    }

    handleCancel = () => {
        if (!this.props.newState.tableLoading) {
            this.props.hide();
        }
    }


    render() {
        const { visible } = this.props.newState;
        return (
            visible ?
                <AddOtherWareHousePageDialogComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    handleCancel={this.handleCancel}
                    checkedTableList = {this.handleSubmit}
                    visible={visible}
                /> : null
        );
    }
}

MemberAddDialogCont.defaultProps = {
    visible:false,
    title:"物料选择"
}
let mapStateToProps =(state)=>{
    return {
        newState: state.OtherOutAddSearchMaterialDialogRedu.toJS()
    }
}
let mapDispatchToProps =(dispatch)=>({
        takeBtnLoading:()=>{
            dispatch(OtherOutAddSearchMaterialDialogAct.btnLoading(true))
        },
        PurchaseList: (pm) => {
            dispatch( OtherOutAddSearchMaterialDialogAct.PurchaseList(pm) )
        },
        hide:()=>{
            dispatch(OtherOutAddSearchMaterialDialogAct.hide(false))
        },
        checkedTableList: (val) => {
            dispatch(OtherOutAddSearchMaterialDialogAct.checkedTableList(val))
        },
        dispatch
    }
)


export default connect(mapStateToProps,mapDispatchToProps)(MemberAddDialogCont);
