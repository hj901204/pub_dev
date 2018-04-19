import React, { Component, PropTypes } from "react";
import update from 'react/lib/update';
import moment from "moment";
import { Form, Input, Spin, Button, Modal, Row, Col, Select, Icon, DatePicker } from '../../../base/components/AntdComp';
import ModalComp from '../../../base/components/ModalComp';
import FormComp from '../../../base/components/FormComp';
import AutoSelectComp from '../../../base/components/AutoSelectComp';
import TreeSelectComp from '../../../base/components/TreeSelectComp';
moment.locale('zh-cn');
const FormItem = Form.Item;
const Option = Select.Option;
class AddCustomerComp extends FormComp {
    constructor(props, context) {
        super(props, context);
        this.state={
            customerName: "",
            show:false,
        };
        this.disabled=true;
        this.param = {
            customerCode : "",
            customerFull : "",
            customerAbt : "",
            customerDesc : "",
            deptCode : "",
            empCode : "",
            currencyCode : "",
            settlementCode : "",
            invoiceTypeCode : "",
            payeeCode : "",
            paymentOrgCode : "",
            scmBp : {
                uscc : "",
                bpFull : "",
                bpAbt : "",
                businessTypeCode : "",
                corporation : "",
                creationDate : "",
                tradeTypeCode : "",
                companyTypeCode : "",
                companyScaleCode : "",
                website : "",
                email : "",
                tel : "",
                fax : "",
                langCode : "" 
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.Record.customerCode != this.props.Record.customerCode && this.props.type == 'edit') {
            this.resetFds();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if(this.props.title=='新建客户'){
                    data.paymentOrgCode="";
                }
            
            data.creationDate=data.creationDate?moment(data.creationDate).format('YYYY-MM-DD'):'';
            let newData = this.param;
            for(let [key,val] of Object.entries(data)){
                if(key in newData.scmBp&&val){
                    newData = update(newData, {
                        scmBp: {
                            [key]: {
                                $set: val
                            }
                        }
                    });
                }
                
                if(key in newData&&val){
                    newData = update(newData, {
                        [key]: {
                            $set: val
                        }
                    });
                }
            };
            newData.scmBp.bpFull=data.customerFull||'';
            newData.scmBp.bpAbt=data.customerAbt||'';
            if (!err) {
                if(this.props.title=='编辑客户'){
                    newData.scmBp.bpCode=this.props.Record.scmBp.bpCode;
                }
                this.props.onOk && this.props.onOk(newData);
            }
        });
    }
    //自动搜索人员
    EmployeesSelectSearch=(val)=>{
        if (this.getFdv("deptCode")) {
            this.props.getEmployeesList({ "deptCode": this.getFdv("deptCode"), "employeeName": val, "employeeCode": val,"page":1,"pageSize":10});
        }
    }
    //自动搜索所属组织机构：
    DeptSelectSearch=(val)=>{
        this.props.getDept({ "orgType": 3, "orgName": val, "orgCode": val,"status":1,"page":1,"pageSize":10});
    }
    //根据部门code获取人员列表
    selectChange=(val)=>{
        this.setFdv({
            empCode:""
        })
        this.props.getEmployeesList({"deptCode":val.orgCode,"page":1,"pageSize":10});
    }
    //自动搜索结算币种
    currencySelectSearch=(val)=>{
        this.props.getCurrencyList({"curName":val,"page":1,"pageSize":10});
    }
    //零级数据自动搜索（结算方式 C014，付款条件 C013，行业 C015，经营类型 C019，公司性质 C018，公司规模 C016）
    subjectSelectSearch=(val,subCode)=>{
        this.props.getSubjectList({"subCode":subCode,"catName":val,"status":1,"catCode":val,"page":1,"pageSize":10});
    }
    //自动搜索商业伙伴
    receiveOrgSelectSearch=(val)=>{
        this.props.getBusinessPartnerData({"bpFull":val,"page":1,"pageSize":10});
    }

    getUscc = (e) => {
        let val = e.target.value;
        let newVal = val.replace(/\s/g,"");

        if(newVal!=""){
            this.props.getBusinessPartnerDetail({"uscc":val});
        }
        
    };

    getCustomerFull=(e)=>{
        let val = e.target.value;
        if (this.props.type === 'add') {
            this.setFdv({
                paymentOrgCode: val
            })
        }    
    }
    componentWillUnmount() {
        this.resetFds();
        this.props.bpSearchData({});
    }

    render() {
        let formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        },
            mgrSign = true,
            mgrName = '';
        let { Record, dept_Name, deptMgr, deptMgrName,defaultDeptCode, showComponentMsg, componentMsg, businessPartner, empList, curList, loading, subjectData, bpData,empCode } = this.props;
        if(this.props.title=='新建客户'){
            // this.param.scmBp=Record.scmBp;
            Record=this.param;
            this.disabled=true;
        }else{
            this.param.customerCode=Record.customerCode;
            this.disabled=false;
        }
        let bpDetail;
        if(this.props.type==='add'){
            bpDetail={};
            bpDetail.scmBp = bpData || {};
            if (!defaultDeptCode) {
                empCode = "";
            }
        }
        if(this.props.type==='edit'){
            bpDetail=Record||{};
            bpDetail.scmBp=Record.scmBp||{};
        }
        return (
            <div style={{marginTop:12}} className='addCustomer_form'>
                <Spin spinning={loading}>
                    <div>
                        <Row style={{height:'60px', lineHeight:'60px',border:'1px solid #E2E2E2'}}>
                            <Col span={2} style={{textIndent:16,fontSize:'14px',fontWeight:'bold',color:'#4a4a4a'}} >{this.props.title}</Col>
                            <Col span={20}></Col>
                            <Col span={2} style={{textAlign:'right',paddingRight:20}}>
                                <Button type='primary' style={{width:72,height:30,background:'#4c80cf'}} onClick={(e)=>this.handleSubmit(e)} >
                                    <i className="c2mfont c2m-baocun" style={{fontSize:10,marginRight:6}}></i>保存
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    <div >
                        <Form>
                            <div style={{border:'1px solid #E2E2E2',borderTop:0,}}>
                                <Row>
                                    <Col span={22} style={{fontSize:'14px',fontWeight:'bold',color:"#4a4a4a",margin:'24px 0 24px 16px'}} >常规</Col>
                                </Row>
                                <Row style={{margin:'0 16px'}}>
                                    <Col span={8}>
                                        <FormItem
                                            label="统一社会信用代码"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('uscc', {
                                                initialValue: bpDetail.scmBp.uscc,
                                                rules: [{type:"socialCredit",label:"请输入",required:true}],
                                            })(
                                                this.props.type==='add'?
                                                <Input placeholder="请输入名称" onBlur={this.getUscc} />:
                                                <Input disabled/>
                                                )}
                                        </FormItem>
                                        <FormItem
                                            label="客户全称"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('customerFull', {
                                                initialValue: bpDetail.customerFull,
                                                rules: [
                                                    { required: true,message: '客户全称 为必填' },
                                                    { max:100,message: '长度不能超过100' }
                                                ],
                                            })(
                                                    bpDetail.status===0||this.props.type==='add' ?
                                                    <Input  placeholder="请输入名称" onBlur={this.getCustomerFull}/>:
                                                    <Input disabled/>
                                                )}
                                        </FormItem>

                                    </Col>
                                    <Col span={8}>
                                        <FormItem
                                            label="客户简称"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('customerAbt', {
                                                initialValue: bpDetail.customerAbt,
                                                rules: [
                                                    { max:100,message: '长度不能超过100' }
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                        <FormItem
                                            label="主语言"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('langCode', {
                                                //rules: [{ required: true, message: 'Please select your gender!' }],
                                                initialValue: bpDetail.scmBp.langCode?bpDetail.scmBp.langCode:"ZH",
                                                onChange: this.handleSelectChange,
                                            })(
                                                <Select>
                                                    {
                                                        window.ENUM.getEnum("language").map((language, index) => {
                                                            return <Select.Option key={language.catCode.toString()} >{language.catCode+`[${language.catName}]`}</Select.Option>
                                                        })
                                                    }
                                                </Select>
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem
                                            label="描述"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('customerDesc', {
                                                //rules: [{ required: true, message: 'Please select your gender!' }],
                                                initialValue: bpDetail.customerDesc || "",
                                                onChange: this.handleSelectChange,
                                            })(
                                                <Input type='textarea' style={{height:72  }} >
                                                </Input>
                                                )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                            <div  className="addCustomer_business">
                                <Row>
                                    <Col span={22} style={{fontSize:'14px',fontWeight:'bold',color:"#4a4a4a",margin:'24px 0 24px 16px'}}>商务</Col>
                                </Row>
                                <Row style={{margin:'0 16px 18px'}}>
                                    <Col span={8}>
                                        <FormItem
                                            label="结算币别"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('currencyCode', {
                                                initialValue: bpDetail.currencyCode||"",
                                                rules: [
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: curList,
                                                        keyName: "curCode",
                                                    }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    width={210}
                                                    selectedList={curList}
                                                    onSelect={this.props.handleChange}
                                                    onSearch={this.currencySelectSearch}
                                                    displayName={["curCode","curName"]}
                                                    keyName={"curCode"}
                                                />
                                                )}
                                        </FormItem>
                                        <FormItem
                                            label="结算方式"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('settlementCode', {
                                                initialValue: bpDetail.settlementCode||"",
                                                onChange: this.handleSelectChange,
                                                rules: [
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: subjectData.C014,
                                                        keyName: "catCode",
                                                    }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    width={210}
                                                    selectedList={subjectData.C014}
                                                    onSelect={this.props.handleChange}
                                                    onSearch={(val)=>this.subjectSelectSearch(val,'C014')}
                                                    displayName={["catCode","catName"]}
                                                    keyName={"catCode"}
                                                />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem
                                            label="发票类型"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('invoiceTypeCode', {
                                                //rules: [{ required: true, message: 'Please select your gender!' }],
                                                initialValue: bpDetail.invoiceTypeCode||"",
                                                onChange: this.handleSelectChange,
                                                rules: [
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: subjectData.C021,
                                                        keyName: "catCode",
                                                    }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    width={210}
                                                    selectedList={subjectData.C021}
                                                    onSelect={this.props.handleChange}
                                                    onSearch={(val)=>this.subjectSelectSearch(val,'C021')}
                                                    displayName={["catCode","catName"]}
                                                    keyName={"catCode"}
                                                />

                                                )}
                                        </FormItem>
                                        <FormItem
                                            label="收款条件"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('payeeCode', {
                                                initialValue: bpDetail.payeeCode||"",
                                                rules: [
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: subjectData.C013,
                                                        keyName: "catCode",
                                                    }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    width={210}
                                                    selectedList={subjectData.C013}
                                                    onSelect={this.props.handleChange}
                                                    onSearch={(val)=>this.subjectSelectSearch(val,'C013')}
                                                    displayName={["catCode","catName"]}
                                                    keyName={"catCode"}
                                                />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem
                                            label="付款方"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('paymentOrgCode', {
                                                initialValue: bpDetail.paymentOrgCode||(bpDetail.scmBp.bpFull||""),
                                                rules: [
                                                    this.props.title=='编辑客户'?
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: businessPartner,
                                                        keyName: "bpCode",
                                                    }:{}
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    width={210}
                                                    selectedList={businessPartner}
                                                    onSelect={this.props.handleChange}
                                                    onSearch={this.receiveOrgSelectSearch}
                                                    displayName={["bpCode","bpFull"]}
                                                    keyName={"bpCode"}
                                                    disabled={this.disabled}
                                                />
                                                )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <div className="more-remark">
                                    <a  href="#" onClick={() => {
                                        this.setState({ show: !this.state.show })
                                    }}>{this.state.show ? '收起更多隐藏信息' : '展开更多隐藏信息'}
                                    </a>
                                </div>
                            </div>
                           <div style={{ display: this.state.show ? `block` : `none`,border:'1px solid #e2e2e2',borderTop:0 }}>
                                <Row style={{padding:'24px 0 0 16px'}}>
                                    <Col span={8} style={{fontSize:'14px',fontWeight:'bold',color:"#4a4a4a"}}>公司</Col>
                                    <Col span={8} ></Col>
                                    <Col span={8} style={{fontSize:'14px',fontWeight:'bold',color:"#4a4a4a",textIndent:30}}>组织</Col>
                                </Row>
                                <Row style={{margin:'0 16px 18px'}}>
                                    <Col span={8}>
                                        <FormItem
                                            label="法人代表"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('corporation', {
                                                initialValue: bpDetail.scmBp.corporation,
                                                    rules: [
                                                    { max:100,message: '长度不能超过100' }
                                                ],
                                                onChange: this.handleSelectChange,
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                        <FormItem
                                            label="创立日期"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('creationDate', {
                                                initialValue: bpDetail.scmBp.creationDate?moment(bpDetail.scmBp.creationDate,'YYYY-MM-DD'):null,
                                            })(
                                                <DatePicker style={{ width: '100%' }}/>
                                                )}
                                        </FormItem>
                                        <FormItem
                                            label="行业"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('tradeTypeCode', {
                                                initialValue: bpDetail.scmBp.tradeTypeCode||"",
                                                rules: [
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: subjectData.C015,
                                                        keyName: "catCode",
                                                    }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    width={210}
                                                    selectedList={subjectData.C015}
                                                    onSelect={this.props.handleChange}
                                                    onSearch={(val)=>this.subjectSelectSearch(val,'C015')}
                                                    displayName={["catCode","catName"]}
                                                    keyName={"catCode"}
                                                />
                                                )}
                                        </FormItem>
                                        <FormItem
                                            label="经营类型"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('businessTypeCode', {
                                                initialValue: bpDetail.scmBp.businessTypeCode||"",
                                                rules: [
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: subjectData.C019,
                                                        keyName: "catCode",
                                                    }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    width={210}
                                                    selectedList={subjectData.C019}
                                                    onSelect={this.props.handleChange}
                                                    onSearch={(val)=>this.subjectSelectSearch(val,'C019')}
                                                    displayName={["catCode","catName"]}
                                                    keyName={"catCode"}
                                                />
                                                )}
                                        </FormItem>
                                        <FormItem
                                            label="公司性质"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('companyTypeCode', {
                                                initialValue: bpDetail.scmBp.companyTypeCode||"",
                                                rules: [
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: subjectData.C018,
                                                        keyName: "catCode",
                                                    }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    width={210}
                                                    selectedList={subjectData.C018}
                                                    onSelect={this.props.handleChange}
                                                    onSearch={(val)=>this.subjectSelectSearch(val,'C018')}
                                                    displayName={["catCode","catName"]}
                                                    keyName={"catCode"}
                                                />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem
                                            label="公司规模"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('companyScaleCode', {
                                                initialValue: bpDetail.scmBp.companyScaleCode||"",
                                                rules: [
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: subjectData.C016,
                                                        keyName: "catCode",
                                                    }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    width={210}
                                                    selectedList={subjectData.C016}
                                                    onSelect={this.props.handleChange}
                                                    onSearch={(val)=>this.subjectSelectSearch(val,'C016')}
                                                    displayName={["catCode","catName"]}
                                                    keyName={"catCode"}
                                                />
                                                )}
                                        </FormItem>
                                        <FormItem
                                            label="公司网址"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('website', {
                                                initialValue: bpDetail.scmBp.website,
                                                rules: [
                                                    { type:'url',message:'请输入 正确的网址'},
                                                    { max:50,message: '长度不能超过50' }
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                        <FormItem
                                            label="公司邮箱"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('email', {
                                                initialValue: bpDetail.scmBp.email,
                                                rules: [
                                                    { type:'email',message:'请输入 正确的邮箱' },
                                                    { max:50,message: '长度不能超过50' }
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                        <FormItem
                                            label="公司电话"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('tel', {
                                                initialValue: bpDetail.scmBp.tel,
                                                rules: [
                                                    { max:20,message: '长度不能超过20' }
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                        <FormItem
                                            label="公司传真"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('fax', {
                                                initialValue: bpDetail.scmBp.fax,
                                                rules: [
                                                    { max:50,message: '长度不能超过50' }
                                                ],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem
                                            label="所属组织机构"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('deptCode', {
                                                initialValue: this.props.type=="edit"?bpDetail.deptCode?bpDetail.deptCode:"":defaultDeptCode?defaultDeptCode:"",
                                                onChange: this.handleSelectChange,
                                                rules: [
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: dept_Name,
                                                        keyName: "orgCode",
                                                    }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    width={210}
                                                    selectedList={dept_Name}
                                                    displayName={["orgCode","orgName"]}
                                                    keyName='orgCode'
                                                    onSelect={this.selectChange}
                                                    onSearch={this.DeptSelectSearch}
                                                    
                                                />
                                                )}
                                        </FormItem>
                                        <FormItem
                                            label="负责人"
                                            {...formItemLayout}
                                        >
                                            {this.getFD('empCode', {
                                                initialValue: this.props.type=="edit"?bpDetail.empCode?bpDetail.empCode:"":empCode?empCode:"",
                                                rules: [
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: empList,
                                                        keyName: "empCode",
                                                    }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    width={210}
                                                    selectedList={empList}
                                                    onSelect={this.props.handleChange}
                                                    onSearch={this.EmployeesSelectSearch}
                                                    displayName={["empCode","empName"]}
                                                    keyName={"empCode"}
                                                />
                                                )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </div>
                </Spin>
            </div>
        )
    }
}
AddCustomerComp.defaultProps = {
    EditData: {
         customerCode : "",
         customerFull : "",
         customerAbt : "",
         customerDesc : "",
         deptCode : "",
         empCode : "",
         currencyCode : "",
         settlementCode : "",
         invoiceTypeCode : "",
         payeeCode : "",
         paymentOrgCode : "",
         scmBp : {
             uscc : "",
             bpFull : "",
             bpAbt : "",
             businessTypeCode : "",
             corporation : "",
             creationDate : "",
             tradeTypeCode : "",
             companyTypeCode : "",
             companyScaleCode : "",
             website : "",
             email : "",
             tel : "",
             fax : "",
             langCode : "" 
        }
    },
    selectedList: [
        {
            id: 1,
            name: "AAAA",
        },
        {
            id: 2,
            name: "BBBB",
        },
        {
            id: 3,
            name: "CCCC",
        },
        {
            id: 4,
            name: "DDDD",
        },
    ]
}
AddCustomerComp.propTypes = {
    Record: PropTypes.object,
    selectedList: PropTypes.array,
}

export default Form.create()(AddCustomerComp);