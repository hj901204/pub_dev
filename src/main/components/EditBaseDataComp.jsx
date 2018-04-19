import React from 'react';
import { Form } from '../../base/components/AntdComp';
import AddBaseDataComp from './AddBaseDataComp';

class EditBaseDataComp extends AddBaseDataComp {
    constructor(props){
        super(props);
    }
}

export default Form.create()(EditBaseDataComp);