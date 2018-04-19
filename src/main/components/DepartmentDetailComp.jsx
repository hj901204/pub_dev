import React from 'react';
import { Form, Icon, Button, Modal, Layout, Row, Col, Popconfirm } from '../../base/components/AntdComp'

class DepartmentDetailComp extends React.Component{
    constructor(props,context){
        super(props,context);
        this.pids=[];
        this.p=[];
        this.addDetail="";
    }

    // componentWillMount(){
    //     this.props.getdetail();
        
    // }

    onEditDepartment=()=>{
        this.props.onEditDepartment(this.props.detail.id);
    }

    onSetup=(deptCode,status)=>{
        this.props.onsetup(deptCode,status).then(json=>{
            if (json.status === 2000) {
                this.props.getdetail(this.props.detail.id);
                this.props.tablePaging();
                // console.log('修改职务成功!');
            } else {
                this.props.sideLoading(false);
                this.props.SidebarVisiable(false);
            };
        });
    }

    SidebarVisiable=(tag)=>{
        this.props.SidebarVisiable(tag)
    }

    pDisable=()=>{
        this.pids=[],this.p=[];
        let {detail,dataSource}=this.props;
        let loop=(data)=>data.map((item) => {
            if(detail.id==item.id){
                this.p=item.deptPids.split(",");
            }
            if (item.children) loop(item.children);
            return item;
        });
        let find=(data)=>data.map((item) => {
            if(this.p.indexOf(item.deptCode)>-1&&item.status=='2'){
                this.pids.push(item.deptCode);
            }
            if (item.children) find(item.children);
            return item;
        });
        loop(dataSource);
        if(this.p.length>0){
            find(dataSource);
        }
    }

    // getAddDetail=(addrCode)=>{
    //     this.props.getAddDetail({"addressCode":addrCode}).then(json=>{
    //         this.addDetail=json.data.list[0]?json.data.list[0].addressDetl:"";
    //     });
    // }

    render(){
        let {detail,dataSource,detailAddressName}=this.props;
        this.pDisable();
        //this.getAddDetail(detail.addrCode);
        // let loop = (data,status) => data.map((item) => {
        //     if(detail.id==item.id){
        //         let pids=Array.of(item.deptPids);
        //         if(pids){}
        //         item.pstatus= status;
        //     }
        //     if (item.children) loop(item.children,item.status);
        //     return item;
        // });
        // console.log('dataSource',loop(dataSource));
        //let newDetail=loop(detail);
        //console.log('pstatus',loop(detail));
        return(
            <div className="deptSidebar" >
                        <div className="sidebox" >
                            <div className="sidetitle" >
                                <Row className="sidebutton" >
                                    <Col span={24} >
                                        {detail.status=='2'?null:<Button type="primary" onClick={()=>{this.onEditDepartment()}} >编辑</Button>}
                                        <Popconfirm title={
                                                <div>
                                                    <h5>确认要{detail.status=='2'?'启用':'停用'}该组织吗?</h5>
                                                    {
                                                        this.pids.length>0?
                                                        <p>若上级组织目前处于停用状态，<br/>将一同被启用</p>
                                                        :null
                                                    }
                                                </div>
                                            } 
                                            onConfirm={()=>{this.onSetup(detail.deptCode, detail.status=='1'?2:1)}}
                                            okText="确定"
                                            cancelText="取消"
                                            >
                                            <Button type="primary">{detail.status=='2'?'启用':'停用'}</Button>
                                        </Popconfirm>
                                        <div className="xicon" onClick={()=>{this.SidebarVisiable(false)}} >X</div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="side-Center">
                            <Row>
                                <Col>{detail.deptName}({detail.deptNo})</Col>
                            </Row>
                            <Row>
                                <Col>{detail.deptLevel===undefined?'':window.ENUM.getEnum("level", detail.deptLevel+'')} | {detail.deptNum} | {detail.deptMgrName}</Col>
                            </Row>
                            <div className="side-Center-box">
                                <Row>
                                    <Col span={5}>是否为库存组织：</Col>
                                    <Col span={3}>{detail.isOpt===undefined?'':window.ENUM.getEnum("deptBool", detail.isOpt+'')}</Col>
                                    <Col span={5}>是否为采购组织：</Col>
                                    <Col span={3}>{detail.isPurchase===undefined?'':window.ENUM.getEnum("deptBool", detail.isPurchase+'')}</Col>
                                </Row>
                                <Row>
                                    <Col span={5}>是否为销售组织：</Col>
                                    <Col span={3}>{detail.isSell===undefined?'':window.ENUM.getEnum("deptBool", detail.isSell+'')}</Col>
                                    <Col span={5}>是否为财务组织：</Col>
                                    <Col span={3}>{detail.isFinance===undefined?'':window.ENUM.getEnum("deptBool", detail.isFinance+'')}</Col>
                                </Row>
                                <Row>
                                    <Col span={5}>是否为生产组织：</Col>
                                    <Col span={3}>{detail.isSell===undefined?'':window.ENUM.getEnum("deptBool", detail.isProduct+'')}</Col>
                                </Row>
                            </div>
                        </div>
                        <div className="side-Line" >
                        </div>
                        <div className="side-Bottom" >
                            <Row>
                                <Col span={4} className="side-Bottom-name">上级组织：</Col>
                                <Col span={18}>{detail.pDeptName}</Col>
                            </Row>
                            <Row>
                                <Col span={4} className="side-Bottom-name">组织简称：</Col>
                                <Col span={18}>{detail.deptAlias}</Col>
                            </Row>
                            <Row>
                                <Col span={4} className="side-Bottom-name">组织全称：</Col>
                                <Col span={18}>{detail.deptAll}</Col>
                            </Row>
                            <Row>
                                <Col span={4} className="side-Bottom-name">英文名称：</Col>
                                <Col span={18}>{detail.deptEng}</Col>
                            </Row>
                            <Row>
                                <Col span={4} className="side-Bottom-name">联系电话：</Col>
                                <Col span={18}>{detail.deptPhone}</Col>
                            </Row>
                            <Row>
                                <Col span={4} className="side-Bottom-name">地址：</Col>
                                <Col span={18}>{detailAddressName}</Col>
                            </Row>
                        </div>
                    </div>
        )
    }

}

export default DepartmentDetailComp