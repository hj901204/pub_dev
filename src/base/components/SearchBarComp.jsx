import React, { Component, PropTypes } from 'react';
import { Select, Input, Button, DatePicker, Form, Row, Col } from './AntdComp';
import SearchComp from './SearchComp';
import SelectComp from './SelectComp'
import MTable from './TableComp';
import FormComp from './FormComp';
import moment from "moment";
const { RangePicker } = DatePicker;
const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;

let defaultIcon = {
    '查询':'c2mfont c2m-search1',
    '新建':'c2mfont c2m-jia',
    '导入':'c2mfont c2m-daoru_nor',
    '导出':'c2mfont c2m-daochu',
}

class SearchTableComp extends FormComp {
    constructor(props, context) {
        super(props, context);
        this.searchParam = {
            key: "",
            val: ""
        };
        this.state = {
            value: props.searchData.left[0]
        }
    };

    // onChangeVal = (e) => {
    //     this.searchParam.val = e.target.value;
    // }

    // datePicker = (value, dateString) => {
    //     this.searchParam.key ? this.searchParam.key : this.props.searchData.left[0].key;
    //     this.searchParam.val = dateString;
    //     this.props.onSearch(this.searchParam);
    // }

    getSearchVal = (val, dateString) => {
        val = val.target ? val.target.value : val;
        this.searchParam.key ? this.searchParam.key : this.props.searchData.left[0].key;
        this.searchParam.val = dateString ? dateString : val;
        // this.searchVal();
    }

    searchVal = () => {
        if (this.searchParam.val.length <= 0) {
            this.searchParam.key = ""
        }
        this.props.onSearch(this.searchParam);
    }

    getComp(item) {
        this.searchParam.key = item.key;
        switch (item.type) {
            case "string":
                return <FormItem>
                    {this.getFD('StringVal', {
                        initialValue:item.initialValue||'',
                    })(
                        <Input
                            placeholder={item.label ? item.label : '请输入关键字搜索'}
                            style={{ width: 200, color:'#4C4C4C',  margin: '20px 0px 0px 0px', ...item.style }}
                            onChange={this.getSearchVal}
                            //onSearch={this.getSearchVal}
                            onPressEnter={this.searchVal}
                        />
                        )}
                </FormItem>
            case "select":
                return <FormItem>
                    {this.getFD(item.key, {
                        initialValue: item.initialValue == undefined ? '' : item.initialValue +'',
                    })(
                        <SelectComp
                            {...item}
                            {...item.data}
                            style={{ width: 200, margin: '20px 0px 0px 0px', ...item.data.style }}
                            onChange={this.getSearchVal}
                        />
                        )}
                </FormItem>
            case "date":
                return <FormItem>
                    {this.getFD(item.key, {
                        initialValue: item.initialValue == undefined ? null : moment(item.initialValue[0]) <= moment(item.initialValue[1]) ? [moment(item.initialValue[0]), moment(item.initialValue[1])] : null,
                        onChange: this.getSearchVal
                    })(
                        <RangePicker {...item} style={{ width: 200, margin: '20px 0px 0px 0px', ...item.style }} format="YYYY-MM-DD" />
                        )}
                </FormItem>
            default:
                return;
        }
    }
    onChangeKey = (val, option) => {
        this.setState({
            value: option.props.data
        });
        if (option.props.type == "string") {
            this.setFdv({
                StringVal: ""
            })
        }
        if (option.props.data.initialValue != undefined) {
            this.searchParam = {
                key: option.props.data.key,
                val: option.props.data.initialValue
            };
        } else { 
            this.searchParam = {
                key: "",
                val: ""
            };
        }
        
    }
    render() {
        let { onSearch, searchData, style, ...props } = this.props;
        return (
            <div>
                <Form>
                    <div className="Supplier-head" style={{
                        lineHeight: "73px",
                        //borderBottom: "2px solid #e5e8ec",
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        ...style,
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        }}>
                            <div style={{ flex: '1' }}>
                                <FormItem>
                                    {this.getFD('SearchKey', {
                                        initialValue: searchData.left[0].key,
                                    })(
                                        <Select onSelect={this.onChangeKey} style={{ width: '200px', margin: '20px 20px 0px 0px' }}>
                                            {
                                                searchData.left.map(item => {
                                                    return <Option value={item.key} type={item.type} data={item} key={item.key}>{item.val}</Option>
                                                })
                                            }
                                        </Select>
                                        )}
                                </FormItem>
                            </div>
                            <div style={{ flex: '1' }}>
                                {
                                    this.getComp(this.state.value)
                                }
                            </div>
                            <div style={{ flex: '1' }}>
                                {
                                    searchData.center ? <div className="Supplier-btns" style={{ display: "inline" }}>
                                        {
                                            searchData.center.map(item => {
                                                let icon = item.icon || defaultIcon[item.title];
                                                return <Button type="default" key={item.title} style={{ width:72,height:30,margin: "0 10px", color: "#FBFCFD", backgroundColor: "#4C80CF", border:'none', ...item.style }} onClick={item.Func || this.searchVal} >
                                                    {icon ? <i className={icon} style={{ paddingRight: '7px', fontSize: '10px' }} /> : null}
                                                    {item.title}
                                                </Button>
                                            })
                                        }
                                    </div> : null
                                }
                            </div>
                        </div>
                        <div>
                            {
                                searchData.right ? <div className="Supplier-btns" style={{ display: "inline", float: "right" }}>
                                    {
                                        searchData.right.map(item => {
                                            let icon = item.icon || defaultIcon[item.title];
                                            return <Button type="default" style={{width:72,height:30, marginRight: "10px", color: "#FBFCFD", border:'none',backgroundColor: "#4C80CF", ...item.style }} key={item.title} onClick={item.Func} >
                                                {icon ? <i className={icon} style={{ paddingRight: '7px', fontSize: '10px' }} /> : null}
                                                {item.title}
                                            </Button>
                                        })
                                    }
                                </div> : null
                            }
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}
SearchTableComp.propTypes = {
}
export default Form.create()(SearchTableComp);

// Example
/*
<SearchBarComp 
    onSearch={onSearch}
    searchData={searchData}
/>

this.searchData={
                left:[
                {
                    key:"orderCode",
                    val:"生产订单编号",
                    initialValue:"",
                    type:"string"
                },
                {
                    key:"productCode",
                    val:"产品编码",
                    initialValue:"",
                    type:"string"
                },
                {
                    key:"createByName",
                    val:"创建人",
                    initialValue:"",
                    type:"string"
                },
                {
                    key:"orderStatus",
                    val:"单据状态",
                    initialValue:"",
                    type:"select",
                    data:{
                        list: window.ENUM.getEnum("ProOrderStatus"),
                        keyName:"catCode",
                        labelName:"catName",
                        style:{width:200}
                    }
                },
                {
                    key:"productName",
                    val:"产品名称",
                    initialValue:"",
                    type:"string"
                },
                {
                    key:"productDate",
                    val:"收货日期",
                    initialValue:['1992-01-02','1993-05-06'],
                    type:"date"
                }
            ],
            center:[
                {
                    title:"查询",
                    Func:this.props.onSearch,
                    style:{},
                    type:"button",
                    icon:"c2mfont c2m-search"
                }
            ],
            right:[
                {
                    title:"新增",
                    Func:this.AddProduction,
                    style:{},
                    icon:"add"
                },
                {
                    title:"导入",
                    Func:this.AddPurchase,
                    style:{},
                    icon:""
                }
            ]
        }

*/