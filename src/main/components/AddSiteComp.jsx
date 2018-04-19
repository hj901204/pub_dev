import React, { Component,PropTypes } from "react";
import { Form,Input, Button,Checkbox, Select} from '../../base/components/AntdComp';
import moment from 'moment';
import FormModalComp from '../../base/components/FormModalComp';
import LinkageCont from '../../base/components/LinkageCont';
import AutoSelectComp from '../../base/components/AutoSelectComp';
import MapComp from '../../base/components/MapComp';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const Option = Select.Option;

class AddSiteComp extends FormModalComp {
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
                const sitePlain = ['isSog', 'isPrd', 'isDot'];
                newData = { ...data.linkage };
                newData.coordinate = JSON.stringify(data.map);
                let address = data.linkage.address != undefined ? data.linkage.address : '';
                newData.addressDetl =  data.addressDetl;
                newData.siteName = data.siteName;
                newData.siteCode = data.siteCode;
                newData.orgCode = data.orgCode;
                newData.status = this.props.detail.status || 0;
                newData.tenantCode = '';
                newData.langCode = '';
                newData.remarks = '';
                delete newData.address;
                for (var i = 0; i < sitePlain.length; i++){
                    if (data.business && data.business.includes(sitePlain[i])) {
                        newData[sitePlain[i]] = 1;
                    } else {
                        newData[sitePlain[i]] = 0;
                    }
                
                }
                if (!err) {
                    this.props.onOk && this.props.onOk(newData);
                }
            });
        }
    }
    onPress = (e) => {
        let address = this.getFdv('linkage') && this.getFdv('linkage').address || '';
        let addressDetl = this.getFdv("addressDetl");
        this.setState({ address: address + addressDetl });
    }
    OrgDetail = (val) => {
        this.props.OrgDetail(val.id).then(json => {
            if (json.status === 2000) {
                if (json.data) {
                    this.props.AddressDetail(json.data.addrCode).then(json => {
                        if (json.status === 2000) { 
                            if (json.data.list.length) {
                                let {addressDetl, countryCode, provinceCode, cityCode, countyCode, coordinate} = json.data.list[0];
                                this.setFdv({
                                    linkage: { countryCode, provinceCode, cityCode, countyCode },
                                    addressDetl: addressDetl,
                                    map: JSON.parse(coordinate)
                                })
                            }
                        }
                    })
                }
            } 
        });
    }
    componentWillMount() {
        if (this.props.type == 'add') {
            this.props.OrgList({page:1,pageSize:10});
        }
    }
    getComp = () => {
        let { detail, orgList } = this.props;
        let { countryCode, provinceCode, cityCode, countyCode } = detail;

        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 12}, 
        };
        const tailFormItemLayout = {
            wrapperCol: {span: 14,offset: 3}
        };
        const plainOptions = [
            { label: '仓储管理', value: 'isSog' },
            { label: '生产制造', value: 'isPrd' },
            { label: '服务网点', value: 'isDot' },
        ];
        return (
            <Form className="address-form">
                <FormItem {...formItemLayout} label="编码" hasFeedback >
                    {this.getFD('siteCode', {
                        initialValue: detail.siteCode||'',
                        rules: [
                            { required: true, message: '编码 为必填' },
                            { max: 20, message: '编码长度不能超过20' },
                        ],
                    })(
                        <Input placeholder="请输入编码" disabled={this.props.type=='add'?false:true}/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="名称" hasFeedback >
                    {this.getFD('siteName', {
                        initialValue: detail.siteName,
                        rules: [
                            { required: true, message: '名称 为必填' },
                            { max: 50, message: '名称长度不能超过50' },
                        ],
                    })(
                        <Input placeholder="请输入名称" />
                    )}
                </FormItem>
                <FormItem
                    label="经营组织"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    {this.getFD('orgCode', {
                        initialValue: detail.orgCode||'',
                        rules: [
                            { required: true, message: '经营组织 为必填' },
                        ],
                    })(
                        <AutoSelectComp
                            key="select"
                            width={322}
                            selectedList={orgList}
                            onSelect={this.OrgDetail}
                            onSearch={(val) => { this.props.OrgList({orgCode:val,orgName:val,page:1,pageSize:10});}}
                            displayName={"orgName"}
                            keyName={"orgCode"}
                        />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="业务用途">
                    {this.getFD('business', {
                        initialValue: detail.siteUse
                    })(
                        <CheckboxGroup options={plainOptions} />
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
                        rules: [
                            {  required: true, message: '省市区 为必填' },
                            {
                                validator: (rule, value, callback) => {
                                    if (value.countryCode == ''||value.provinceCode == '' || value.cityCode == '' || value.countyCode == '') {
                                        callback('省市区 为必填')
                                    } else {
                                        callback()
                                    }
                                }
                            }
                        ]
                    })(<LinkageCont />)}
                </FormItem>

                <FormItem {...formItemLayout} label="详细地址">
                    {this.getFD('addressDetl', {
                        initialValue: detail.addressDetl||'',
                        rules: [
                            { required: true, message: '详细地址 为必填' },
                            { max: 200, message: '详细地址长度不能超过200' },
                        ]
                    })(
                        <Input placeholder="详细地址" onPressEnter={this.onPress} />
                        )}
                </FormItem>

                <FormItem className="map" wrapperCol={{ span: 24 }} >
                    {this.getFD('map', {
                        initialValue: JSON.parse(detail.coordinate),
                    })(<MapComp search={this.state.address} />)}
                </FormItem>
            </Form>
        )
    }
}
AddSiteComp.defaultProps = {
    detail: {
        siteCode: "",
        siteName: "",
        orgCode: "",
        isSog: 0,
        isPrd: 0,
        isDot: 0,
        status: 0,
        countryCode: "",
        provinceCode: "",
        cityCode: "",
        countyCode: "",
        orgList:[],
        coordinate: JSON.stringify({
            "lng": 116.404,
            "lat": 39.915,
        })
    }
}
AddSiteComp.propTypes={
    position:PropTypes.object,
}
export default Form.create()(AddSiteComp);
