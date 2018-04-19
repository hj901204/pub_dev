import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import TabsAct from '../../actions/TabsAct';
import AddProOrderRetComp from '../../components/OrderModule/AddProOrderRetComp';

class AddProOrderRetCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <AddProOrderRetComp />
        )
    }

}
AddProOrderRetCont.defaultProps = {
    title: "新建生产退料申请单",
    // width: 800,
}
export default AddProOrderRetCont; 