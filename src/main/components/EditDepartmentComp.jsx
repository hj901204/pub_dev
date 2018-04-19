import React, { Component } from "react";
import AddDepartmentComp from './AddDepartmentComp';

class EditDepartmentComp extends AddDepartmentComp {
    componentDidMount() {
        this.props.initData && this.props.initData();
    }
}

export default EditDepartmentComp;
