import React, { Component,PropTypes } from "react";
import { Form, Input, Button, Checkbox, message } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
import { shouldComponentUpdate } from '../../../base/consts/Utils';

const columns = [
    {
        title: 'addressCode',
        dataIndex: 'addressCode',
        key: 'addressCode',
        hidden: true,
    },{
        title: '行号',
        dataIndex: 'rowKey',
        key: 'rowKey',
        width: 70,
        // render:  (txt, record, index)=>{ 
        //     return index+1;
        // }
    }, {
        title: '地址类型',
        dataIndex: 'addressType',
        key: 'addressType',
        width: 216,
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
        render: (txt, record, index) => {
            return `${record.addressName}，${record.provinceName}${record.cityName}${record.countyName}${record.addressDetl}`;
         }
            
    }]; 

    class ChooseAddressComp extends Component {
        constructor(props, context) {
            super(props, context);
            this.state = {
                selectedRowKeys: [],
                selectedRows: [],
            };
        }

        onSelectChange = (selectedRowKeys,selectedRows) => {
            const deletekey = ['cityName','countryName','countyName','provinceName','status','isVisible','isReg','isOfe','isMag'];
            selectedRows.map(item => {
                item.bpCode = this.props.bpCode;
                for (var key of deletekey) {
                    delete item[key];
                }
            })
            this.setState({ selectedRowKeys, selectedRows });
        }
        handleSave = () => {
            if (!this.props.loading) {
                let data = {};
                data.list = this.state.selectedRows;
                if (data.list.length) {
                     this.props.handleSave && this.props.handleSave(data);
                } else {
                    message.warn('请勾选想要新建的地址');
                }
            }
        }
        
        render() {
            let {  refAddressLoading, refAddressDataSource } = this.props;
            let data = [];
            if (refAddressDataSource.size != 0) { 
                data = refAddressDataSource;
            }
            const { selectedRowKeys } = this.state;
            const rowSelection = {
                onChange: this.onSelectChange,
            };
            return (
                    <div className="chooseAddress-body">
                        <MTable
                            loading={refAddressLoading}
                            cols={columns}
                            rowKey={'addressCode'}
                            rowSelection={rowSelection}
                            selRows = {selectedRowKeys}
                            dataSource={data}
                            pagination={false}
                            scroll={{ y: 503 }}
                            />

                        <Button type="primary" style={{ backgroundColor: '#fff', color: '#6d8ec1', fontSize: '14px' }} onClick={this.props.handleCancel}>取消</Button>
                        <Button type="primary" style={{ marginRight: '20px', fontSize:'14px' }} onClick={this.handleSave}>确定</Button>
                    </div>
            )
        }

        componentDidMount() {
            this.props.tablePaging();
        }
        
    }


    export default ChooseAddressComp;
