import React, { Component } from "react";
import AddCustomerComp from './AddCustomerComp';

class EditCustomerComp extends AddCustomerComp {
    componentDidMount() {
        this.props.initData && this.props.initData();
    }
}

export default EditCustomerComp;
