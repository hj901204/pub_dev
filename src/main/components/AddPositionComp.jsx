import React, { Component, PropTypes } from "react";
import { Form, Input, Spin, Button, Modal } from '../../base/components/AntdComp.js';
import FormModalComp from '../../base/components/FormModalComp';
import TXT from '../languages';
const T = TXT.POSITION;
const FormItem = Form.Item;

class AddPositionComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);

    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.validateFds((err, data) => {
                if (!err) {
                    data.positionNo = Number(data.positionNo);
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
                    label={T.NAME}
                    hasFeedback
                >
                    {this.getFD('positionName', {
                        initialValue: position.positionName,
                        rules: [
                            { required: true, message: T.NAMEHELP },
                            { max: 50, message:"职位最多允许50字符"}
                        ],
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={T.CODE}
                    hasFeedback
                >
                    {this.getFD('positionNo', {
                        initialValue: String(position.positionNo)||'',
                        rules: [
                            { type: "numOrLetter" },
                            { max: 20, message: "最多允许20字符" }
                        ],
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={T.DESC}
                    hasFeedback
                >
                    {this.getFD('positionDesc', {
                        initialValue: position.positionDesc,
                        rules: [
                            { max: 500, message: "最多允许500字符" }
                        ],
                    })(
                        <Input />
                        )}
                </FormItem>
            </Form>
        )
    }
}
AddPositionComp.defaultProps = {
    position: {
        positionCode: "",
        positionName: "",
        positionNo: "",
        positionDesc: "",
    },
}
AddPositionComp.propTypes = {
    position: PropTypes.object,
}

export default Form.create()(AddPositionComp);


