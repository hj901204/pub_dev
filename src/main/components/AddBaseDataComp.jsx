import React from 'react';
import {Form, Input, Select} from '../../base/components/AntdComp';
import {base_config} from '../consts/BaseData';
import FormModalComp from '../../base/components/FormModalComp';
import {Enum} from '../../base/consts/Enum.js'
let Option = Select.Option;
class AddBaseDataComp extends FormModalComp {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.props.getCountrys();
    }

    createInputs(type, formItemLayout) {
        let {selectData, handleChange} = this.props;
        let inputs = base_config[type].inputs;
        return (
            <div>
                {
                    inputs.map((input, index) => {
                        //国家下拉默认选中第一个
                        let initValue = this.props.record[input.optionCode] ? this.props.record[input.optionCode] : '';
                        if (initValue == undefined)
                            initValue = input.control == "text" ? "" : "0"

                        return (<Form.Item
                            {...formItemLayout}
                            key={index}
                            label={input.label}
                        >
                            {
                                this.props.form.getFieldDecorator(input.optionCode, {
                                    initialValue: initValue,
                                })(
                                    input.control == "text" ? <Input /> :
                                        <Select className="linkage-select">
                                            {
                                                window.ENUM.getEnum(input.enum).map((item, index) => {
                                                    return <Option key={index}
                                                                   value={item.catCode}>{item.catName}</Option>
                                                })
                                            }
                                        </Select>
                                )
                            }
                        </Form.Item>)
                    })
                }
            </div>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.validateFds((err, data) => {
            if (!err) {
                this.props.handleSubmit && this.props.handleSubmit(data);
            }
        });
    }
    getComp = () => {
        let {getFieldDecorator} = this.props.form;
        let {record, title} = this.props;
        let code = base_config[this.props.baseType].fields.code;
        let name = base_config[this.props.baseType].fields.name;
        let desc = base_config[this.props.baseType].fields.desc;
        let formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        console.log(record)
        // let initStatus = title.substring(-2,2) === "编辑" ? <p>状态:{record.status}<p> : "";
        return this.props.visible ? (
            <div className="base-data-dialog">
                <Form>
                    <Form.Item
                        {...formItemLayout}
                        label="编码"
                    >
                        {
                            getFieldDecorator(code, {
                                initialValue: this.props.flag === 2 ? record[code] : '',
                                rules: [{required: true, message: '编码必填!'}]
                            })(
                                this.props.flag === 2 ? <Input disabled={true} placeholder="请输入编码"/> :
                                    <Input placeholder="请输入编码"/>
                            )
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="名称"
                    >
                        {
                            getFieldDecorator(name, {
                                initialValue: this.props.flag === 2 ? record[name] : '',
                                rules: [{required: true, message: '名称必填!'}]
                            })(
                                <Input placeholder="名称"/>
                            )
                        }
                    </Form.Item>
                    {
                        this.createInputs(this.props.baseType, formItemLayout)
                    }
                    <Form.Item
                        {...formItemLayout}
                        label="状态"
                    >
                        {
                            getFieldDecorator("status",{
                                initialValue: this.props.flag === 2 ? ""+record.status : '0',
                            })(
                                <Select className="status-select">
                                    {
                                        Enum.baseDataStatus.map((option,index)=>{
                                            return (<Option key={index} value={option.catCode}>{option.catName}</Option>);
                                        })
                                    }
                                </Select>
                            )
                        }
                    </Form.Item>
                    {
                        base_config[this.props.baseType].code == 'C014' && <Form.Item
                            {...formItemLayout}
                            label="用途"
                        >
                            {
                                getFieldDecorator("purpose", {
                                    initialValue: this.props.flag === 2 ? ""+record["purpose"] : '0',
                                })(
                                    <Select className="status-select">
                                        {
                                            Enum.purpose.map((option, index) => {
                                                return (<Option key={index}
                                                                value={option.catCode}>{option.catName}</Option>);
                                            })
                                        }
                                    </Select>
                                )
                            }
                        </Form.Item>
                    }
                    <Form.Item
                        {...formItemLayout}
                        label="描述"
                    >
                        {
                            getFieldDecorator(desc, {
                                initialValue: this.props.flag === 2 ? record[desc] : '',
                            })(
                                <Input type="textarea"/>
                            )
                        }
                    </Form.Item>
                </Form>
            </div>
        ) : null;
    }
}
export default Form.create()(AddBaseDataComp);