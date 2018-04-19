import React, { Component } from 'react'
import {Button, Pagination, Input, Popconfirm } from '../../base/components/AntdComp'
import MTable from '../../base/components/TableComp';
import * as MemberEditDialogActions from "../actions/MemberEditDialogActions";
import * as MemberRecoverDialogActions from "../actions/MemberRecoverDialogActions";
import DeactivedMemberAct from '../actions/DeactivedMemberAct';
import MemberRecoverCont from "../dialogconts/MemberRecoverCont";
import {store} from "../data/StoreConfig";
const columns = [{
        title: 'empCode',
        dataIndex: 'empCode',
        key: 'empCode',
        hidden: true,
    }, {
        title: '姓名',
        dataIndex: 'empName',
        key: 'empName',
    }, {
        title: '手机',
        dataIndex: 'phone',
        key: 'phone',
    }, {
        title: '组织',
        dataIndex: 'deptName',
        key: 'deptName',
    },{
        title: '职位',
        dataIndex: 'positionName',
        key: 'positionName',
    },{
        title: '停用时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
    },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
    }
];

class DeActivedMember extends Component {
    constructor(props, context) {
        super(props, context);
        columns[columns.length - 1].render = (txt, record, index) => (
            <div>
                <Popconfirm 
                    placement = "topRight"
                    title = "在职员工中已存在该手机号，无法复职"
                    okText = "知道了"
                    visible = { this.state.visible === index } 
                    onConfirm = {this.confirm}
                >
                    <a href="#"  onClick={()=>this.onRecover(index,record)} >恢复</a>
                </Popconfirm>
            </div>
        )

        this.state = {
            searchVal: '',
            record: {},
            searchPm: {
                positionName:'',
                positionCode: '',
                page: 1,
                pageSize: 10
            },
            visible: "",
        }
    }
    
    componentWillMount() {
       this.props.getDeactivedList();
    }

    confirm = () => {
         this.setState({visible: ""})
    }

    onRecover = (index,record) => {
        // int,1-可恢复/2-不可恢复"
        record.operation == 2 ? this.setState({visible: index})  : store.dispatch(MemberRecoverDialogActions.show(record.empCode));; 
    }

    handlerSubmitCallBack = (e) => {
        store.dispatch(DeactivedMemberAct.getDeactivedList({ employeeName: '', phone: '',page: 1, pageSize: 10}));
    }

    render(){            
        let { state, tablePaging, ...props } = this.props;
        let { searchVal, record} = this.state;
        let pagination = {   
            showSizeChanger: true,
            current: state.paging.page,
            pageSize: state.paging.pageSize,
            total: state.paging.total
        }
        return (
            <div>
                <MemberRecoverCont  submitCallBack={this.handlerSubmitCallBack}/>
                <MTable 
                    cols={columns}  
                    dataSource={state.outInfoData} 
                    rowKey = {"empCode"}   
                    paging = {pagination}
                    pageOnChange={tablePaging}
                    loading = {state.tableLoading}
                    {...props} 
                />
            </div>
        );

    }
}

export default DeActivedMember

