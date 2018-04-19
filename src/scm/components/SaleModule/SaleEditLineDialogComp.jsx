import React, { Component } from "react";
import SaleAddLineDialogComp from './SaleAddLineDialogComp';

class SaleEidtLineDialogComp extends SaleAddLineDialogComp {
    componentDidMount() {
        this.props.initData && this.props.initData();
    }
}

export default SaleEidtLineDialogComp;

