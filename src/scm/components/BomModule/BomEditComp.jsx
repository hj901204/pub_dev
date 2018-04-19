import React, {Component} from 'react';
import {connect} from 'react-redux';
import BomSubEditComp from './BomSubEditComp'
class BomEditComp extends BomSubEditComp {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        this.props.initData && this.props.initData();
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.edit.bomCode!==nextProps.edit.bomCode||this.props.edit.version!==nextProps.edit.version){
            this.props.initData && this.props.initData()
        }
    };
}
export default BomEditComp;