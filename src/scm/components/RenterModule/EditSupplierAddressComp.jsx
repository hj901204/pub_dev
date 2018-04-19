import React, { Component } from "react";
import CreateAddressComp from './CreateAddressComp';

class EditSupplierAddressComp extends CreateAddressComp {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        this.props.initData && this.props.initData();
    }
    
}

export default EditSupplierAddressComp;