import React from 'react'
import {Table, Button, Input, Breadcrumb, Spin} from '../../base/components/AntdComp'
import actions from '../actions/DepartmentAct'
import MTable from '../../base/components/TableComp';
import SearchComp from '../../base/components/SearchComp';
import { is } from 'immutable';
const Search = Input.Search;
const columns = [{
                title: '组织名称',
                dataIndex: 'deptName',
                key: 'deptName',
                }, {
                title: '组织编号',
                dataIndex: 'deptNo',
                key: 'deptNo',
                }, {
                title: '层级',
                dataIndex: 'deptLevel',
                key: 'deptLevel',
                width: '10%',
                render: (txt)=>txt==3?"公司":window.ENUM.getEnum("level", txt+'')
                }, {
                title: '人数',
                dataIndex: 'deptNum',
                key: 'deptNum',
                }, {
                title: '负责人',
                dataIndex: 'deptMgrName',
                key: 'deptMgrName',
                }, {
                title: '是否为运营组织',
                dataIndex: 'isOpt',
                key: 'isOpt',
                render: (txt)=>txt==-1?"-":window.ENUM.getEnum("deptBool", txt+'')
                }, {
                title: '是否为采购组织',
                dataIndex: 'isPurchase',
                key: 'isPurchase',
                render: (txt)=>txt==-1?"-":window.ENUM.getEnum("deptBool", txt+'')
                }, {
                title: '是否为销售组织',
                dataIndex: 'isSell',
                key: 'isSell',
                render: (txt)=>txt==-1?"-":window.ENUM.getEnum("deptBool", txt+'')
                }, {
                title: '是否为财务组织',
                dataIndex: 'isFinance',
                key: 'isFinance',
                render: (txt)=>txt==-1?"-":window.ENUM.getEnum("deptBool", txt+'')
                }, {
                title: '是否为生产组织',
                dataIndex: 'isProduct',
                key: 'isProduct',
                render: (txt)=>txt==-1?"-":window.ENUM.getEnum("deptBool", txt+'')
                }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (txt)=>txt==-1?"-":window.ENUM.getEnum("status", txt+'')
                }];
class Department extends React.Component{
    constructor(props,context){
        super(props,context);
        columns[0].render= (text,record) =>{
            if(record.status!=-1){
                return <a href="#" onClick={() => this.onOpenSidebar(record.id)} >{text}</a>
            }else{
                return <span>{text}</span>
            }
        } 
        // this.defaultRowKey=new Set(props.defaultRowKey);
        // this.state={
        //     dataSource :props.dataSource,
        //     defaultRowKey:props.defaultRowKey
        // };
        // this.flaglist=[];
    }
    
    componentDidMount(){
        this.props.initlist();
    }

    loop=(dataSource)=>dataSource.map((item,index)=>{
        if(item.children&&item.children.length<1){
            delete item.children;
        }
        if (item.children) this.loop(item.children);
    })

    // componentWillReceiveProps(nextProps) {
    //     let defaultRowKey=new Set(nextProps.defaultRowKey);
    //     let flaglist=[];
    //     let loop = data => data.map((item) => {
    //         console.log('flaglist1',flaglist);
    //         if(item.flag==1){
    //             item.deptPids.split(',').forEach(id=>{
    //                 defaultRowKey.add(id);
    //             })
    //             flaglist.push(item.id);
    //         }
    //         if (item.children) loop(item.children);
    //         return item;
    //     });
    //     let loop2 = data => data.map((item,index) => {
    //         console.log('loop2',data);
    //         if(defaultRowKey.has(item.id) || item.flag==1){
    //             if (item.children) loop2(item.children);
    //         }
    //         else{
    //             console.log('flaglist2',flaglist);
    //             let arr =item.deptPids?item.deptPids.split(','):[];
    //             arr = arr.filter((id) => flaglist.includes(id) );
    //             if(arr.length<1){
    //                 console.log('delete',defaultRowKey);
    //                 data.splice(index,1)
    //             }
    //         }
    //         return item;
    //     });
    //     if(nextProps.SearchVal){
    //         this.setState({
    //             dataSource:loop2(loop(nextProps.dataSource)),
    //             defaultRowKey:[...defaultRowKey]
    //         });
    //         // Promise.all([loop(dataSource)]).then(()=>{loop2(dataSource)});
    //     }
        
    // }

    // loop = data => data.map((item) => {
    //     console.log('flaglist1',this.flaglist);
    //     if(item.flag==1){
    //         item.deptPids.split(',').forEach(id=>{
    //             this.defaultRowKey.add(id);
    //         })
    //         this.flaglist.push(item.id);
    //     }
    //     if (item.children) this.loop(item.children);
    //     return item;
    // });
    
    // //del
    // loop2 = data => data.map((item,index) => {
    //     console.log('loop2',data);
    //     if(this.defaultRowKey.has(item.id) || item.flag==1){
    //         if (item.children) this.loop2(item.children);
    //     }
    //     else{
    //         console.log('flaglist2',this.flaglist);
    //         let arr =item.deptPids?item.deptPids.split(','):[];
    //         arr = arr.filter((id) => this.flaglist.includes(id) );
    //         if(arr.length<1){
    //             console.log('delete',this.defaultRowKey);
    //             data.splice(index,1)
    //         }
    //     }
    //     return item;
    // });
    onOpenSidebar=(id)=>{
        this.props.onOpenSidebar({"id":id});
    }

    render(){
        let {side_visible,visible,onSearch,SearchVal,tabLoading,OpenModal,dataSource,defaultRowKey, tag, ...props}=this.props;
        this.loop(dataSource);
        // let defaultRowKey= dataSource[0]?dataSource[0].id:null;
        return(
            <div>
                <div className="manage-head">
                    <SearchComp
                        placeholder="输入部门名称／编号搜索"
                        style={{ width: 200 }}
                        onSearch={onSearch}
                        SearchVal={SearchVal}
                    />
                    <Button type="primary" onClick={OpenModal}>新增部门</Button>
                </div>
                <div className="manage-body" style={{textAlign:"center"}}>
                    <Spin spinning={tabLoading}>
                        {dataSource && dataSource.length 
                            ? <MTable
                                {...props}
                                dataSource={dataSource}
                                loading={tabLoading}
                                pagination={false}
                                cols={columns}
                                rowKey={"id"}
                                defaultExpandedRowKeys={defaultRowKey}
                            /> 
                            : null }
                    </Spin>
                </div>
            </div>
        )
    }
}

export default Department