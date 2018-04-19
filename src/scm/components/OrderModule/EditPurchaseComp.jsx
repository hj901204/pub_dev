import React, { Component } from "react";
import { Form, Input, Spin, Button, Modal, Row, Col, Select, Icon, DatePicker } from '../../../base/components/AntdComp';
import AddPurchaseComp from './AddPurchaseComp';


class EditPurchaseComp extends AddPurchaseComp {
    componentDidMount() {
        // this.props.initData && this.props.initData();
    }
}

export default EditPurchaseComp;
