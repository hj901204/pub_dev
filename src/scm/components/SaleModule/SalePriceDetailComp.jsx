import React, { Component } from "react";
import { Form,Row,Modal, Col, Spin, Table, Input, Icon, Button, Tabs, Popconfirm, Checkbox, Radio } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { TabPane } = Tabs;
class SalePriceDetailComp extends Component{
     constructor(props, context) {
        super(props, context);
        this.state = {visible: false}
        this.columns = [
            {
                title: '行号',
                dataIndex: 'lineNumber',
                key: 'lineNumber',
            },
            {
                title: '物料编码',
                dataIndex: 'materialCode ',
                key: 'materialCode ',
            },
            {
                title: '物料名称',
                dataIndex: 'materialName',
                key: 'materialName',
            },{
                title: '数量',
                dataIndex: 'materialQty',
                key: 'materialQty',
            },{
                title: '单位',
                dataIndex: 'materialUnit ',
                key: 'materialUnit ',
            }, {
                title: '规格',
                dataIndex: 'materialSpec',
                key: 'materialSpec',
            }, {
                title: '型号',
                dataIndex: 'model',
                key: 'model',
            }, {
                title: '税率',
                dataIndex: 'taxRate',
                key: 'taxRate',
            }, {
                title: '批量价格含税',
                dataIndex: 'totalAmount',
                key: 'totalAmount',
            },{    
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
                
            }];
    }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.priceCode.materialCode != this.props.priceCode.materialCode) {
    //         this.setState({
    //             visible: false
    //         });
    //     }
    // }
    showModal = () => {
        this.setState({
        visible: !this.state.visible,
        });
    }
    hidden_visible=(value)=>{
        this.props.hidden_visible(!value);
    }
    handleOk = () => {
        this.setState({ visible: false });
     }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    editMaterial=(orderCode)=>{
        // let type=["length","weight","area","volume","all"],
        //     str=["1","2","3","4",""]
        //  str.map((item,index)=>{
        //     this.props.getCurrencyList({
        //         "dimensionality":item,
        //         "page": "1",
        //         "pageSize": "10"
        //     },type[index]);
        // })
        this.props.EditModul();
        this.props.getEditData(orderCode);
   }
   SalePriceRepeal=(orderCode,orderStatus)=>{
        this.props.SalePriceRepeal(orderCode,orderStatus)
            .then(json=>{
                if(json.status==2000){
                    console.log('状态修改成功！');
                    this.props.getEditData(orderCode);
                }
            })
    } 
    SalePriceSubmit=(orderCode,orderStatus)=>{
        this.props.SalePriceSubmit(orderCode,orderStatus)
            .then(json=>{
                if(json.status==2000){
                    console.log('状态修改成功！');
                    this.props.getEditData(orderCode);
                }
            })
    }   
    
   render(){
     const{hiddenVisible,supplierBaseLoading,materialBaseSource,...props}=this.props;
     let columns = this.columns;
      let rightStyle={
          textAlign: 'right',
      };
      let companyDetails={
          width:'93%',
      };
       return(

            <div className="Material-BaseInfo">
                <Spin spinning={supplierBaseLoading}> 
                   <div className="Material-Title">   
                     <div className="Material-BigTitle">
                        <h2>价格编码：{materialBaseSource.orderCode} &nbsp;&nbsp;&nbsp;&nbsp;价格名称:{materialBaseSource.priceName}</h2>
                        <div className="Material-SmallTitle">
                            单据状态：{window.ENUM.getEnum("orderStatusType",materialBaseSource.orderStatus?materialBaseSource.orderStatus+"":"0")} &nbsp; 
                        </div>
                        <div className="viewbtn">
                            <Button type='primary' onClick={()=>this.editMaterial(materialBaseSource.orderCode)}>编辑</Button>
                            <Button type='primary' onClick={()=>this.SalePriceSubmit(materialBaseSource.orderCode,materialBaseSource.orderStatus)}>提交</Button>
                            <Button type='primary' onClick={()=>this.SalePriceRepeal(materialBaseSource.orderCode,materialBaseSource.orderStatus)}>撤回</Button>
                        </div>
                     </div>
                   </div>
                   <div className="Material-conventionalBase">
                        <Row>
                            <Col span={1} className="conventional-right"><b>&nbsp;基本信息</b></Col>
                        </Row>
                        <Row>
                            <Col span={2} offset={2} className="conventional-right">价格名称：</Col>
                            <Col span={2}>{materialBaseSource.priceName}</Col>
                            <Col span={2} offset={2} className="conventional-right">币种：</Col>
                            <Col span={2}>{materialBaseSource.currencyName}</Col>
                        </Row>
                        <Row>
                            <Col span={2} offset={2} className="conventional-right">价格生效日期：</Col>
                            <Col span={2}>{materialBaseSource.startTime}</Col>
                            <Col span={2} offset={2} className="conventional-right">含税：</Col>
                            <Col span={2}>{materialBaseSource.isTax}</Col>
                        </Row>      
                        <Row>
                            <Col span={2} offset={2} className="conventional-right">价格失效日期：</Col>
                            <Col span={2}>{materialBaseSource.endTime}</Col>
                            <Col span={2} offset={2} className="conventional-right">备注：</Col>
                            <Col span={2}>{materialBaseSource.remark}</Col>
                        </Row>
                  </div>
                  <div>
                      <MTable
                        cols={columns}
                        dataSource={materialBaseSource.list}
                        rowKey={"lineNumber"}
                      />
                    </div>
                    </Spin> 
            </div>
                         
       )
   }
}
export default SalePriceDetailComp;