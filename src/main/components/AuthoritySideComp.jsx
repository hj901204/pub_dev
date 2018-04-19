import React from 'react';
import {Tabs , Popconfirm , Form , Input , Tree , Button , Icon} from "../../base/components/AntdComp";
import {Spin} from '../../base/components/AntdComp.js'
import MTable from "../../base/components/TableComp";

const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;

class AuthoritySideComp extends React.Component{
    constructor(props){
        super(props);
        this.columns = [{
            title:"姓名",
            key:"empName",
            dataIndex:"empName",
        },{
            title:"组织",
            key:"deptName",
            dataIndex:"deptName"
        },{
            title:"职位",
            key:"positionName",
            dataIndex:"positionName"
        }];
    }
    loopModule = (treeData)=>{
        let treeNodes = treeData.map((node)=>{
            if(node.menuList && node.menuList.length > 0){
                return (<TreeNode title={node.moduleName} key={node.moduleCode}>
                    {this.loopTree(node.menuList)}
                </TreeNode>);
            }else{
                return (<TreeNode title={node.moduleName} key={node.moduleCode} isLeaf={true} />);
            }
        });
        return treeNodes;
    }
    loopTree = (treeData)=>{
        let treeNodes = treeData.map((node)=>{
            if(node.menuList && node.menuList.length > 0){
                return (<TreeNode title={node.resourceName} key={node.resourceCode}>
                    {this.loopTree(node.menuList)}
                </TreeNode>);
            }else{
                return (<TreeNode title={node.resourceName} key={node.resourceCode} isLeaf={true} />);
            }
        });
        return treeNodes;
    }
    updataAuthority = (e)=>{
        e.preventDefault();
        this.props.form.validateFields((err,data)=>{
            if(!err){
                this.props.updataAuthority(data);
            }
        });
    }
    render(){
        let {getFieldDecorator} = this.props.form;
        let formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        }
        return (
            <Spin spinning={this.props.side_loading}>
                <div className="authority-sidebar">
                    <div className="top-handle-bar">
                        <div className="authority-name">{this.props.authDetail.roleName}</div>
                        <div onClick={this.props.closeSidebar} className="hide-btn"><Icon type="close" /></div>
                        <div className="del-role">
                            <Popconfirm title="您确定要删除这个角色吗？" onConfirm={()=>this.props.deleteAuthority()}>
                                <Button type="primary">删除该角色</Button>
                            </Popconfirm>
                        </div>
                    </div>
                    <Tabs>
                        <TabPane tab="授权人" key="1">
                            <div className="authority-menber">
                                <div className="menber-handle">
                                    <div className={this.props.operable ? "operable-show" : "operable-hide"} >
                                        <div className="operable-box">
                                            <Button type="primary" onClick={this.props.deleteMenbers}>取消授权</Button>
                                        </div>
                                        <div className="menber-search">
                                            <Input.Search
                                                placeholder="输入姓名搜索"
                                                onSearch={(val)=>this.props.refreshMenber(val)}
                                            />
                                        </div>
                                    </div>
                                    <div className="menber-add">
                                        <Button type="primary" onClick={this.props.showSelDialog}>添加权限人</Button>
                                    </div>
                                </div>
                                <div>
                                    <MTable
                                        rowSelection={this.props.rowSelection}
                                        selRows={this.props.selRows}
                                        dataSource={this.props.menData}
                                        cols={this.columns}
                                        rowKey="empCode"
                                        paging={this.props.paging}
                                        pageOnChange={this.props.refreshMenber}
                                        loading={this.props.loading}
                                    />
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="授权内容" key="2">
                            <div className="authority-detail">
                                <Form className="detail-form">
                                    <Form.Item
                                        {...formItemLayout}
                                        label="角色名称"
                                    >
                                        {
                                            getFieldDecorator("roleName",{
                                                initialValue:this.props.authDetail.roleName
                                            })(
                                                <Input/>
                                            )
                                        }
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout}
                                        label="描述"
                                    >
                                        {
                                            getFieldDecorator("description",{
                                                initialValue:this.props.authDetail.description
                                            })(
                                                <Input/>
                                            )
                                        }
                                    </Form.Item>
                                </Form>
                                <Button type="primary" className="detail-save" onClick={this.updataAuthority}>保存</Button>
                                <hr />
                                <Tree
                                    className="menber-tree"
                                    checkable
                                    defaultCheckedKeys={this.props.authDetail.resources}
                                    onCheck={this.props.onTreeCheck}
                                    defaultExpandedKeys={[this.props.authTreeData[0].moduleCode+""]}
                                >
                                    {

                                        this.loopModule(this.props.authTreeData)
                                    }
                                </Tree>

                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </Spin>
        );
    }
}
export default Form.create()(AuthoritySideComp);