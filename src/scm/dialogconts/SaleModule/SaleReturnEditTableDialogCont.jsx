import React, { Component } from "react";
import { Modal, message } from "../../../base/components/AntdComp";
import { connect } from 'react-redux';
import SaleReturnEditTableDialogComp from '../../components/SaleModule/SaleReturnEditTableDialogComp';
import SaleReturnAct from '../../actions/SaleModule/SaleReturnAct';

class SaleReturnEditTableDialogCont extends Component {
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
                <SaleReturnEditTableDialogComp
                    {...this.props}
                    visible={edit_table_visiable}
                    onOk={this.handleSubmit}
                /> : null
        );
    }
}

SaleReturnEditTableDialogCont.defaultProps = {
    title: "编辑物料",
    width: 750,
    maskClosable: true
}


const mapStateToProps = (state) => state.SaleReturnRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(SaleReturnAct.SaleReturnAddTableVisiable(false,'edit')) },
    MaterialList: (pm) =>{ return dispatch(SaleReturnAct.MaterialList(pm)) },
    setTable:(data)=>{dispatch(SaleReturnAct.setTable(data))},
    addNewRowToTable:(data,isTax,typePage)=>{dispatch(SaleReturnAct.addNewRowToTable(data,isTax,typePage))},
    

    // handleSubmit: (data) => { return dispatch(SaleReturnAct.handleSubmit(data)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(SaleReturnEditTableDialogCont);
