import React, { Component } from "react";
import AddPositionComp from './AddPositionComp';

class EditPositionComp extends AddPositionComp {
    constructor(props, context) {
        super(props, context);

    }
    componentDidMount() {
        this.props.initData && this.props.initData();
    }
}

export default EditPositionComp;
