import React, {Component} from 'react';
import {connect} from 'react-redux';
import BomSubUpgradeComp from './BomSubUpgradeComp'
class BomUpgradeComp extends BomSubUpgradeComp {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        this.props.initData && this.props.initData();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.upgrade.bomCode !== nextProps.upgrade.bomCode || this.props.upgrade.version !== nextProps.upgrade.version) {
            this.props.initData && this.props.initData()
        }
    };

}
export default BomUpgradeComp;