import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import { Form, message } from '../../../base/components/AntdComp';
import { bindActionCreators } from 'redux';
import SalesReturnStoreDialogAct from "../../actions/InventoryModule/SalesReturnStoreDialogAct"
import SalesReturnStoreDialogComp from "../../components/InventoryModule/SalesReturnStoreDialogComp";

class SalesReturnStoreDialogCont extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            list: []
        }
    }

    handleSubmit = (data) => {
        let list = this.state.list;
        for (var i = list.length - 1; i >= 0; i--) {
            if (list[i].freightSpaceCode == "" && list[i].warehouseCode == "" && list[i].materialAmount == "") {
                list.splice(i, 1)
            }
        }
        if (list.length > 0) {
            this.props.actions.tableData(list);
            this.setState({ list: { list: [] } }) // --- 每次预收货提交后，list要置空
        } else {
            message.info("没有预收货信息")
        }
    }

    handleCancel = () => {
        if (!this.props.loading) {
            this.props.actions.hide();
        }
    }

    onChange = (list) => {
        this.setState({ list })
    }

    render() {
        let { visible, data } = this.props;
        return (
            visible ?
                <SalesReturnStoreDialogComp
                    className='pre-receive-dialog-box'
                    {...this.props}
                    onOk={this.handleSubmit}
                    handleCancel={this.handleCancel}
                    handleSubmit={this.handleSubmit}
                    onChange={this.onChange}
                /> : null
        );
    }
}

SalesReturnStoreDialogCont.defaultProps = {
    title: "预收货",
    width: 750
}

let mapStateToProps = (state) => {
    return state.SalesReturnStoreDialogRedu.toJS()
}

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SalesReturnStoreDialogAct, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesReturnStoreDialogCont);