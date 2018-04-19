import React, { Component } from "react";
import { Button, Popconfirm, message, Radio, Select, Form } from '../../../base/components/AntdComp';
import EditableTableComp from '../../../base/components/EditableTableComp';

class TableComp extends EditableTableComp {
    constructor(props, context) {
        super(props, context);
        this.recordKey = 'line';
        this.columns = [{
            title: '行号',
            dataIndex: 'line',
            key: 'line',
            render: (text, record, index) => <div style={{textAlign:'center'}}>{text}</div>,
            className:"ProRet_title",
            width:62
        }, {
            title: '物料编码',
            dataIndex: 'materialCode',
            width:206
        }, {
            title: '物料名称',
            dataIndex: 'materialName',
            render: (text, record, index) => <div style={{width:86,overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis', }}>{text}</div>,
        }, {
            title: '物料规格',
            dataIndex: 'materialSpec',
            render: (text, record, index) => <div style={{width:86,overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis', }}>{text}</div>,
        }, {
            title: '可申退数量',
            dataIndex: 'mayReturnNumber',
        }, {
            title: '计量单位',
            dataIndex: 'measureUnitName',
        }, {
            title: '申退数量',
            dataIndex: 'returnNumber',
            obj:{
                rules:[
                    {type:'gtEqZero',label:'申退数量'}
                ],
            }
        }, {
            title: '备注',
            dataIndex: 'remarks',
            obj:{
                rules:[{
                    max:200,message:'备注不能超过200字符！',
                }]
            },
            render: (text, record, index) => <div style={{width:134,overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis', }}>{text}</div>,
        }, {
            title: '操作',
            dataIndex: 'operation',
            width:62,
            className:'ProRet_title',
            render: (text, record, index) => {
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
                                    <span title="编辑" className="operator-color operator" href="javascript:;" onClick={() => this.editHandler(record)}>
                                        <i className="c2mfont c2m-bianji"></i>
                                    </span>
                                   
                        }
                    </div>
                );
            },
        }];
        this.columns.forEach((item) => {
            //input
            if (/^returnNumber$/i.test(item.dataIndex)) {
                item.render = this.inputColRender(item.dataIndex, item.obj);
            }
            if (/^remarks$/i.test(item.dataIndex)) {
                item.render = this.inputColRender(item.dataIndex, item.obj);
            }

        })
    }
    getNewRow = () => {
        let line = -1;
        if (this.data[0] && this.data[0].line < 0) {
            line = this.data[0].line - 1;
        };
        return {
            "line": line,
            "materialCode": "",
            "materialName": "",
            "materialSpec": "",
            "mayReturnNumber": 0.00,
            "measureUnitName": "",
            "returnNumber": 0.00,
            "remarks": "",
        }
    }
    handleChange = (key, index, value) => {
        // if (key === 'returnNumber') {
        //     if (Number(this.record.returnNumber) > Number(this.record.mayReturnNumber)) {
        //         this.record.returnNumber = this.record.mayReturnNumber;
        //         message.warning('申退数量不可以大于可申退数量！');
        //     }else{
        //         this.record.returnNumber = Number(this.record.returnNumber).toFixed(2);
        //     }
        // }
    }
    handleSave = (record, index) => { 
        if(/^\.\d+$/.test(this.record.returnNumber)){
            this.record.returnNumber='0'+this.record.returnNumber;
        }
    }
}

let MTable = Form.create()(TableComp);

class AddProRetTableComp extends Component {
    constructor(props, context) {
        super(props, context);
        const value = props.value || [];
        this.state = {
            list: value,
        }
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps && nextProps.value !== this.state.list) {
            const list = nextProps.value.map(item=>{
                item.returnNumber=Number(item.returnNumber).toFixed(2);
                item.mayReturnNumber=Number(item.mayReturnNumber).toFixed(2);
                return item;
            });
            this.setState({ list });
        }
    }
    handleSubmit = (data, index) => {
        const onChange = this.props.onChange;
        // data[index].returnNumber = Number(data[index].returnNumber);
        // data[index].mayReturnNumber = Number(data[index].mayReturnNumber);
        if (onChange) {
            onChange(data);
        }
    }
    handleSave = (record, index) => {
        console.log(record);
     }

    // handleSubmit = (data, index) => {
    //     data[index].returnNumber = Number(data[index].returnNumber);
    //     data[index].mayReturnNumber = Number(data[index].mayReturnNumber);
    //     if (Number(data[index].returnNumber) > Number(data[index].mayReturnNumber)) {
    //         message.warning('申退数量不能大于可申退数量！');
    //     } else {
    //         this.props.updateReturnDataSource(data);
    //     }

    // }

    render() {
        let { list } = this.state;
        let dataSource = list || [];
        let { paging, onChange, ...props } = this.props;
        // const { ...props } = this.props.add;
        // let { returnTabLoading, AddReturnDataSource, EditReturnDataSource } = this.props;
        return (
            <div>
                <MTable
                    {...props}
                    //dataSource={this.props.type == 'add' ? AddReturnDataSource : EditReturnDataSource}
                    dataSource={dataSource}
                    //loading={returnTabLoading}
                    handleSubmit={this.handleSubmit}
                    recordKey={"key"}
                    addBtn=""
                />
            </div>
        );
    }
}
export default AddProRetTableComp;




