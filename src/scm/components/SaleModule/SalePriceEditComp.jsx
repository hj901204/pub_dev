import React, { Component } from "react";
import SalePriceAddComp from './SalePriceAddComp';

class SalePriceEditComp extends SalePriceAddComp {
    componentDidMount() {
        this.props.initData && this.props.initData();
    }
}

export default SalePriceEditComp;

