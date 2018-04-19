import React, { Component } from "react";
import { Modal, message } from "../../../base/components/AntdComp";
import { connect } from 'react-redux';
import SaleReturnAddTableDialogComp from '../../components/SaleModule/SaleReturnAddTableDialogComp';
import SaleReturnAct from '../../actions/SaleModule/SaleReturnAct';

class SaleReturnAddTableDialogCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
     handleSubmit = (data) => {
        const { handleSubmit, handleCancel, tablePaging, isFetch, onOK} = this.props;
    //    console.log(data);
    //    this.props.setTable(data);
        // if (isFetch != false) {
        //     handleSubmit(data).then(json => {
        //         if (json.status === 2000) {
        //             handleCancel();
        //             // handleNewAddress(json.data.addressCode);
        //         }
        //     });
        // } else {
        //     onOK(data);
        //     handleCancel();
        // }
    }
    render() {
        let { add_table_visiable } = this.props;
        return (
            add_table_visiable ?
                <SaleReturnAddTableDialogComp
                    {...this.props}
                    visible={add_table_visiable}
                    onOk={this.handleSubmit}
                /> : null
        );
    }
}

SaleReturnAddTableDialogCont.defaultProps = {
    title: "添加物料",
    width: 750,
    maskClosable: true
}


const mapStateToProps = (state) => state.SaleReturnRedu.toJS();

const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(SaleReturnAct.SaleReturnAddTableVisiable(false,'add')) },
    MaterialList: (pm) =>{ return dispatch(SaleReturnAct.MaterialList(pm)) },
    setTable:(data)=>{dispatch(SaleReturnAct.setTable(data))},
    addNewRowToTable:(data,isTax,typePage)=>{dispatch(SaleReturnAct.addNewRowToTable(data,isTax,typePage))},
    

    // handleSubmit: (data) => { return dispatch(SaleReturnAct.handleSubmit(data)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(SaleReturnAddTableDialogCont);
