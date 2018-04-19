import React, { Component } from "react";
import { Modal, message } from "../../../base/components/AntdComp";
import { connect } from 'react-redux';
import SaleOrderAddTableDialogComp from '../../components/SaleModule/SaleOrderAddTableDialogComp';
import SaleOrderAct from '../../actions/SaleModule/SaleOrderAct';

class SaleOrderAddTableDialogCont extends Component {
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
                <SaleOrderAddTableDialogComp
                    {...this.props}
                    visible={add_table_visiable}
                    onOk={this.handleSubmit}
                /> : null
        );
    }
}

SaleOrderAddTableDialogCont.defaultProps = {
    title: "添加物料",
    width: 750,
    maskClosable: true
}


const mapStateToProps = (state) => state.SaleOrderRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(SaleOrderAct.SaleOrderAddTableVisiable(false,'add')) },
    MaterialList: (pm) =>{ return dispatch(SaleOrderAct.MaterialList(pm)) },
    setTable:(data)=>{dispatch(SaleOrderAct.setTable(data))},
    addNewRowToTable:(data,isTax,typePage)=>{dispatch(SaleOrderAct.addNewRowToTable(data,isTax,typePage))},
    

    // handleSubmit: (data) => { return dispatch(SaleOrderAct.handleSubmit(data)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(SaleOrderAddTableDialogCont);
