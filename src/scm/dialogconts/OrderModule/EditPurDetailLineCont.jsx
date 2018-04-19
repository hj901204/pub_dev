//新增采购明细行
import React, { Component } from "react";
import { Modal, message } from '../../../base/components/AntdComp';
import { connect } from 'react-redux';
import PurchaseAct from '../../actions/OrderModule/PurchaseAct';
import AddPurDetailLineComp from '../../components/OrderModule/AddPurDetailLineComp';

class EditPurDetailLineCont extends Component {
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
        let { showDetailLine,type,dtype } = this.props;
        showDetailLine(type, dtype,false);
    }
    render() {
        let { type, dtype, detail } = this.props;
        let { visible } = this.props[type]['dialog'][dtype];
        return (
            visible ?
                <AddPurDetailLineComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    visible={visible}
                    handleCancel={this.handleCancel}
                    detail={detail}
                /> : null
        );
    }
}

EditPurDetailLineCont.defaultProps = {
    width: 800,
    title: '编辑物料',
    className: "purOrder-detail-line",
    dtype: 'edit',
}


export default EditPurDetailLineCont;
