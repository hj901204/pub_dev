import React, { Component } from "react";
import { Modal, message } from "../../../base/components/AntdComp";
import { connect } from 'react-redux';
import SaleOrderEditTableDialogComp from '../../components/SaleModule/SaleOrderEditTableDialogComp';
import SaleOrderAct from '../../actions/SaleModule/SaleOrderAct';

class SaleOrderEditTableDialogCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
     handleSubmit = (data) => {
        const { handleSubmit, handleCancel, tablePaging, isFetch, onOK} = this.props;
       this.props.setTable(data);
    }
    render() {
        let { edit_table_visiable } = this.props;
        return (
            edit_table_visiable ?
                <SaleOrderEditTableDialogComp
                    {...this.props}
                    visible={edit_table_visiable}
                    onOk={this.handleSubmit}
                /> : null
        );
    }
}

SaleOrderEditTableDialogCont.defaultProps = {
    title: "编辑物料",
    width: 750,
    maskClosable: true
}


const mapStateToProps = (state) => state.SaleOrderRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(SaleOrderAct.SaleOrderAddTableVisiable(false,'edit')) },
    MaterialList: (pm) =>{ return dispatch(SaleOrderAct.MaterialList(pm)) },
    setTable:(data)=>{dispatch(SaleOrderAct.setTable(data))},
    addNewRowToTable:(data,isTax,typePage)=>{dispatch(SaleOrderAct.addNewRowToTable(data,isTax,typePage))},
    

    // handleSubmit: (data) => { return dispatch(SaleOrderAct.handleSubmit(data)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(SaleOrderEditTableDialogCont);
