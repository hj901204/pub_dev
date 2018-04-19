//新增采购明细行
import React, { Component } from "react";
import { Modal, message } from '../../../base/components/AntdComp';
import { connect } from 'react-redux';
import PurchaseAct from '../../actions/OrderModule/PurchaseAct';
import AddPurDetailLineComp from '../../components/OrderModule/AddPurDetailLineComp';

class AddPurDetailLineCont extends Component {
    constructor(props, context) {
        super(props, context);

    }
    handleSubmit = (data) => {
        let { handleSubmit, detail } = this.props;
        let newData = Object.assign({}, detail, data);
        handleSubmit(newData);
        this.handleCancel();
    }
    handleCancel = () => {
        let { showDetailLine, type, dtype } = this.props;
        showDetailLine(type, dtype, false);
    }
    
    render() {
        let { type, dtype } = this.props;
        let { visible } = this.props[type]['dialog'][dtype];
        return (
            visible ?
                <AddPurDetailLineComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    visible={visible}
                    handleCancel={this.handleCancel}
                /> : null
        );
    }
}

AddPurDetailLineCont.defaultProps = {
    width: 800,
    title: '添加物料',
    className: "purOrder-detail-line",
    dtype: 'add',
    detail: {
        "id": "",
        "selfLine": "",
        "purchaseType": "0",
        "materialCode": "",
        "materialName": "",
        "materialSpec": "",
        "materialModel": "",
        "orderNumber": "",
        "measureUnitCode": "",
        "valuationNumber": "",
        "valuationUnit": "",
        "unitPrice": "",
        //"tax": "",
        "money": "",
        "taxMoney": "",
        "taxMoneyTotal": "",
        "spuCode": "",
        "spuName": "",
        "remarks": "",
    },
    disableds:[],
}


export default AddPurDetailLineCont;
