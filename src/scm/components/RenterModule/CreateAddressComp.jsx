import React, { Component,PropTypes } from "react";
import { Form, Input, Button, Checkbox } from '../../../base/components/AntdComp';
import moment from 'moment';
import FormComp from '../../../base/components/FormComp';
import LinkageCont from '../../../base/components/LinkageCont';
import MapComp from '../../../base/components/MapComp';
import AddressCheckboxComp from './AddressCheckboxComp';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;

class CreateAddressComp extends FormComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            address: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.props.loading) {
            this.validateFds((err, data) => {
                let newData = {};
                newData = { ...data.linkage };
                newData.coordinate = JSON.stringify(data.map);
                newData.addressName = data.addressName;
                let address = data.linkage.address != undefined ? data.linkage.address:'';
                newData.addressDetl = data.addressDetl;
                newData.bpCode = this.props.bpCode;
                newData.langCode = this.props.detail.langCode || this.props.langCode;
                delete newData.address;
                if (data.business !== undefined) {
                    for (var key of Object.keys(data.business)) {
                        if (data.business[key])
                            newData[key] = 1;
                        else
                            newData[key] = 0;
                    }
                }
                if (!err) {
                    this.props.onOK && this.props.onOK(newData);
                }
            });
        }
    }
    onPress = (e) => {
        let address = this.getFdv('linkage') && this.getFdv('linkage').address || '';
        let addressDetl = this.getFdv("addressDetl");
        if(this.getFdv('linkage')&&this.getFdv('linkage').countryCode == 'CN'){
            this.setState({ address: address + addressDetl });
        }else{
            this.setFdv({ map: { lng: null, lat: null } });
        }
    }
    render() {
        let { detail } = this.props;
        let { countryCode, provinceCode, cityCode, countyCode } = detail;
        let { isRep, isSog, isBil, repDefault, sogDefault, bilDefault } = detail;
        let formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 12}, 
        };
        return (
            <div className="createAddress-body">
                <Form className="address-form">
                    <FormItem {...formItemLayout} label="名称" hasFeedback >
                        {this.getFD('addressName', {
                            initialValue: detail.addressName,
                            rules: [
                                { required:true, message: '名称 必填' },
                                { max:20, message: '名称长度不能超过20！'}
                            ],
                        })(
                            <Input placeholder="请输入名称" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="业务用途">
                        {this.getFD('business', {
                            initialValue: {
                                isRep,
                                isSog,
                                isBil,
                                repDefault,
                                sogDefault,
                                bilDefault
                            },
                            rules: [
                                { required: true, message: '业务用途 必填' },
                                {
                                    validator: (rule, value, callback) => {
                                        if (value.isRep==0 && value.isSog==0 && value.isBil==0 ) {
                                            callback('业务用途 为必填')
                                        } else {
                                            callback()
                                        }
                                    }
                                }
                            ],
                            
                        })(
                            <AddressCheckboxComp/>
                        )}
                    </FormItem> 
                    <FormItem {...formItemLayout} label="省市区" className="select-ganged">
                        {this.getFD('linkage', {
                            initialValue: {
                                countryCode,
                                provinceCode,
                                cityCode,
                                countyCode,
                            },
                            onChange: (value) => {
                                if(value.countryCode=='CN'){
                                    this.setFdv({ map: this.getFdv('map') });
                                }else{
                                    this.setFdv({ map: { lng: null, lat: null } });
                                }
                            },
                        })(<LinkageCont />)}
                    </FormItem>

                    <FormItem {...formItemLayout} label="详细地址">
                        {this.getFD('addressDetl', {
                            initialValue: detail.addressDetl,
                            rules: [
                                { required: true, message: '详细地址 必填' },
                                { max: 200, message: '详细地址长度不能超过200' },
                            ]
                        })(
                            <Input placeholder="详细地址" onPressEnter={this.onPress} />
                            )}
                    </FormItem>

                    <FormItem className="map" wrapperCol={{ span: 24 }} >
                        {this.getFD('map', {
                            initialValue: detail.coordinate&&JSON.parse(detail.coordinate),
                            rules: this.getFdv('linkage').countryCode == 'CN'?[
                                {
                                    required: true,
                                    validator: (rule, val, callback) => {
                                        if (val.lng && val.lat) {
                                            callback();
                                        } else {
                                            callback("未检测到符合条件的地址");
                                        };
                                    }
                                }
                            ]:[]
                        })(<MapComp search={this.state.address} />)}
                    </FormItem>
                </Form>
                <div>
                    <Button type="primary" style={{ backgroundColor: '#fff', color: '#6d8ec1', fontSize: '14px' }} onClick={this.props.handleCancel}>取消</Button>
                    <Button type="primary" style={{ marginRight: '20px', fontSize: '14px' }} onClick={this.handleSubmit}>确定</Button>
                </div>
            </div>
        )
    }
}

CreateAddressComp.defaultProps = {
    detail:{
        addressCode:"",
        addressName:"",
        addressDetl:"",
        countryCode:"CN",
        provinceCode:"",
        cityCode:"",
        countyCode:"",
        isRep:0,
        isSog:0,
        isBil: 0,
        repDefault:0,
        sogDefault:0,
        bilDefault: 0,
        langCode:'',
        coordinate: JSON.stringify({
            "lng": null,//116.404,
            "lat": null,//39.915,
        }),
        businessValue: []
    }
}
CreateAddressComp.propTypes = {
    detail: PropTypes.object,
}
export default Form.create()(CreateAddressComp);
