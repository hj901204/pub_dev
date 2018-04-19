/**
 * Created by MW on 2017/3/24.
 */
/**
 * Created by MW on 2017/3/24.
 */
import React, { Component, PropTypes } from "react";
import { Form, Select, Input, Tabs, DatePicker, Row, Col, TreeSelect, AutoComplete } from '../../base/components/AntdComp.js';
import moment from 'moment';
import AddAddressCont from '../dialogconts/AddAddressCont';
import FormModalComp from '../../base/components/FormModalComp';
import AddressAct from '../actions/AddressAct';
import { store } from '../data/StoreConfig';
import Validate from '../../base/consts/ValidateList'
const Option = Select.Option;
const { TabPane } = Tabs;
const FormItem = Form.Item;

const TreeNode = TreeSelect.TreeNode;

const dateFormat = 'YYYY-MM-DD';

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};



class MemberAddDialogComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);

        this.state = {
            activeKey: "1",
            value: '',
            newAddress: ''
        }

    }

    handleOnChange = (activeKey) => {
        this.setState({ activeKey });
    }


    drawMapTreeTreeNode = (data) => data.map((item) => {
        if (item.children && item.children.length > 0) {

            return (
                <TreeNode {...item} key={item.id + item.deptCode} value={item.deptCode} title={item.deptName} >
                    {
                        this.drawMapTreeTreeNode(item.children)
                    }
                </TreeNode>
            );
        }
        return (
            <TreeNode key={item.id} title={item.deptName} value={item.deptCode}></TreeNode>
        );

    })


    handleOnChangeTree = (value) => {
        this.setState({ value });
    }



    /*   handleAddressChange = (id)=>{
           this.props.actions && this.props.actions.getAddressEnum && this.props.actions.getAddressEnum(id);
       }*/
    handleOkToAddress = (addressCode) => {
        this.props.actions && this.props.actions.getAddressEnum && this.props.actions.getAddressEnum().then((success) => {
            if (success) {
                this.setState({ newAddress: addressCode });
            }
        });




        //  this.props.refreshAutoComp();
        /*   var data = {
               addressDetl:"asda",
               addressName:"测试新增地址",
               cityCode:"330003",
               cityName:"海北藏族自治州",
               countryCode:"6000002716562",
               countryName:"美国",
               countyCode:"6000002727758",
               countyName:"高州市",
               isSog:1,
               provinceCode:"6000002719937",
               provinceName:"台湾"
           }
   
           var coordinate = {
               lng:"121.444984",
               lat:31.25113
           }
   
   
           var k = coordinate = '{lng:121.444984,lat:31.25113}'
   
           var address = {
               longitude: "double,经度",
               latitude: "double,纬度",
               countryCode: data.countryCode,
               regionCode:null,
               provinceCode:data.provinceCode,
               cityCode: data.cityCode,
               areaCode:data.areaCode,
               detailAddr:data.detailAddr
           }
   
           console.log("handleOkToAddress");*/

        //JSON.parse('{"lng":121.444954,"lat":31.252113}')
    }
    handleClickAddress = (e) => {
        store.dispatch(AddressAct.AddAddressVisiable(true));
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.validateFds((err, data) => {
                //固定电话telNo telStart telEnd
                data.telNo = data.telStart + "-" + data.telEnd;
                data.entryDate = (data.entryDate && data.entryDate.format("YYYY-MM-DD HH:mm:ss")) || '';
                if (!err) {
                    this.props.onOk && this.props.onOk(data);
                } else {
                    this.setState({
                        activeKey: "1",
                    })
                }
            });
        }
    }


    getAddressVal = () => {
        let props = this.props;
        if (this.state.newAddress) {
            return this.state.newAddress;
        }
        if (props.dataSource && props.dataSource.officeAddress && props.dataSource.officeAddress.length > 0) {
            return props.dataSource.officeAddress[0].addressCode;
        }
        return null;
    }

    getComp = () => {
        let data = this.props.dataSource || {};

        return this.props.visible ? (
            <form>
                <Tabs
                    hideAdd
                    onChange={this.handleOnChange}
                    activeKey={this.state.activeKey}
                    type="card"
                    onEdit={this.onEdit}
                >
                    <TabPane tab={"基础信息"} key="1">
                        {
                            this.getFD('empCode', {
                                initialValue: data.empCode || null,
                            })(<Input type="hidden" />)
                        }
                        {
                            this.getFD('status', {
                                initialValue: data.status || null,
                            })(<Input type="hidden" />)
                        }


                        <FormItem
                            {...formItemLayout}
                            label="姓名"
                            hasFeedback
                        >
                            {this.getFD('empName', {
                                initialValue: data.empName || '',
                                rules: [
                                    {
                                        validator: (rule, val, callback) => {
                                            if (val == '') {
                                                callback('姓名不能为空');
                                            } else if (val.length > 50) {
                                                callback("最多允许50字符");
                                            } else {
                                                callback()
                                            }
                                        },
                                        required: true
                                    }
                                ]
                            })(
                                <Input placeholder="请输入姓名" />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="手机"
                            hasFeedback
                        >
                            {this.getFD('phone', {
                                initialValue: (data.phone && data.phone+'') || '',
                                rules: [
                                    { type: "phone", required: true, message: '请输入正确的手机号' }
                                ]
                            })(
                                <Input placeholder="请输入手机号" />
                                )}
                        </FormItem>
                        <div className="tel-fixed">
                            <Row>
                                <Col span={4}></Col>
                                <Col span={9}>
                                    <FormItem
                                        label="固定电话"
                                        hasFeedback
                                        {...formItemLayout}
                                    >
                                        {this.getFD('telStart', {
                                            initialValue: (data.telNo && data.telNo.split("-")[0]) || '',
                                        })(
                                            <Input />

                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem
                                        hasFeedback
                                        {...formItemLayout}
                                    >
                                        {this.getFD('telEnd', {
                                            initialValue: (data.telNo && data.telNo.split("-")[1]) || '',
                                        })(
                                            <Input />

                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </div>

                        <FormItem
                            {...formItemLayout}
                            label="组织"
                            hasFeedback
                        >
                            {
                                this.getFD('deptCode', {
                                    initialValue: (data.dept && data.dept[0]) ? data.dept[0].deptCode : '',
                                })(
                                    <TreeSelect
                                        style={{ width: 300 }}
                                        onChange={this.handleOnChangeTree}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        treeDefaultExpandAll
                                    >
                                        {
                                            this.drawMapTreeTreeNode(this.props.deptEnum)
                                        }
                                    </TreeSelect>
                                    )}
                        </FormItem>


                        <FormItem
                            {...formItemLayout}
                            label="职位"
                            hasFeedback
                        >
                            {this.getFD('positionCode', {
                                initialValue: (data.position && data.position[0]) ? data.position[0].positionCode : ''
                            })(
                                <Select placeholder="请选择">
                                    {
                                        this.props.positionEnum.map(function (item, index) {
                                            return <Option value={item.positionCode + ""} key={item.positionCode + index + ""}>{item.positionName}</Option>;
                                        })
                                    }
                                </Select>
                                )}
                        </FormItem>
                        <FormItem
                            label="邮箱"
                            hasFeedback
                            {...formItemLayout}
                        >
                            {
                                this.getFD('email', {
                                    initialValue: data.email || '',
                                    rules: [
                                        { type: "email", message: "请填写正确的邮箱" },
                                        {
                                            validator: (rule, val, callback) => {
                                                if (val.length > 50) {
                                                    callback("最多允许50字符");
                                                } else {
                                                    callback();
                                                }
                                            }
                                        }
                                    ]
                                }
                                )(
                                    <Input />
                                    )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="办公地址"
                            hasFeedback
                        >
                            {
                                this.getFD('addressCode', {
                                    initialValue: (data.officeAddress && data.officeAddress[0]) ? data.officeAddress[0].addressCode : ''
                                }
                                )(
                                    <Select placeholder="请选择" >
                                        {
                                            this.props.addressEnum.map(function (item, index) {
                                                return (
                                                    <Option value={item.addressCode + ""} key={item.addressCode + index + ""}>
                                                        {`【${item.addressName}】 ${item.addressDetl}`}
                                                    </Option>
                                                )
                                            })
                                        }
                                    </Select>
                                    )
                            }


                        </FormItem>
                        <row>
                            <Col span={6}>
                                <AddAddressCont isFetch handleNewAddress={this.handleOkToAddress}
                                    businessValue={
                                        ['isOfe']
                                    }
                                />
                            </Col>
                            <Col span={14}>
                                <a href="#" onClick={this.handleClickAddress}>添加新地址</a>
                            </Col>
                        </row>
                    </TabPane>
                    <TabPane tab={"详细资料"} key="2">
                        <row>
                            <Col span={12}> <FormItem
                                label="工号"
                                hasFeedback
                                {...formItemLayout}
                            >
                                {this.getFD('empNo', {
                                    initialValue: data.empNo || '',
                                    rules: [
                                        {
                                            validator: (rule, val, callback) => {
                                                if (val.length > 20) {
                                                    callback("最多允许20字符");
                                                } else if (!/^[0-9A-z]{0,20}$/.test(val)) {
                                                    callback("仅支持英文字母及数字");
                                                } else {
                                                    callback()
                                                }
                                            }
                                        },
                                    ]
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="入职时间"
                                    hasFeedback
                                    {...formItemLayout}
                                >{this.getFD('entryDate', {
                                    initialValue: data.entryDate ? moment(data.entryDate, dateFormat) : undefined,
                                })(
                                    <DatePicker format={dateFormat} />
                                    )}
                                </FormItem>
                            </Col>
                        </row>
                        <row>
                            <Col span={12}> <FormItem
                                label="证件类型"
                                hasFeedback
                                {...formItemLayout}
                            >
                                {this.getFD('identityTypeCode', {
                                    initialValue: (data.identityType && data.identityType[0]) ? data.identityType[0].identityCode : '',
                                })(
                                    <Select size="large">
                                        {
                                            window.ENUM.credentials.map(function (item, index) {
                                                return <Option value={item.catCode + ""} key={item.catCode + ""}>{item.catName}</Option>;
                                            })
                                        }
                                    </Select>
                                    )}
                            </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="证件号码"
                                    hasFeedback
                                    {...formItemLayout}
                                >{this.getFD('identityNo', {
                                    initialValue: data.identityNo || '',
                                    rules: [
                                        this.props.form.getFieldsValue().identityTypeCode == 'H001' ? { type: 'idcard', label: '' } : { type: 'passport', label: '' }
                                    ]
                                })(
                                    <Input />

                                    )}
                                </FormItem>
                            </Col>
                        </row>
                        <row>
                            <Col span={12}> <FormItem
                                label="性别"
                                hasFeedback
                                {...formItemLayout}
                            >
                                {this.getFD('genderCode', {
                                    initialValue: ((data.gender && data.gender[0]) ? data.gender[0].genderCode : '') || '',
                                })(
                                    <Select size="large" >
                                        {
                                            window.ENUM.sex.map(function (item, index) {
                                                return <Option value={item.catCode + ""} key={item.catCode + ""}>{item.catName}</Option>;
                                            })
                                        }
                                    </Select>
                                    )}
                            </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="婚姻状态"
                                    hasFeedback
                                    {...formItemLayout}
                                >{this.getFD('maritalStatusCode', {
                                    initialValue: ((data.maritalStatus && data.maritalStatus[0]) ? data.maritalStatus[0].maritalStatusCode : '') || '',
                                })(
                                    <Select size="large">
                                        {
                                            window.ENUM.marry.map(function (item, index) {
                                                return <Option value={item.catCode + ""} key={item.catCode + ""}>{item.catName}</Option>;
                                            })
                                        }
                                    </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </row>

                        <row>
                            <Col span={12}>
                                <FormItem
                                    label="国家"
                                    hasFeedback
                                    {...formItemLayout}
                                >
                                    {this.getFD('nationalityCode', {
                                        initialValue: ((data.nationality && data.nationality[0]) ? data.nationality[0].nationalityCode : '') || '',
                                    })(
                                        <Select size="large" >
                                            {
                                                this.props.countryEnum.map(function (item, index) {
                                                    return <Option value={item.countryCode + ""} key={item.countryCode + index + ""}>{item.countryName}</Option>;
                                                })
                                            }
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="民族"
                                    hasFeedback
                                    {...formItemLayout}
                                >
                                    {this.getFD('ethnicityCode', {
                                        initialValue: ((data.ethnicity && data.ethnicity[0]) ? data.ethnicity[0].ethnicityCode : '') || '',
                                    })(
                                        <Select size="large">
                                            {
                                                window.ENUM.nationality.map(function (item, index) {
                                                    return <Option value={item.catCode + ""} key={item.catCode + ""}>{item.catName}</Option>;
                                                })
                                            }
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                        </row>
                        <row>
                            <Col span={12}>
                                <FormItem
                                    label="籍贯"
                                    hasFeedback
                                    {...formItemLayout}
                                >
                                    {this.getFD('nativePlace', {
                                        initialValue: data.nativePlace || '',
                                        rules: [
                                            {
                                                validator: (rule, val, callback) => {
                                                    if (val.length > 20) {
                                                        callback("最多允许20字符");
                                                    } else {
                                                        callback();
                                                    }
                                                }
                                            }
                                        ]
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="家庭住址"
                                    hasFeedback
                                    {...formItemLayout}
                                >
                                    {this.getFD('homeAddr', {
                                        initialValue: data.homeAddr || '',
                                        rules: [
                                            {
                                                validator: (rule, val, callback) => {
                                                    if (val.length > 100) {
                                                        callback("最多允许100字符");
                                                    } else {
                                                        callback();
                                                    }
                                                }
                                            }
                                        ]
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </Col>
                        </row>

                        <row>
                            <Col span={12}>
                                <FormItem
                                    label="紧急联系人"
                                    hasFeedback
                                    {...formItemLayout}
                                >
                                    {this.getFD('emergencyContact', {
                                        initialValue: data.emergencyContact || '',
                                        rules: [
                                            {
                                                validator: (rule, val, callback) => {
                                                    if (val.length > 50) {
                                                        callback("最多允许50字符");
                                                    } else {
                                                        callback();
                                                    }
                                                }
                                            }
                                        ]
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="紧急联系人电话"
                                    hasFeedback
                                    {...formItemLayout}
                                >
                                    {this.getFD('emergencyPhone', {
                                        initialValue: data.emergencyPhone || '',
                                        rules: [
                                            { type: 'phone', label: '' }
                                        ]
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </Col>
                        </row>

                    </TabPane>
                </Tabs>
            </form>
        ) : '';
    }
}
MemberAddDialogComp.defaultProps = {

}
MemberAddDialogComp.propTypes = {
    position: PropTypes.object,
}
export default Form.create()(MemberAddDialogComp);
