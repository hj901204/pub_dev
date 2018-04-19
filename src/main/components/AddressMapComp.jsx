/*地址百度API组件 */
import React,{Component} from "react";
import { connect } from 'react-redux';
import { Form, Button,Input,Select,Col,Spin } from '../../base/components/AntdComp';
import FormComp from '../../base/components/FormComp';
import LinkageComp from '../components/LinkageComp';
import AddressAct from '../actions/AddressAct';
import LinkageAct from '../actions/LinkageAct';
import MapComp from '../../base/components/MapComp';
import { shouldComponentUpdate } from '../../base/consts/Utils';


const FormItem = Form.Item;
const Option = Select.Option;
class AddressMapComp extends FormComp{
    constructor(prop){
        super(prop);
        this.state = {
            addressDetl: '',
            countryCode: '',
            provinceCode: '',
            cityCode: '',
            countyCode: '',
            countryName: '',
            provinceName: '',
            cityName: '',
            countyName: ''
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }
    onPress = (e) => {
        let addressDetl = this.getFdv("addressDetl");
        this.setState({ addressDetl });
    }
    componentDidMount() {
    }
    handleCountryChange =(value)=>{
        this.props.ProvinceList(value.key);
        this.setState({
            countryCode:value.key,
            countryName:value.label
        });
        this.props.CleanContry();
    }
    handleProvinceChange = (value) => {
        this.props.CityList(value.key);
        this.setState({
            provinceCode:value.key,
            provinceName:value.label,
        });
        this.props.CleanPrivence();
    }
    handleCityChange = (value) => {
        this.props.CountyList(value.key)
        this.setState({
            cityCode: value.key,
            cityName: value.label,
        });
        this.props.CleanCity();
    }
    handleCountyChange = (value) => {
        this.setState({
            countyCode: value.key,
            countyName: value.label,
        });
    }
    markerAddress = (markerAddress) => {
        console.log('markerAddress', markerAddress);
    }
    render(){
        let { countryCode, provinceCode, cityCode, countyCode, addressDetl, coordinate } = this.props.detail;
        console.log('detail', this.props.detail);
        let { selectLoading,countrySource,provinceSource,citySource,countySource } = this.props.select;
        const tailFormItemLayout = {wrapperCol: {span: 16,offset: 3}};
        let countryOptions = countrySource.map(item => <Option key={item.countryCode} >{item.countryName}</Option>);
        let provinceOptions = provinceSource.map(item => <Option
            key={item.provinceCode}>{item.provinceName}</Option>);
        let cityOptions = citySource.map(item => <Option 
            key={item.cityCode}>{item.cityName}</Option>);
        let countyOptions = countySource.map(item => <Option
            key={item.countyCode}>{item.countyName}</Option>);
        return (
            <div>
                <Spin spinning={selectLoading}>
                <FormItem className="select-ganged" labelCol={{span: 3}} wrapperCol={{ span: 16}} label="地址搜索" >
                    <Col span="6">
                        <FormItem className="select-item">
                            {this.getFD('countryCode',{
                                initialValue:{key:countryCode}
                            })(
                                <Select 
                                    labelInValue 
                                    onChange={this.handleCountryChange}>
                                    {countryOptions}
                                </Select>
                            )
                            }
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem className="select-item">
                            {this.getFD('provinceCode',{
                                initialValue:{key:provinceCode}
                            })(
                                <Select 
                                    labelInValue 
                                    onChange={this.handleProvinceChange}>
                                    {provinceOptions}
                                </Select>
                            )
                            }
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem className="select-item">
                            {this.getFD('cityCode',{
                                initialValue:{key:cityCode}
                            })(
                                <Select 
                                    labelInValue
                                    onChange={this.handleCityChange}>
                                    {cityOptions}
                                </Select>
                            )
                            }
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem className="select-item">
                            {this.getFD('countyCode',{
                                initialValue:{key:countyCode}
                            })(
                                <Select 
                                    labelInValue
                                    onChange={this.handleCountyChange}>
                                    {countyOptions}
                                </Select>
                            )
                            }
                        </FormItem>
                    </Col>
                </FormItem>
                </Spin>
                <FormItem {...tailFormItemLayout}>
                    {this.getFD('addressDetl', {
                        initialValue:addressDetl,
                        rules: [
                            { type:"required", message: '请输入详细地址' },
                        ]
                    })(
                        <Input placeholder="详细地址" onPressEnter={(e)=>this.onPress(e)}  />
                    )}
                </FormItem>
                
                <FormItem className="map" wrapperCol={{ span: 24 }} >
                    {this.getFD('map', {
                        initialValue: { coordinate, addressDetl},
                    })(
                        <MapComp search={this.state} markerAddress={this.markerAddress}/>)
                    }
                </FormItem>
            </div>
        );
    }
}
const mapStateToProps = (state) => { return state.AddressRedu.toJS() }
const mapDispatchToProps = (dispatch) => ({
    CountryList: () => {
        dispatch(AddressAct.CountryList())
    },
    ProvinceList: (countryCode) => {
        dispatch(AddressAct.ProvinceList({countryCode}))
    },
    CityList: (provinceCode) => {
        dispatch(AddressAct.CityList({provinceCode}))
    },
    CountyList: (cityCode) => {
        dispatch(AddressAct.CountyList({cityCode}))
    },
    CleanContry: () => {
        dispatch(AddressAct.CleanOtherRegion(["provinceSource", "citySource", "countySource"],["provinceCode", "cityCode", "countyCode"]))
    },
    CleanPrivence: () => {
        dispatch(AddressAct.CleanOtherRegion(["citySource", "countySource"],["cityCode", "countyCode"]))
    },
    CleanCity: () => {
        dispatch(AddressAct.CleanOtherRegion(["countySource"],["countyCode"]))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(AddressMapComp);

