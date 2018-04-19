import React, { Component } from "react";
import {  Button, Popconfirm, message, Select, Input } from '../../base/components/AntdComp';
import MTable from '../../base/components/TableComp';
import { shouldComponentUpdate } from '../../base/consts/Utils';
import SearchComp from '../../base/components/SearchComp';
import TXT from '../languages';

const T = TXT.POSITION;
const Option = Select.Option;
const Search = Input.Search;

const columns = [
{
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    hidden: true, 
}, {
    title: '编码',
    dataIndex: 'siteCode',
    key: 'siteCode',
}, {
    title: '名称',
    dataIndex: 'siteName',
    key: 'siteName',
}, {
    title: '经营组织',
    dataIndex: 'orgCode',
    key: 'orgCode',
}, {
    title: '仓储管理',
    dataIndex: 'isSog',
    key: 'isSog',
    render: (txt, record, index) => {
        return window.ENUM.getEnum("bool",txt+'')},
}, {
    title: '生产制造',
    dataIndex: 'isPrd',
    key: 'isPrd',
    render: (txt, record, index) => {
        return window.ENUM.getEnum("bool",txt+'')},
}, {
    title: '服务网点',
    dataIndex: 'isDot',
    key: 'isDot',
    render: (txt, record, index) => {
        return window.ENUM.getEnum("bool",txt+'')},
}, {
    title: '详细地址',
    dataIndex: 'addressDetl',
    key: 'addressDetl',
    render: (txt, record, index) => {
        return `${record.countryName}${record.provinceName}${record.cityName}${record.countyName}${record.addressDetl}`
    }
}, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (txt, record, index) => {
        return window.ENUM.getEnum("dataStatus",txt+'')},
}, {
    title: '更新人',
    dataIndex: 'updateByName',
    key: 'updateByName',
}, {
    title: '更新时间',
    dataIndex: 'updateDate',
    key: 'updateDate',
    render: (txt, record, index) => {
        return txt && txt.split(' ')[0];
    }
}, 
{    
    dataIndex: 'handle',
    title: '操作',
}];

class SiteComp extends Component {
    constructor(props, context) {
        super(props, context);

        columns[columns.length - 1].render = (txt, record, index) =>
            <div>
                {
                    record.status !== 2 ? <a href="#" onClick={() => this.onEditSite(record.siteCode)}>编辑 </a> : null
                }
                {
                    record.status == 0 ? 
                     <Popconfirm title={
                        <div>
                            <h5>确定要删除该站点吗</h5>
                            <p>删除后，该站点信息将被清除。</p>
                        </div>
                    } onConfirm={() => this.onDelete(record.siteCode)}>
                        <a href="#">删除</a>
                        </Popconfirm> 
                    :null    
                }               
              
                {
                    record.status==1?
                    <Popconfirm title={
                        <div>
                            <h5>确定要停用该站点吗</h5>
                        </div>
                        } onConfirm={() => this.onDisable(record.siteCode,2)}>
                        <a href="#">停用</a>    
                    </Popconfirm>
                        :
                        <Popconfirm title={
                        <div>
                            <h5>确定要启用该站点吗</h5>
                        </div>
                        } onConfirm={() => this.onDisable(record.siteCode,1)}>
                        <a href="#">启用</a>    
                    </Popconfirm>
                }
            </div>
    }

    onDisable = (siteCode, status) => {
        let {onClear, SiteDisable} = this.props;
        SiteDisable(siteCode, status).then(json => {
            if (json.status === 2000) {
                onClear();
            }
        })
    }

    onEditSite = (id) => {
        const { siteId, EditSiteVisiable} = this.props;
        if (id != siteId) {
            EditSiteVisiable(id);
        }
    }
    onDelete = (id) => {
        let { onClear, SiteDel } = this.props;
        SiteDel(id).then(json => {
            if (json.status === 2000) {
                onClear();
            } else if (json.status === 4355) {
                    // message.warn(T.DELFAIL);
                }
            }
        );
    }    

    render() {
        let { AddSiteVisiable, onSearch, SearchVal, status, tabLoading, tablePaging, onSelect, onChange,...props } = this.props;
        status = status + '';
        return (
            <div>
                <div className="site-head">
                    <Select defaultValue='1' value={status} style={{ width: 160 }} onSelect={onSelect}>
                    {
                        window.ENUM.getEnum("dataStatus").map(item => {
                             return <Option value={item.catCode} key={item.catCode}>{item.catName}</Option>
                         })
                    }    
                    </Select>
                    {/*<SearchComp SearchVal={SearchVal} onSearch={onSearch}
                        placeholder='输入名称/编码搜索' />*/}
                    <Search
                        style={{ width:200 }}
                        placeholder= '输入名称/编码搜索 '
                        value={ SearchVal }
                        onChange={ onChange }
                        onSearch={ onSearch }
                    />
                    <div className="site-btns">
                        <Button type="default" onClick={AddSiteVisiable} className="create-site-btn">新建</Button>
                        <Button type="default">导出</Button>
                    </div>
                </div>
                <div className="site-body">
                    <MTable
                        {...props}
                        loading={tabLoading}
                        cols={columns}
                        rowKey={"id"}
                        pageOnChange={tablePaging}
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.tablePaging(1);
    }
}

export default SiteComp;
