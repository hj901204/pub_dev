import React, { Component } from "react";
import { Modal, message, Spin } from '../../../base/components/AntdComp';
import { connect } from 'react-redux';
import PurchasePriceAct from '../../actions/OrderModule/PurchasePriceAct';
import AddPurPriceDetailDialogComp from '../../components/OrderModule/AddPurPriceDetailDialogComp';

class EditPurPriceDetailDialogComp extends AddPurPriceDetailDialogComp {
    constructor(props, context) {
        super(props, context);
    }
   
}

export default EditPurPriceDetailDialogComp;