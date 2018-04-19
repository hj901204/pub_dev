import React, { Component } from "react";
import { Form, Input, Spin, Button, Modal, Row, Col, Select, Icon, DatePicker } from '../../../base/components/AntdComp';
import AddProducRecComp from './AddProducRecComp';


class EditProducRecComp extends AddProducRecComp {
    componentDidMount() {
        // this.props.initData && this.props.initData();
    }
}

export default EditProducRecComp;
