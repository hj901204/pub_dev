import React, { Component, PropTypes } from "react";
import { Form, Input, Button, Checkbox, Spin } from '../../base/components/AntdComp';
import AutoSelectComp from '../../base/components/AutoSelectComp';
import FormModalComp from '../../base/components/FormModalComp';
import LinkageCont from '../../base/components/LinkageCont';
import MapComp from '../../base/components/MapComp';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;

class AddAddressComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            address: '',
            data:[]
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.validateFds((err, data) => {
                data={...data,status:this.props.detail.status}
                let newData = {};
                const busPlain=['isMag','isRep','isSog','isBil','isOfe'],
                visiPlain=['isVisible'],
                regPlain=['isReg'];
                newData = { ...data.linkage };
                newData.coordinate = JSON.stringify(data.map);
                newData.addressName = data.addressName;
                let address = data.linkage.address != undefined ? data.linkage.address:'';
                newData.addressDetl =  data.addressDetl;
                newData.status=data.status;
                delete newData.address;
                for(var i=0;i<busPlain.length;i++){
                    if(data.business&&data.business.includes(busPlain[i])){
                        newData[busPlain[i]] = 1;
                    }else{
                        newData[busPlain[i]] = 0;
                    }
                }
                for(var i=0;i<visiPlain.length;i++){
                    if(data.visible&&data.visible.includes(busPlain[i])){
                        newData[visiPlain[i]] = 1;
                    }else{
                        newData[visiPlain[i]] = 0;
                    }
                }
                for(var i=0;i<regPlain.length;i++){
                    if(data.reg&&data.reg.includes(regPlain[i])){
                        newData[regPlain[i]] = 1;
                    }else{
                        newData[regPlain[i]] = 0;
                    }
                }
                if (!err) {
                    this.props.onOk && this.props.onOk(newData);
                }
            });
        }
    }
    handleCancel = (e) => {
        e.preventDefault();
        let { loading, handleCancel } = this.props;
        if (!loading) {
            handleCancel(e);
        }
    }
    componentDidMount() {
        this.props.initData && this.props.initData();
    }
    onPress = (val) => {
        let address = this.getFdv('linkage') && this.getFdv('linkage').address || '';
        let addressDetl = this.getFdv("addressDetl");
        // this.setFdv({ map: { lng: null, lat: null } });
        this.setState({ address: address + addressDetl });
    }
    getResults = (data) => {
        this.setState({ data });
    }
    getPoint = (val) => {
        this.setFdv({
            map:val.point
        })
    }
    getComp = () => {
        let { detail, ...props } = this.props;
        detail = { ...detail, ...props };
        let { countryCode, provinceCode, cityCode, countyCode } = detail;
        let formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 12 },
        };

        let plainOptions = [
            { label: '经营', value: 'isMag' },
            { label: '收货', value: 'isRep' },
            { label: '发货', value: 'isSog' },
            { label: '开票', value: 'isBil' },
            { label: '办公', value: 'isOfe' },
        ];
        let isVisibleOptions = [
            { label: '', value: 'isVisible' },
        ];
        let isRegOptions=[
            { label: '', value: 'isReg' },
        ];
        return (
            <Form className="address-form">
                <FormItem {...formItemLayout} label="名称" hasFeedback >
                    {this.getFD('addressName', {
                        initialValue: detail.addressName,
                        rules: [
                            { required: true, message: '请输入名称' },
                        ],
                    })(
                        <Input placeholder="请输入名称" />
                        )}
                </FormItem>
                <FormItem {...formItemLayout} label="业务用途">
                    {this.getFD('business', {
                        initialValue: detail.businessValue
                    })(
                        <CheckboxGroup options={plainOptions} />
                        )}
                </FormItem>
                {/*<FormItem {...formItemLayout} label="是否注册">
                    {this.getFD('reg', {
                        initialValue: detail.isRegValue
                    })(
                        <CheckboxGroup options={isRegOptions} />
                        )}
                </FormItem>*/}
                <FormItem {...formItemLayout} label="公开可见">
                    {this.getFD('visible', {
                        initialValue: detail.isVisibleValue
                    })(
                        <CheckboxGroup options={isVisibleOptions} />
                        )}
                </FormItem>
                <FormItem {...formItemLayout} label="省市区" className="select-ganged">
                    {this.getFD('linkage', {
                        initialValue: {
                            countryCode,
                            provinceCode,
                            cityCode,
                            countyCode,
                        }
                    })(<LinkageCont />)}
                </FormItem>

                <FormItem {...formItemLayout} label="详细地址">
                    {this.getFD('addressDetl', {
                        initialValue: detail.addressDetl,
                        rules: [
                            { required: true, message: '请输入详细地址' },
                        ]
                    })(
                        <Input placeholder="详细地址" onPressEnter={this.onPress} />
                        /*<AutoSelectComp
                            placeholder="详细地址"
                            selectedList={this.state.data}
                            onSelect={this.getPoint}
                            onSearch={(val) => {this.onPress(val);}}
                            displayName={["title","address"]}
                            keyName={"uid"}
                            width={323}
                            dropdownMatchSelectWidth={false}
                        />*/
                        )}
                </FormItem>

                <FormItem className="map" wrapperCol={{ span: 24 }} >
                    {this.getFD('map', {
                        initialValue: JSON.parse(detail.coordinate),
                        rules: [
                            {
                                required: true,
                                validator: (rule, val, callback) => {
                                    if (val.lng&&val.lat) {
                                        callback();
                                    } else {
                                        callback("未检测到符合条件的地址");
                                    }
                                }
                            }
                        ]
                    })(<MapComp search={this.state.address} getResults={this.getResults}/>)}
                </FormItem>
            </Form>
        )
    }
}
AddAddressComp.defaultProps = {
    detail: {
        addressCode: "",
        addressName: "",
        addressDetl: "",
        businessValue: [],

        countryCode: "CN",
        provinceCode: "",
        cityCode: "",
        countyCode: "",

        isReg: 0,
        isMag: 0,
        isRep: 0,
        isSog: 0,
        isBil: 0,
        isOfe: 0,
        
        isVisible: 0,
        status: 1,
        org: [],

        coordinate: JSON.stringify({
            "lng": null,//116.404,
            "lat": null,//39.915,
        })
    }
}
AddAddressComp.propTypes = {
    detail: PropTypes.object,
}
export default Form.create()(AddAddressComp);
