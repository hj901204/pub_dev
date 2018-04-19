import React,{Component} from "react";
import {Icon,Menu,Button,Table,Tooltip,Modal} from '../../base/components/AntdComp';
import {Link} from "react-router";
import MTable from '../../base/components/TableComp';


let data = function(text,record,index){
    if(text.message==""){
        return text.value;
    }else{
        return (
            <Tooltip placement="top" title={text.message}>
                <span className="error-message">{text.value}</span>
            </Tooltip>
        )
    }
  }

const columns = [{
    title: '序号',
    render:(t,r,index)=>{
        return index+1;
    },
    }, {
    title: '姓名',
    dataIndex: 'empName',
    key:1,
    render:data,
    }, {
    title: '手机',
    dataIndex: 'phone',
    render:data,
    },{
    title: '部门',
    dataIndex: 'dept',
    render:data,
    }, {
    title: '职位',
    dataIndex: 'position',
    render:data,
    }, {
    title: '邮箱',
    dataIndex: 'email',
    render:data,
    },{
    title: '办公地点',
    dataIndex: 'office',
    render:data,
    }, {
    title: '工号',
    dataIndex: 'empNo',
    render:data,
    }];

class ImportEmployeeComp extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        const {dataSource,paging,tabLoading,tablePaging,message,againImportViewVisiable,...props} = this.props;
        return (
            <div className='import-employ'>
                <div className="impt-title">
                    <Button className="repaly-submit" type="primary" onClick={againImportViewVisiable}>重新提交</Button>
                    <p className="repaly-text">(共有数据<span>{this.props.paging.total}</span>行，存在<span>{message}</span>个错误，请修复所有错误后重新上传)</p>
                </div>
                <div className="manage-body">
                    <MTable
                        dataSource={dataSource}
                        paging={paging} //{total,page,pageSize}
                        loading={tabLoading}
                        cols={columns}
                        rowKey={"empCode"}
                        pageOnChange={tablePaging}
                    />
                </div>
            </div>
        )
    }
}
export default ImportEmployeeComp