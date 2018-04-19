import React, { Component } from "react";
import AddMaterialComp from './AddMaterialComp';

class EditMaterialComp extends AddMaterialComp {
    componentDidMount() {
        this.props.initData && this.props.initData();
    }
}

export default EditMaterialComp;

