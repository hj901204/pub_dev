import React, { Component, PropTypes } from "react";
import MemberManageAct from '../actions/MemberManageAct'
import Sidebar from '../../base/components/SidebarWrapComp';
import MTable from '../../base/components/TableComp';
import { Button, Spin, Pagination, Input, Popconfirm } from '../../base/components/AntdComp'

import * as MemberEditDialogActions from "../actions/MemberEditDialogActions";
import MemberEditDialogCont from "../dialogconts/MemberEditDialogCont";
import { store } from "../data/StoreConfig";
class MemberInfoComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            searchVal: '',
            side_visible: false,
            record: {},
            selectedRowKeys: [],
        }
        this.columns = [{
            title: 'empCode',
            dataIndex: 'empCode',
            key: 'empCode',
            hidden: true,
        }, {
            title: '姓名',
            dataIndex: 'empName',
            key: 'empName',
            render: (txt, record, index) => <a onClick={() => this.onOpenSidebar(record)} className='column-1'>{record.empName}</a>
        }, {
            title: '手机',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '组织',
            dataIndex: 'deptName',
            key: 'deptName',
        }, {
            title: '职位',
            dataIndex: 'positionName',
            key: 'positionName',
        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: '办公地址',
            dataIndex: 'addressName',
            key: 'addressName',
        }];
    }

    onOpenSidebar = (record) => {
        this.props.getDetailsInfo(record.empCode);
        this.props.onOpenSidebar(true);
    }

    onCloseSidebar = () => {
        this.props.onOpenSidebar(false);
    }

    onHeaderChange = (val) => {
        this.props.headerChange(val.length);
        this.props.checkedList(val);
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys });
        let memberCode = [];
        selectedRows.map((val, index) => {
            return memberCode.push(val.empCode);
        })
        this.onHeaderChange(memberCode);
    }
    handleEditMemberClick = (e) => {
        let id = this.props.state.infoDetials.empCode;
        store.dispatch(MemberEditDialogActions.show(id));
    }
    handleSubmitCallBack = (e) => {
        let { state } = this.props;
        store.dispatch(MemberManageAct.getDetailsInfo(state.infoDetials.empCode));
        store.dispatch(MemberManageAct.getMemberInfoList({ deptCode: state.departinfo.key, employeeName: '', phone: '', page: 1, pageSize: 10 }));
    }
    render() {
        let { state, side_visible, tablePaging, ...props } = this.props;
        let { searchVal, record, selectedRowKeys } = this.state;
        let dept = state.infoDetials.dept || "",
            maritalStatus = state.infoDetials.maritalStatus || "",
            office = state.infoDetials.officeAddress || "",
            position = state.infoDetials.position || "",
            identityType = state.infoDetials.identityType || "";
        let rowSelection = {
            onChange: this.onSelectChange,
        }
        let pagination = {
            showSizeChanger: true,
            current: state.paging.page,
            pageSize: state.paging.pageSize,
            total: state.paging.total
        }
        let columns = this.columns;
        return (
            <div>
                <div>
                    <MemberEditDialogCont submitCallBack={(e)=>this.handleSubmitCallBack(e)} />
                    <MTable
                        rowSelection={rowSelection}
                        selRows={this.state.selectedRowKeys}
                        cols={columns}
                        paging={pagination}
                        dataSource={state.dataSource}
                        pageOnChange={tablePaging}
                        loading={state.tableLoading}
                        rowKey={"empCode"}
                        {...props}
                    />
                </div>
                <Sidebar maskClosable={true} side_visible={side_visible} onClose={this.onCloseSidebar} >
                    <Spin spinning={state.side_Loading}>
                        <div className='empDetailSidebar'>
                            <div className='menu-wrap-header'>
                                <Button type='default' onClick={this.handleEditMemberClick}>编辑</Button>
                                <Button type='default'>打印</Button>
                                <Popconfirm placement="bottomRight" title={
                                    <div>
                                        <h5>确认要停用该员工吗？</h5>
                                        <p>停用后，员工将不能再登入该企业</p>
                                    </div>
                                } onConfirm={() => this.props.stopAccount({ empCodes: [state.infoDetials.empCode] })}>
                                    <Button type="default">停用</Button>
                                </Popconfirm>
                                <div className="closeSidebar" onClick={this.onCloseSidebar}>X</div>
                            </div>
                            <div className="menu-wrap-header-border"></div>
                            <div className='menu-wrap-body'>
                                <div className='empTitleImg'>
                                    <img src={state.infoDetials.profilePhoto} alt={state.infoDetials.empName} title={state.infoDetials.empName} />
                                    <p>{state.infoDetials.empName}</p>
                                </div>
                                <p className="infoTitle"><span></span>基础信息</p>
                                <p className='line'></p>
                                <div className='infoLists'>
                                    <p><span>组织：</span>  {typeof dept[0] == 'undefined' ? '' : dept[0].deptValue}  </p>
                                    <p><span>职位：</span>  {typeof position[0] == 'undefined' ? '' : position[0].positionValue}</p>
                                    <p><span>手机：</span>  {state.infoDetials.phone || ''}  </p>
                                    <p><span>固定电话：</span>  {state.infoDetials.telNo || ''}  </p>
                                    <p><span>邮箱：</span>  {state.infoDetials.email || ''}  </p>
                                    <p title={(typeof office[0] == 'undefined') ? '' : office[0].addressValue} style={{ cursor: 'pointer' }}><span>办公地址：</span>{
                                        (typeof office[0] == 'undefined') ? '' : office[0].addressValue
                                    }</p>
                                </div>
                                <p className="infoTitle"><span></span>详细信息</p>
                                <p className='line'></p>
                                <div className='infoLists'>
                                    <p><span>入职时间：</span>  {state.infoDetials.entryDate || ''}  </p>
                                    <p><span>婚姻状态：</span>  {(typeof maritalStatus[0] == 'undefined') ? '' : maritalStatus[0].maritalStatusValue}  </p>
                                    <p><span>证件类型：</span>  {(typeof identityType[0] == 'undefined') ? '' : identityType[0].identityValue}  </p>
                                    <p><span>证件号码：</span>  {state.infoDetials.identityNo || ''}  </p>
                                    <p><span>家庭住址：</span>  {state.infoDetials.homeAddr || ''}  </p>
                                </div>
                            </div>
                        </div>
                    </Spin>
                </Sidebar>

            </div>
        );

    }
}

MemberInfoComp.defaultProps = {
    searchPm: {
        deptCode: "",
        employeeName: "",
        phone: "",
        page: 1,
        pageSize: 10
    }
}
MemberInfoComp.propTypes = {
    searchPm: PropTypes.object,
}

export default MemberInfoComp