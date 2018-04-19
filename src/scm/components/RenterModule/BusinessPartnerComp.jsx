import React, { Component } from "react";
import { Row, Col, Spin, Table, Input, Icon, Button, Tabs, Popconfirm, Checkbox, Radio } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
import { formatNullStr } from '../../../base/consts/Utils';
import TooltipComp from '../../../base/components/TooltipComp';
const CheckboxGroup = Checkbox.Group;
const { TabPane } = Tabs;
class BussinessPartnerComp extends Component{
    constructor(props, context) {
        super(props, context);
    this.columns1 = [{
        title: '行号',
        dataIndex: 'rowKey',
        key: 'rowKey',
        width: 105,
        className: "firstColCenter",
    },{
      title: '联系人编码',
      dataIndex: 'contactsCode',
      key:'contactsCode',
      hidden: true,
    },{
      title: '默认',
      dataIndex: 'contactsDefault',
      key:'contactsDefault',
      width: 200,
      className: "textAlignCenter",
      render: (txt, record, index) => {
            return <div style={{ textAlign: 'center' }}><Checkbox checked={txt ? true : false} disabled={true}></Checkbox></div>
        }
    }, {
      title: '状态',
      dataIndex: 'status',
      key:'status',
      render: (txt, record, index) => {
             return window.ENUM.getEnum("status",txt+'')},
    }, {
      title: '姓名',
      dataIndex: 'contactsName',
      key: 'contactsName',
    }, {
        title: '性别',
        dataIndex: 'sexCode',
        key: 'sexCode',
        width: 100,
        render: (txt, record, index) => {
            if (txt != "") {
                return window.ENUM.getEnum("sex", txt + '')
            }
        },
    },{
      title: '职务',
      dataIndex: 'post',
      key: 'post',
    },{
      title: '移动电话',
      dataIndex: 'phone',
      key: 'phone',
    },{
      title: '邮箱',
      dataIndex: 'email',
      key:'email',
    }];

    this.columns2 = [{
        title: '行号',
        dataIndex: 'rowKey',
        key: 'rowKey',
        width: 105,
        className: "firstColCenter",
    },{
      title: '地址编码',
      dataIndex: 'addressCode',
      key:'addressCode',
      hidden: true,
    },{
      title: '默认收货地址',
      dataIndex: 'repDefault',
      key:'repDefault',
      width: 160,
      className: "textAlignCenter",
      render: (txt, record, index) => {
            return <div style={{ textAlign: 'center' }}><Checkbox checked={txt ? true : false} disabled={true}></Checkbox></div>
        }
    }, {
      title: '默认发货地址',
      dataIndex: 'sogDefault',
      key: 'sogDefault',
      className: "textAlignCenter",
      width: 160,
      render: (txt, record, index) => {
            return <div style={{ textAlign: 'center' }}><Checkbox checked={txt ? true : false} disabled={true}></Checkbox></div>
        }
    }, {
      title: '默认发票地址',
      dataIndex: 'bilDefault',
      key: 'bilDefault',
      className: "textAlignCenter",
      width: 160,
      render: (txt, record, index) => {
            return <div style={{ textAlign: 'center' }}><Checkbox checked={txt ? true : false} disabled={true}></Checkbox></div>
        }
    }, {
      title: '状态',
      dataIndex: 'status',
      key:'status',
      width: '10%',
       render: (txt, record, index) => {
             return window.ENUM.getEnum("status",txt+'')},
    }, {
      title: '地址类型',
      dataIndex: 'addressType',
      key:'addressType',
      render:(txt,record,index)=>{
         let addressType=[];
         if(record.isRep)
            addressType.push(0)
         if(record.isSog)
            addressType.push(1)
         if(record.isBil)
            addressType.push(2)
        return addressType.map(item=>window.ENUM.getEnum("supplierAddress",item+'')).join(',')
      },
    }, {
      title: '地址信息',
      dataIndex: 'addressInfo',
      key:'addressInfo',
      render:(txt,record,index)=>{
          return <TooltipComp attr={{ text: `${record.provinceName}${record.cityName}${record.countyName}${record.addressDetl}`, wid:150,placement:'top' }} />
      }
    }];
  }
   componentDidMount(){
        this.props.contactTablePaging(1);
        this.props.addressTablePaging(1);
    }
    render(){
        const{businessBase,dataContactSource,dataAddressSource,contactTablePaging,addressTablePaging,contactTabLoading,businessPartnerTabLoading,addressTabLoading,...props}=this.props;
        const columnsContact = this.columns1;
        const columnsAddress=this.columns2;
        const plainOptions = [
            { label: '供应商', value: 'isSupplier' },
            { label: '客户', value: 'isCustomer' },
            { label: '银行', value: 'isBank' },
        ];
        let RoleName=[];
        let RoleNameEn=[];
        if(businessBase.isSupplier){
            RoleName.push('供应商');
            RoleNameEn.push('isSupplier');
        }
        if(businessBase.isCustomer){
            RoleName.push('客户');
            RoleNameEn.push('isCustomer');
        }
        if(businessBase.isBank){
            RoleName.push('银行');
            RoleNameEn.push('isBank');
        }
        return(
            <div className="Bussiness-PartnerComp">
                <Spin spinning={businessPartnerTabLoading}>
                    <div className="Business-Title" style={{marginTop:'12px'}}>  
                        <div className="Bussiness-BigTitle">
                                <h2>商业伙伴详情：{businessBase.bpCode} | {businessBase.bpFull}</h2>
                        </div>
                        <div className="Bussiness-SmallTitle">
                            <p>角色：{RoleName.join('、')}<span style={{padding:'0 20px'}}>经营类型：{formatNullStr(businessBase.businessTypeName)}</span>网址：<a href={businessBase.website} target="blank">{formatNullStr(businessBase.website)}</a></p>
                            <p>电话：{formatNullStr(businessBase.tel)}<span style={{padding:'0 20px'}}>邮箱：<a href={'mailto:' + businessBase.email}>{formatNullStr(businessBase.email)}</a></span></p>
                        </div>
                    </div>
                    <div className="Bussiness-conventional">
                        <div className="business-conventionalBase">
                            <Row>
                                <Col span={12} >
                                    <ul style={{borderRight:'2px solid #e2e2e2'}}>
                                        <li className="conventional-right">常规</li>
                                        <li><b>商业伙伴编码：</b>{businessBase.bpCode}</li>
                                        <li><b>统一社会信用代码：</b>{businessBase.uscc}</li>
                                        <li><b>商业伙伴全称：</b>{businessBase.bpFull}</li>
                                        <li><b>商业伙伴简称：</b>{formatNullStr(businessBase.bpAbt)}</li>
                                        <li><b style={{float:'left'}}>商业伙伴角色：</b><CheckboxGroup options={plainOptions} value={RoleNameEn}  disabled/></li>
                                        <li><b>主语言：</b>{window.ENUM.getEnum("language",businessBase.langCode||'ZH')}</li>
                                    </ul>
                                </Col>
                                <Col span={12} >
                                    <ul >
                                        <li className="conventional-right">公司</li>
                                        <li><b>法人代表：</b>{formatNullStr(businessBase.corporation)}</li>
                                        <li><b>创立日期：</b>{formatNullStr(businessBase.creationDate)}</li>
                                        <li><b>行业：</b>{formatNullStr(businessBase.tradeTypeName)}</li>
                                        <li><b>公司性质：</b>{formatNullStr(businessBase.companyTypeName)}</li>
                                        <li><b>公司规模：</b>{formatNullStr(businessBase.companyScaleName)}</li>
                                        <li><b>公司传真：</b>{formatNullStr(businessBase.companyScaleName)}</li>
                                    </ul>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Spin>
                <div>
                    <Tabs className="business-table">
                        <TabPane tab="联系人" key="1">
                            <MTable 
                                    {...props}
                                    loading={contactTabLoading}
                                    cols={columnsContact} 
                                    dataSource={dataContactSource}
                                    pageOnChange={contactTablePaging}
                                    rowKey={"rowKey"}
                                    paging={this.props.contactPaging}
                                    />
                        </TabPane>
                        <TabPane tab="地址" key="2">
                            <MTable
                                    {...props}
                                    loading={addressTabLoading}
                                    dataSource={dataAddressSource} 
                                    cols={columnsAddress}
                                    pageOnChange={addressTablePaging}
                                    rowKey={"rowKey"}
                                    paging={this.props.addressPaging}
                                    />
                            </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}
export default BussinessPartnerComp;