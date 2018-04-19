import React, {Component, PropTypes} from "react";
import {connect} from 'react-redux';
import { Form, Radio, Button, Checkbox } from '../../../base/components/AntdComp';
const FormItem = Form.Item;

class AddressCheckboxComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = props.value;
            // {
            // isRep: false,
            // repDefault: false,
            // isSog: false,
            // sogDefault: false,
            // isBil: false,
            // bilDefault: false,
        // }
    }
    onChange = (key,dfkey,e) => {
        let newState = {
            [key]: !this.state[key]
        };
        if (dfkey && this.state[key]) {
            newState[dfkey] = false;
        };
        // this.setState(newState);
        this.triggerChange(newState);
    }
    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps  && nextProps.value != this.props.value) {
            const value = nextProps.value;
            this.setState(value);
        }
    }
    render() {
        return (
            <div>
                <div className="Rep-checkbox">
                    <Checkbox checked={this.state.isRep} onChange={()=>this.onChange('isRep','repDefault')}>收货</Checkbox>
                    <Radio disabled={!this.state.isRep} checked={this.state.repDefault} onChange={()=>this.onChange('repDefault')}>设为默认收货地址</Radio>
                </div>
                <div className="Sog-checkbox">
                    <Checkbox checked={this.state.isSog} onChange={()=>this.onChange('isSog','sogDefault')}>发货</Checkbox>
                    <Radio disabled={!this.state.isSog} checked={this.state.sogDefault} onChange={()=>this.onChange('sogDefault')}>设为默认发货地址</Radio>
                </div>
                <div className="Bil-checkbox">
                    <Checkbox checked={this.state.isBil} onChange={()=>this.onChange('isBil','bilDefault')}>开票</Checkbox>
                    <Radio disabled={!this.state.isBil} checked={this.state.bilDefault} onChange={()=>this.onChange('bilDefault')}>设为默认开票地址</Radio>
                </div>
            </div>
        )
    }
}

export default AddressCheckboxComp