import React, { Component } from "react";
import { Button, Popconfirm, message, Select, Radio } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
import OperationsComp from '../../../base/components/OperationsComp';
import { shouldComponentUpdate } from '../../../base/consts/Utils';

class SupplierAddressComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.columns = [
            {
                title: 'addressCode',
                dataIndex: 'addressCode',
                key: 'addressCode',
                hidden: true,
            }, {
                title: '行号',
                dataIndex: 'rowKey',
                key: 'rowKey',
                // render:  (txt, record, index)=>{ 
                //     return index+1;
                // }
            }, {
                title: '默认收货地址',
                dataIndex: 'repDefault',
                key: 'repDefault',
                render: (txt, record, index) => {
                    return <Radio checked={txt ? true : false} disabled={true}></Radio>
                }
            }, {
                title: '默认发货地址',
                dataIndex: 'sogDefault',
                key: 'sogDefault',
                render: (txt, record, index) => {
                    return <Radio checked={txt ? true : false} disabled={true}></Radio>
                }
            }, {
                title: '默认开票地址',
                dataIndex: 'bilDefault',
                key: 'bilDefault',
                render: (txt, record, index) => {
                    return <Radio checked={txt ? true : false} disabled={true}></Radio>
                }
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (txt, record, index) => {
                    return window.ENUM.getEnum("dataStatus", txt + '')
                },
            }, {
                title: '地址类型',
                dataIndex: 'addressType',
                key: 'addressType',
                render: (txt, record, index) => {
                    let addressType = [];
                    if (record.isRep)
                        addressType.push(0)
                    if (record.isSog)
                        addressType.push(1)
                    if (record.isBil)
                        addressType.push(2)
                    return addressType.map(item => window.ENUM.getEnum("supplierAddress", item + '')).join('，')
                },

            }, {
                title: '地址信息',
                dataIndex: 'addressInfo',
                key: 'addressInfo',
                width: '30%',
                render: (txt, record, index) => {
                    return `${record.provinceName}${record.cityName}${record.countyName}${record.addressDetl}`;
                }

            }, {
                dataIndex: 'operation',
                title: '操作',
            }];
        this.columns[this.columns.length - 1].render = (txt, record, index) =>
            {
                let opts = [
                    {
                        title: '编辑',
                        titleText: [],
                        icon: '',
                        fun: () => props.EditAddressVisiable(record.addressCode, record.langCode),
                        show: true,
                    },
                    record.status == 1 ? {
                        title: "禁用",
                        titleText: ['确定要禁用该地址吗？'],
                        icon: '',
                        show: true,
                        fun: () => this.onDisable(record.addressCode, record.bpCode, record.langCode, record.status),
                    } : {
                            title: "启用",
                            titleText: ['确定要启用该地址吗？'],
                            icon: '',
                            show: true,
                            fun: () => this.onDisable(record.addressCode, record.bpCode, record.langCode, record.status),    
                    },
                ];
                return <OperationsComp operations={opts} />;
            };    
            // <div>
            //     <a href="#" onClick={() => props.EditAddressVisiable(record.addressCode, record.langCode)}>编辑 </a>

            //     {
            //         record.status == 1 ?
            //             <Popconfirm title={
            //                 <div>
            //                     <h5>确定要禁用该地址吗</h5>
            //                 </div>
            //             } onConfirm={() => this.onDisable(record.addressCode, record.bpCode, record.langCode, record.status)}>
            //                 <a href="#">禁用</a>
            //             </Popconfirm>
            //             :
            //             <Popconfirm title={
            //                 <div>
            //                     <h5>确定要启用该地址吗</h5>
            //                 </div>
            //             } onConfirm={() => this.onDisable(record.addressCode, record.bpCode, record.langCode, record.status)}>
            //                 <a href="#">启用</a>
            //             </Popconfirm>
            //     }
            // </div>
    }

    onDisable = (addressCode, bpCode, langCode, status) => {
        let { onClear, AddressDisable } = this.props;
        if (status == 2 || status == 0) {
            status = 1
        } else {
            status = 2
        }
        AddressDisable(addressCode, bpCode, langCode, status).then(json => {
            if (json.status === 2000) {
                onClear();
            }
        })
    }

    //表格头
    title = () => {
        let { addBtn } = this.props;
        return addBtn ?
            <div style={{ textAlign: 'right' }}>
                <a href='#' onClick={this.props.AddAddressVisiable}><i className='c2mfont c2m-tianjia' style={{ paddingRight: '5px' }} />{addBtn}</a>
            </div>
            :
            null;
    }

    render() {
        let { AddAddressVisiable, addressTabLoading, tablePaging, addressDataSource, ...props } = this.props;
        let data = [];
        if (addressDataSource.size != 0) {
            data = addressDataSource;
        }
        return (
            <div>
                {/*<div className="supplierAddress-head">
                    
                </div>*/}
                {/*<Button type="default" className="ant-btn ant-btn-primary" onClick={AddAddressVisiable}>新建地址</Button>*/}
                <div className="supplierAddress-body">
                    <MTable
                        {...props}
                        dataSource={data}
                        loading={addressTabLoading}
                        cols={this.columns}
                        rowKey={'addressCode'}
                        pageOnChange={tablePaging}
                        title={this.title}
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.tablePaging(1);
    }
}

SupplierAddressComp.defaultProps = {
    addBtn: '添加行'
}

export default SupplierAddressComp;
