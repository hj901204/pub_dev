import React, { Component } from "react";
import { Row,Modal, Col, Spin, Table, Input, Icon, Button, Tabs, Popconfirm, Checkbox, Radio ,message} from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
const CheckboxGroup = Checkbox.Group;
const { TabPane } = Tabs;

// import React,{Component} from "react";
// import { Modal, message, Tabs, Button,Table, Icon,Checkbox,Popconfirm,Radio ,Row,Col,Input,Select,Form,Spin,InputNumber } from '../../../base/components/AntdComp';
// import { connect } from 'react-redux';
// import update from 'react/lib/update';
// import MaterialAct from '../../actions/MaterialModule/MaterialAct';
// import MTable from '../../../base/components/TableComp';
// import ModalComp from '../../../base/components/ModalComp';
// import FormComp from '../../../base/components/FormComp';
// const { TabPane } = Tabs;
// const FormItem = Form.Item;
// const Option = Select.Option;
// const CheckboxGroup = Checkbox.Group;


class MaterialBaseComp extends Component{
     constructor(props, context) {
        super(props, context);
        this.state = {
            visible: false,
        }   
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.materialCode.materialCode != this.props.materialCode.materialCode) {
            this.setState({
                visible: false
            });
        }
    }
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
    editMaterial=(materialCode)=>{
        let type=["length","weight","area","volume","all"],
            str=["1","2","3","4",""]
         str.map((item,index)=>{
            this.props.getCurrencyList({
                "dimensionality":item,
                "page": "1",
                "pageSize": "10"
            },type[index]);
        })
        this.props.EditModul();
        this.props.getEditData(materialCode);
   }
    MaterialIsDisable=(materialCode,status)=>{
        this.props.MaterialIsDisable(materialCode,status)
            .then(json=>{
                if(json.status==2000){
                    if(status==1){
                       message.success('物料启用成功!');
                    }else{
                       message.success('物料禁用成功!');
                    }
                    this.props.getEditData(materialCode,'detail');
                }
            })
    }
  
   render(){
     const{hiddenVisible,supplierBaseLoading,materialBaseSource,...props}=this.props;
      let rightStyle={
          textAlign: 'right',
      };
      let companyDetails={
          width:'93%',
      };
       const formItemLayout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 6 
            }
        };
       return(

            <div className="Material-BaseInfo">
                <Spin spinning={supplierBaseLoading}>

                   <div className="Material-Title">   
                     <div className="Material-BigTitle">
                        <h2>信息总览：{materialBaseSource.materialCode}|{materialBaseSource.materialName}</h2>
                        <div className="Material-SmallTitle">
                            状态：{window.ENUM.getEnum("materialStatusData",materialBaseSource.status?materialBaseSource.status+"":"0")} &nbsp; 
                            物料属性：{window.ENUM.getEnum("materialPro",materialBaseSource.materialPlanList?materialBaseSource.materialPlanList[0].materialProperty+"":"0")}&nbsp;
                            存货类别：{window.ENUM.getEnum("materialInventoryType",materialBaseSource.materialInventoryList?materialBaseSource.materialInventoryList[0].type+"":"0")}
                        </div>
                        <div className="viewbtn">
                            <Button type='primary' onClick={()=>this.editMaterial(materialBaseSource.materialCode)}>编辑</Button>
                            <Button type='primary' onClick={()=>this.MaterialIsDisable(materialBaseSource.materialCode,materialBaseSource.status==1||0?2:1)}>{materialBaseSource.status==0?'启用':materialBaseSource.status==1?'禁用':'启用'}</Button>
                        </div>
                     </div>
                   </div>

                   <div className="Material-conventionalBase">
                        <Row>
                           <Col span={24} style={{ marginLeft:'20px',  marginBottom:'20px',fontSize: '14px', fontWeight: 'bold',marginTop:'30px' }} >基本信息</Col>
                        </Row>
                        <Row>
                            <Col span={2} offset={2} className="conventional-right">物料编码：</Col>
                            <Col span={2}>{materialBaseSource.materialCode}</Col>
                            <Col span={2} offset={2} className="conventional-right">简码：</Col>
                            <Col span={2}>{materialBaseSource.simpleCode}</Col>
                            <Col span={2} offset={2} className="conventional-right">型号：</Col>
                            <Col span={2}>{materialBaseSource.model}</Col>
                        </Row>
                        <Row>
                            <Col span={2} offset={2} className="conventional-right">物料名称：</Col>
                            <Col span={2}>{materialBaseSource.materialName}</Col>
                            <Col span={2} offset={2} className="conventional-right">规格：</Col>
                            <Col span={2}>{materialBaseSource.materialSpec}</Col>
                            <Col span={2} offset={2} className="conventional-right">描述：</Col>
                            <Col span={5}>{materialBaseSource.materialDesc}</Col>
                        </Row>      
                        <Row>
                            <Col span={2} offset={2} className="conventional-right">基本单位：</Col>
                            <Col span={2}>{materialBaseSource.measureUnitName}</Col>
                            <Col span={2} offset={2} className="conventional-right">物料类型：</Col>
                            <Col span={2}>{window.ENUM.getEnum("materialType",materialBaseSource.type?materialBaseSource.type+"":"0")}</Col>
                        </Row>
                         <a onClick={()=>this.showModal()} className="click-button">{this.state.visible?'点击隐藏补充信息':'点击显示补充信息'}{this.state.visible?<Icon type="up"/>:<Icon type="down"/>}</a>
                        {
                            this.state.visible?<div>
                            <Row>
                                <Col span={24} style={{ marginLeft:'20px',  marginBottom:'20px',fontSize: '14px', fontWeight: 'bold',marginTop:'30px' }} >重量</Col>
                            </Row>
                            <Row>
                                <Col span={2} offset={2} className="conventional-right">毛重：</Col>
                                <Col span={2}>{materialBaseSource.roughWeight}</Col>
                                 <Col span={2} offset={2} className="conventional-right">净重：</Col>
                                <Col span={2}>{materialBaseSource.netWeight}</Col> 
                                <Col span={2} offset={2} className="conventional-right">重量单位：</Col>
                                <Col span={2}>{materialBaseSource.weightUnitName}</Col> 
                            </Row>
                            <Row>
                               <Col span={24} style={{ marginLeft:'20px',  marginBottom:'20px',fontSize: '14px', fontWeight: 'bold',marginTop:'30px' }} >尺寸</Col>
                            </Row>
                            <Row>
                                <Col span={2} offset={2} className="conventional-right">长*宽*高：</Col>
                                <Col span={2}>{materialBaseSource.sizeLength}*{materialBaseSource.sizeWidth}*{materialBaseSource.sizeHeight}</Col>
                                <Col span={2} offset={2} className="conventional-right">尺寸单位：</Col>
                                <Col span={2}>{materialBaseSource.sizeUnitName}</Col>
                                 <Col span={2} offset={2} className="conventional-right">体积：</Col>
                                <Col span={2}>{materialBaseSource.sizeVolume}</Col>
                            </Row>
                            <Row>
                                <Col span={2} offset={2} className="conventional-right">体积单位：</Col>
                                <Col span={2}>{materialBaseSource.volumeUnitName}</Col>
                            </Row>
                        </div>:null
                        }
                  </div>

              </Spin>          
            </div>
                         
       )
   }
}
export default MaterialBaseComp;