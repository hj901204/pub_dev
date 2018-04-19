import React, { Component } from "react";
import { Button, Popconfirm, message, Radio, Select, Form } from '../../../base/components/AntdComp';
import EditableTableComp from '../../../base/components/EditableTableComp';

class TableComp extends EditableTableComp {
    constructor(props, context) {
        super(props, context);
        this.recordKey = 'rowKey';
        this.columns = [{
            title: '行号',
            dataIndex: 'rowKey',
            key: 'rowKey',
            render: (text, record, index) => {if(text<0){return text=""}else{return text}},
            width:80
        }, {
            title: '供应商编码',
            dataIndex: 'bpCode',
            hidden:true,
        }, {
            title: '编码',
            dataIndex: 'contactsCode',
            width:100,
            obj: {
                rules: [{
                    required:true,message:"联系人编码不能为空！"
                },{
                    max: 20, message: "最大可输入20个字符！"
                }, {
                        type:"numOrLetter"
                }]
            }
        }, {
            title: '语言编码',
            dataIndex: 'langCode',
            hidden:true,
        }, {
            title: '默认',
            dataIndex: 'contactsDefault',
            key: 'contactsDefault',
            width:110,
            obj:{
                isTrue: 1,
                isFalse: 0,
            }
        }, {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            width:88,
            render: (text, record, index) => window.ENUM.getEnum("contactStauts",text),
        }, {
            title: '姓名',
            dataIndex: 'contactsName',
            key: 'contactsName',
            obj: {
                rules: [{
                    required: true, message: "联系人姓名不能为空！"
                },{
                    max:20,message:"最大可输入20个字符！"
                }]
            }
        }, {
            title: '性别',
            dataIndex: 'sexCode',
            key: 'sexCode',
            obj:{
                list: window.ENUM.getEnum("sex"),
                keyName: 'catCode',
                labelName: 'catName'
            }
        }, {
            title: '职务',
            dataIndex: 'post',
            key: 'post',
            obj: {
                rules: [{
                    max: 20, message: "最大可输入20个字符！"
                }]
            }
        }, {
            title: '移动电话',
            dataIndex: 'phone',
            key: 'phone',
            obj: {
                rules: [{
                    max: 20, message: "最大可输入20个字符！"
                }]
            }
        }, {
            title: '邮箱',
            key: 'email',
            dataIndex: 'email',
            obj: {
                rules: [{
                    max: 20, message: "最大可输入20个字符！"
                }]
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            width:88,
            className:'handle',
            render: (text, record, index) => {
                let status = record.status == 1 ? 2 : 1;
                let statusName = window.ENUM.getEnum("handleStatus", status);
                return (
                    <div className="editable-row-operations proReturn_handle" style={{textAlign:'center'}}>
                        {
                            this.state.isEdit == record[this.recordKey] ?
                            <div>
                                <span title="确认" className="operator-color operator" href="javascript:;" onClick={() => this.saveHandler(index)}>
                                    <i className="c2mfont c2m-queren"></i>
                                </span>
                                <span title="取消" className="operator-color operator" href="javascript:;" onClick={() => this.setState({ isEdit: null })}>
                                    <i className="c2mfont c2m-quxiao1"></i>
                                </span>
                                
                            </div>
                            :
                            this.state.isEdit != null ? null :
                            <span>
                                <span title="编辑" className="operator-color operator" href="javascript:;" onClick={() => this.editHandler(record)}>
                                    <i className="c2mfont c2m-bianji"></i>
                                </span>
                                <Popconfirm placement="bottomRight"
                                    title={
                                        <div>
                                            <h5>确认要{statusName}该联系人吗？</h5>
                                        </div>
                                    }
                                    onConfirm={() => this.props.handleStatus(record, status)}
                                    okText="是" cancelText="否">
                                    <span title={statusName} className="operator-color operator" href="javascript:;">
                                       { record.status=="2"?<i className="c2mfont c2m-qiyong"></i>:<i className="c2mfont c2m-jinyong"></i>}
                                    </span>
                                    
                                </Popconfirm>
                            </span>
                    }
                    </div>
                    );
                },
        }];
        this.columns.forEach((item) => {
            //input
            if (/^contactsCode|contactsName|post|phone|email$/i.test(item.dataIndex)) {
                item.render = this.inputColRender(item.dataIndex, item.obj);
            }
            //select
            if (/^sexCode$/i.test(item.dataIndex)) {
                item.render = this.selectColRender(item.dataIndex, item.obj);
            }
            //radio
            if (/^contactsDefault$/i.test(item.dataIndex)) {
                item.render = this.radioColRender(item.dataIndex, item.obj);
            }
        })
    }
    getNewRow = () => {
        let rowKey = -1;
        if (this.data[0] && this.data[0].rowKey < 0) {
            rowKey = this.data[0].rowKey - 1;
        };
        return {
            "rowKey": rowKey,
            "bpCode": this.props.supplierId+"",
            "contactsCode": "",
            "langCode": this.props.langCode+"",
            "contactsDefault":0,
            "contactsName": "",
            "sexCode": "101",
            "post": "",
            "phone": "",
            "status": "1",
            "email": "",
        }
    } 
    handleEdit=(record)=>{
        let disableds=[];
        if(record.rowKey>0)
        {
            disableds=["contactsCode"]
        }
        this.setState({
            disableds
        })
    }
}

let MTable = Form.create()(TableComp);

class SupplierContactComp extends Component {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        this.props.tablePaging(1);
    }
    
    handleSubmit = (data,index) => {
        const { ContactAddEdit, tablePaging } = this.props;
        ContactAddEdit(data[index]).then(json => {
            tablePaging(1);
        });
    }
    handleStatus = (record, status) => {
        let { ContactStatus, tablePaging } = this.props;
        let { bpCode, contactsCode, langCode } = record;
        let pm = { bpCode, contactsCode, langCode, status };
        ContactStatus(pm).then(json => {
            if (json.status === 2000) {
                tablePaging(1);
            };
        });
    }

    render() {
        const { contactTabLoading, tablePaging, onChange,contactDataSource,contactPaging,...props } = this.props;
        return (
            <div style={{marginTop:10}}>
                <MTable
                    {...props}
                    dataSource={contactDataSource||[]}
                    loading={contactTabLoading}
                    pageOnChange={tablePaging}
                    handleSubmit={this.handleSubmit}
                    handleStatus={this.handleStatus}
                    paging={contactPaging}
                    rowKey={"key"}
                    // addBtn="添加联系人"
                />
            </div>
        );
    }
}
export default SupplierContactComp;




