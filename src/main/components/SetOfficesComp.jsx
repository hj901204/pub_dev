import React, { Component, PropTypes } from "react";
import {Form,Select, Input,Row ,Col} from '../../base/components/AntdComp.js';
import FormModalComp from '../../base/components/FormModalComp';

const FormItem = Form.Item;
const Option = Select.Option;

class SetOfficesComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);

    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.validateFds((err, data) => {
                if (!err) {
                    this.props.onOk && this.props.onOk(data);
                }
            });
        }
    }
    componentWillMount(){

        this.props.getSelectSOData();
    }
    getComp = () => {
        let { officesAddress, memberCodeArr } = this.props;
        let formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <Form className="set-offices">

                <FormItem
                    {...formItemLayout}
                    label="选择人数"
                >
                    {( memberCodeArr.length || '0')+'人'}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="办公地址"
                    hasFeedback
                >
                    {this.getFD('officeAddress', {
                    })(
                        <Select placeholder={'请选择地址'}>
                            {
                                officesAddress.map((item, index) => {
                               {/*     if(item.status == 1){  报错先注释掉

                                    }*/}
                                    return (<Option key={item.addressCode+""} value={item.addressCode+""} > {item.addressName} </Option>);
                                })
                            }
                        </Select>
                    )}
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(SetOfficesComp);
