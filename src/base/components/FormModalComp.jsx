import React, { Component } from "react";
import valid from '../consts/ValidateList';
import ModalComp from './ModalComp';

export default class FormModalComp extends ModalComp {
    constructor(prop) {
        super(prop);
    }

    get __form() {
        return this.props.form;
    }
    getFD(id, opt = {}, scope = this.__form) {
        if (opt.rules) opt.rules = opt.rules.map((item, i) => valid(item));

        return this.__form.getFieldDecorator
            .call(scope, id, opt);
    }
    get getFdv() {
        return this.__form.getFieldValue;
    }
    get getFdsv() {
        return this.__form.getFieldsValue;
    }
    get setFdv() {
        return this.__form.setFieldsValue;
    }
    get validateFds() {
        return this.__form.validateFields;
    }
    get resetFds() {
        return this.__form.resetFields;
    }
}

// Example

/*class AddPositionComp extends FormModalComp {
    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.props.loading){
            this.validateFds((err, data) => {
                if (!err) {
                    this.props.onOk && this.props.onOk(data);
                }
            });
        }
    }
    getComp = () => {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { position } = this.props;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="职位名称"
                    hasFeedback
                >
                    {this.getFD('name', {
                        initialValue: position.name,
                        rules: [
                            { type: "required", message: '职位名称不能为空!', }
                        ],
                    })(
                        <Input />
                        )}
                </FormItem>
            </Form>
        )
    }
}
export default Form.create()(AddPositionComp);*/
