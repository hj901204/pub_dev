import React, { Component, PropTypes } from "react";
import { InputNumber, Input, Radio, Select, DatePicker } from './AntdComp';
import AutoSelectComp from './AutoSelectComp';
import SelectComp from './SelectComp';
import { shouldComponentUpdate } from '../consts/Utils';
import update from 'react/lib/update';
import moment from 'moment';

export class InputCell extends Component {
    constructor(props, context) {
        super(props, context);
        this.colName = props.colName;
        this.state = {
            value: props.value,
            obj: props.obj,
        }
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState({value});
        }
        let obj = nextProps.obj;
        if (obj != this.state.obj) {
            this.setState({ obj })
        }
    }

    handleChange(e) {
        const value = e.target.value;
        this.triggerChang(value);
    }
    triggerChang=(value)=>{
        const {onChange,handleChange,record} = this.props;
        handleChange && handleChange(value);
        if(onChange){
            record[this.colName] = value;
            onChange(value);
        }
    }
    render() {
        let { value, obj } = this.state;
        return (
            <Input
                style={{ width: 100 }}
                {...obj}
                value={value}
                onChange={e => this.handleChange(e)}
            />
        );
    }
} 

export class RadioCell extends InputCell {
    handleChange = (e) => {
        let { obj } = this.state;
        let { isTrue, isFalse } = obj;
        const value = e.target.value === true ? isFalse : isTrue;
        this.triggerChang(value);
    };
    render() {
        let { value, obj } = this.state;
        let { isTrue, isFalse } = obj;
        return <Radio
            checked={isTrue === value ? true : false}
            value={isTrue === value ? true : false}
            onChange={e => this.handleChange(e)}
        />;
    }
}

export class InputNumberCell extends InputCell {
    render() {
        let { value, obj } = this.state;
        return (
            <InputNumber
                style={{ width: 100 }}
                {...obj}
                value={value}
                onChange={this.triggerChang}
            />
        )
    }
}

export class SelectCell extends InputCell {
    render() {
        let { value, obj } = this.state;
        return (
            <SelectComp
                style={{ width: 100 }}
                {...obj}
                value={String(value)}
                //list={list}
                //keyName={key}
                //labelName={label}
                onChange={this.triggerChang}
            />
        )
    }
}

export class AutoSelectCell extends InputCell {
    render() {
        let { value, obj } = this.state;
        // let { keyName, labelName } = this.obj;
        return (
            <AutoSelectComp
                style={{ width: 100 }}
                {...obj}
                value={value}
                optionLabelProp="value"
                //selectedList={list}
                //onSelect={onSelect}
                //onSearch={onSearch}
                //displayName={[keyName, labelName]}
                //keyName={key}
                onChange={this.triggerChang}
                //getPopupContainer={(triggerNode) => triggerNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode}
            />
        )
    }
}

export class DatePickerCell extends InputCell {
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState({ value });
        }
        let obj = nextProps.obj;
        if (obj != this.state.obj) {
            this.setState({ obj })
        }
    }
    handleChange=(dates, value)=> {
        this.triggerChang(value);
    }
    render() {
        let { value, obj } = this.state;
        return (
            <DatePicker
                style={{ width: 100 }}
                format="YYYY-MM-DD"
                {...obj}
                value={value?moment(value):null}
                onChange={this.handleChange}
            />
        );
    }
}
