import React, { Component } from "react";
import { Form, Input, Spin, Button, Modal, Row, Col, Select, Icon, DatePicker } from '../../../base/components/AntdComp';
import AddPurchasePriceComp from './AddPurchasePriceComp';


class EditPurchasePriceComp extends AddPurchasePriceComp {
    componentDidMount() {
        this.props.initData && this.props.initData();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.edit.current != this.props.edit.current) {
            this.props.initData && this.props.initData();
        }
    }
}

export default EditPurchasePriceComp;
