import React, { Component } from "react";
import AddSupplierComp from './AddSupplierComp';

class EditSupplierComp extends AddSupplierComp {
    componentDidMount() {
        this.props.initData && this.props.initData();
    }
}

export default EditSupplierComp;
