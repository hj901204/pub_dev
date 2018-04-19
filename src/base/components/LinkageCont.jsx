import React, { Component } from "react";
import { Select, Col, Spin } from './AntdComp';
import { shouldComponentUpdate } from '../consts/Utils';
import { ReqApi } from '../services/ReqApi'
import AddressUrls from '../consts/AddressUrls';
import update from 'react/lib/update';
import MapComp from './MapComp';
const Option = Select.Option;

class LinkageCont extends Component {
    constructor(prop) {
        super(prop);
        const value = this.props.value || {};
        this.state = {
            value: {
                countryCode: '',
                provinceCode: '',
                cityCode: '',
                countyCode: '',
                address: '',
            },
            countrys: [],
            provinces: [],
            citys: [],
            countys: [],
            loading: true,
        };

        this.countryName = '';
        this.provinceName = '';
        this.cityName = '';
        this.countyName = '';
    }
    getCountrys = (value, newState) => {
        if (this.state.countrys.length < 1) {
            ReqApi.get({
                url: AddressUrls.COUNTRY_SELECTED,
                pm: {},
            }).then((json) => {
                if (json.status === 2000) {
                    return { ...newState, countrys: json.data.list }
                }
                return newState;
            }).then((newState) => {
                this.getProvinces(value, newState);
            });
        } else {
            this.getProvinces(value, newState);
        }
    }
    getProvinces = (value, newState) => {
        let { countryCode } = value || {};
        if (countryCode && countryCode !== '') {
            if (countryCode !== this.state.value.countryCode || newState.provinces.length < 1) {
                ReqApi.get({
                    url: AddressUrls.PROVINCE_SELECTED,
                    pm: { countryCode }
                }).then((json) => {
                    if (json.status === 2000) {
                        return { ...newState, provinces: json.data.list }
                    }
                    return newState;
                }).then((newState) => {
                    this.getCitys(value, newState);
                });
            } else {
                this.getCitys(value, newState);
            }
        } else {
            this.setState({ ...newState, loading: false });
        }
    }
    getCitys = (value, newState) => {
        let { provinceCode } = value || {};
        if (provinceCode && provinceCode !== '') {
            if (provinceCode !== this.state.value.provinceCode || newState.citys.length < 1) {
                ReqApi.get({
                    url: AddressUrls.CITY_SELECTED,
                    pm: { provinceCode }
                }).then((json) => {
                    if (json.status === 2000) {
                        return { ...newState, citys: json.data.list }
                    }
                    return newState;
                }).then((newState) => {
                    this.getCountys(value, newState);
                });
            } else {
                this.getCountys(value, newState);
            }
        } else {
            this.setState({ ...newState, loading: false });
        }
    }
    getCountys = (value, newState) => {
        let { cityCode } = value || {};
        if (cityCode && cityCode !== '') {
            if (cityCode !== this.state.value.cityCode || newState.countys.length < 1) {
                ReqApi.get({
                    url: AddressUrls.COUNTY_SELECTED,
                    pm: { cityCode }
                }).then((json) => {
                    if (json.status === 2000) {
                        return { ...newState, countys: json.data.list }
                    }
                    return newState;
                }).then((newState) => {
                    this.setState({ ...newState, loading: false });
                });
            } else {
                this.setState({ ...newState, loading: false });
            }
        } else {
            this.setState({ ...newState, loading: false });
        }
    }
    initData = (value) => {
        let newState = update(this.state, { value: { $merge: value || {} } });
        this.getCountrys(value, newState);
    }
    componentWillMount() {
        this.initData(this.props.value);
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps && nextProps.value !== this.props.value) {
            this.initData(nextProps.value);
        }
    }
    handleCountryChange = (obj) => {
        let value = { countryCode: obj.key, provinceCode: '', cityCode: '', countyCode: '' };
        this.countryName = obj.label;
        this.triggerChange(value);
    }
    handleProvinceChange = (obj) => {
        let value = { provinceCode: obj.key, cityCode: '', countyCode: '' };
        this.provinceName = obj.label;
        this.triggerChange(value);
    }
    handleCityChange = (obj) => {
        let value = { cityCode: obj.key, countyCode: '' };
        this.cityName = obj.label;
        this.triggerChange(value);
    }
    handleCountyChange = (obj) => {
        this.countyName = obj.label;
        this.triggerChange({ countyCode: obj.key });
    }

    triggerChange = (value) => {
        const onChange = this.props.onChange;
        this.setState({ loading: true });
        if (onChange) {
            let address = this.countryName + this.provinceName;
            if (this.cityName != '') {
                address = this.cityName + this.countyName;
            }
            onChange(Object.assign({}, this.state.value, value, { address }));
        }
    }
    render() {
        let { value, countrys, provinces, citys, countys, loading } = this.state;
        let { countryCode, provinceCode, cityCode, countyCode } = value;
        return (
            <Spin spinning={loading} style={{ height: '32px' }}>
                <div >
                    <Col span="6">
                        <div className="select-item">
                            <Select
                                labelInValue
                                value={{ key: countryCode }}
                                onChange={this.handleCountryChange}
                                notFoundContent='正在加载数据。。。'
                                placeholder='选择国家'
                            >
                                {
                                    countrys.map(item =>
                                        <Option key={item.countryCode}>{item.countryName}</Option>)
                                }
                            </Select>
                        </div>
                    </Col>
                    <Col span="6">
                        <div className="select-item">
                            <Select
                                labelInValue
                                value={{ key: provinceCode }}
                                onChange={this.handleProvinceChange}
                                notFoundContent='请选择国家'
                                placeholder='选择省份'
                            >
                                {
                                    (countryCode && countryCode !== '') ? provinces.map(item =>
                                        <Option key={item.provinceCode}>{item.provinceName}</Option>
                                    ) : null
                                }
                            </Select>
                        </div>
                    </Col>
                    <Col span="6">
                        <div className="select-item">
                            <Select
                                labelInValue
                                value={{ key: cityCode }}
                                onChange={this.handleCityChange}
                                notFoundContent='请选择省份'
                                placeholder='选择城市'
                            >
                                {
                                    (provinceCode && provinceCode !== '') ? citys.map(item =>
                                        <Option key={item.cityCode}>{item.cityName}</Option>
                                    ) : null
                                }
                            </Select>
                        </div>
                    </Col>
                    <Col span="6">
                        <div className="select-item">
                            <Select
                                labelInValue
                                value={{ key: countyCode }}
                                onChange={this.handleCountyChange}
                                notFoundContent='请选择城市'
                                placeholder='选择区县'
                            >
                                {
                                    (cityCode && cityCode !== '') ? countys.map(item =>
                                        <Option key={item.countyCode}>{item.countyName}</Option>
                                    ) : null
                                }
                            </Select>
                        </div>
                    </Col>
                </div>
            </Spin>
        );
    }
}

export default LinkageCont;


// Example

{/*let value = {
    countryCode,
    provinceCode,
    cityCode,
    countyCode,
};
<FormItem {...formItemLayout} label="省市区">
    {this.getFD('linkage', {
        initialValue: value
    })(<LinkageCont />)}
</FormItem>*/}