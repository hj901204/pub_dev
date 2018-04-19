import React, { Component, PropTypes } from "react";
import { Button, Table, Input, Popconfirm, Radio, Select, Form, message } from './AntdComp';
import TableComp from './TableComp';
import { shouldComponentUpdate } from '../consts/Utils';
import update from 'react/lib/update';
import { InputCell, InputNumberCell, SelectCell, AutoSelectCell, RadioCell,DatePickerCell } from './EditableCell';
import TooltipComp from './TooltipComp';
import OperationsComp from './OperationsComp';
import FormComp from './FormComp';
const FormItem = Form.Item;


class EditableTableComp extends FormComp {
    constructor(props) {
        super(props);
        this.data = this.props.dataSource;
        this.columns = [];
        this.record = {};
        this.recordKey = 'id';
        this.isEdit = true;
        this.state = {
            isEdit: null,
            disableds: [],
            current: 1,
            pageSize: 10,
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource != this.data) {
            this.data = nextProps.dataSource;
        }
    }

    //根据code获取列表中对应的label
    getLabel = (list, key, keyName, labelName) => {
        let select = '';
        if (Array.isArray(list)) {
            list.forEach(item => {
                if (item[keyName] == key) {
                    select = item[labelName];
                }
            });
        }
        return select;
    }
    //输入框类型的列使用的Render
    inputColRender = (dataIndex, obj = {}) => (text, record, index) => {
        let { textStyle,rules,render, ...cellObj } = obj;
        if (this.state.isEdit == record[this.recordKey]) {
            if (this.state.disableds.includes(dataIndex)) {
                return this.record[dataIndex];
            } else {
                let { current, pageSize } = this.state;
                if (current && current != 1) {
                    index = (current - 1) * pageSize + index;
                };
                return (
                    <div>
                        <FormItem>
                            {this.getFD(dataIndex, {
                                initialValue: text,
                                rules:rules||[],
                            })(
                                <InputCell
                                    colName={dataIndex}
                                    record={this.record}
                                    obj={cellObj}
                                    handleChange={value => this.handleChange(dataIndex, index, value)}
                                />
                            )}
                        </FormItem>
                    </div>
                )
            }
        } else if (render) {
            if (render.wid) {
                return <TooltipComp attr={{ text: text, placement: 'top', ...render }} />
            }
        } else {
            return <div style={textStyle}>{text}</div>;
        }
    }
    //数值输入框类型的列使用的Render
    inputNumberColRender = (dataIndex, obj = {}) => (text, record, index) => {
        let { textStyle,rules,render, ...cellObj } = obj;
        if (this.state.isEdit == record[this.recordKey]) {
            if (this.state.disableds.includes(dataIndex)) {
                return this.record[dataIndex];
            } else {
                let { current, pageSize } = this.state;
                if (current && current != 1) {
                    index = (current - 1) * pageSize + index;
                };
                return (
                    <div>
                        <FormItem>
                            {this.getFD(dataIndex, {
                                initialValue: text,
                                rules:rules||[],
                            })(
                                <InputNumberCell
                                    colName={dataIndex}
                                    record={this.record}
                                    obj={cellObj}
                                    handleChange={value => this.handleChange(dataIndex, index, value)}
                                />
                            )}
                        </FormItem>
                    </div>
                )
            }
        } else if (render) {
            if (render.wid) {
                return <TooltipComp attr={{ text: text, placement: 'top', ...render }} />
            }
        } else {
            return <div style={textStyle}>{text}</div>;
        }
    }
    //下拉列表类型的列使用的Render
    selectColRender = (dataIndex, obj = {}) => (text, record, index) => {
        let { keyName, labelName, rules} = obj;
        let list = obj.list || this[dataIndex];
        let select = '';

        if (this.state.isEdit == record[this.recordKey]) {
            if (this.state.disableds.includes(dataIndex)) {
                return this.getLabel(list, this.record[dataIndex], keyName, labelName);
            } else {
                obj.list = list;
                let { current, pageSize } = this.state;
                if (current && current != 1) {
                    index = (current - 1) * pageSize + index;
                };
                return (
                    <div>
                        <FormItem>
                            {this.getFD(dataIndex, {
                                initialValue: text,
                                rules:rules||[],
                            })(
                                <SelectCell colName={dataIndex}
                                    record={this.record}
                                    obj={obj}
                                    handleChange={value => this.handleChange(dataIndex, index, value)}
                                />
                            )}
                        </FormItem>
                    </div>
                )
            }
        } else {
            return this.getLabel(list, text, keyName, labelName);
        }
    }
    //自动搜索列表类型的列使用的Render
    autoSelectColRender = (dataIndex, obj = {}) => (text, record, index) => {
        let { keyName, labelName, getList, rules } = obj;
        let list = obj.list || this[dataIndex];
        if (this.state.isEdit == record[this.recordKey]) {
            if (this.state.disableds.includes(dataIndex)) {
                return this.record[dataIndex];
            } else {
                let { current, pageSize } = this.state;
                if (current && current != 1) {
                    index = (current - 1) * pageSize + index;
                };
                obj.selectedList = list;
                obj.onSelect = (value) => {
                    this.handleChange(dataIndex, index, value);
                };
                obj.onSearch = (value) => {
                    // this.handleChange(dataIndex, index, value);
                    return getList(value).then(list => {
                        this[dataIndex] = list;
                        this.forceUpdate();
                    })
                };
                return (
                    <div>
                        <FormItem>
                            {this.getFD(dataIndex, {
                                initialValue: text,
                                rules: [
                                    {
                                        type: "autoselect",
                                        message: "请从下拉列表中选择一项！",
                                        list: list,
                                        keyName: keyName,
                                    },
                                    ...(rules||[])
                                ]
                            })(
                                <AutoSelectCell 
                                    colName={dataIndex} 
                                    record={this.record} 
                                    obj={obj} 
                                />
                            )}
                        </FormItem>
                    </div>
                )
            };
        } else {
            // let select = '';
            // if (Array.isArray(list)){
            //     list.forEach(item => {
            //         if (item[keyName] == text) {
            //             let select = item[labelName];
            //         }
            //     });
            // } 
            return text;
        }
    }
    //Radio类型的列使用的Render
    radioColRender = (dataIndex, obj = {}) => (text, record, index) => {
        let { isTrue, isFalse, rules } = obj;
        if (this.state.isEdit == record[this.recordKey]) {
            if (this.state.disableds.includes(dataIndex)) {
                return <Radio checked={isTrue === this.record[dataIndex] ? true : false} disabled />;
            } else {
                let { current, pageSize } = this.state;
                if (current && current != 1) {
                    index = (current - 1) * pageSize + index;
                };
                return (
                    <div>
                        <FormItem>
                            {this.getFD(dataIndex, {
                                initialValue: text,
                                rules:rules||[],
                            })(
                                <RadioCell colName={dataIndex}
                                    record={this.record}
                                    obj={obj}
                                    handleChange={value => this.handleChange(dataIndex, index, value)}
                                />
                            )}
                        </FormItem>
                    </div>
                )
            }
        } else {
            return <Radio checked={isTrue === text ? true : false} disabled />;
        }
    }
    //DatePicker日期选择框的列使用的Render
    datePickerColRender = (dataIndex, obj = {}) => (text, record, index) => {
        let { textStyle, rules, ...cellObj } = obj;
        if (this.state.isEdit == record[this.recordKey]) {
            let { current, pageSize } = this.state;
            if (current && current != 1) {
                index = (current - 1) * pageSize + index;
            };
            return (
                    <div>
                        <FormItem>
                            {this.getFD(dataIndex, {
                                initialValue: text,
                                rules:rules||[],
                            })(
                                <DatePickerCell colName={dataIndex}
                                    record={this.record}
                                    obj={cellObj}
                                    handleChange={value => this.handleChange(dataIndex, index, value)}
                                />
                            )}
                        </FormItem>
                    </div>
                )
        } else {
            return <div style={textStyle}>{text}</div>;
        }
    }
    //操作列使用的Render
    optColRender = (txt, record, index) => {
        let opts = [
            {
                title: '确定',
                fun: () => this.saveHandler(index),
                show: this.state.isEdit == record[this.recordKey],
            },
            {
                title: '取消',
                fun: () => this.cancelEdit(index),
                show: this.state.isEdit == record[this.recordKey],
            },
            {
                title: '编辑',
                fun: () => this.editHandler(record),
                show: this.state.isEdit == null,
            },
            {
                title: "删除",
                titleText: ['确认要删除该明细项吗？'],
                fun: () => this.deleteRow(index),
                show: this.state.isEdit == null,
            },
        ];
        return <OperationsComp operations={opts} />;
        // return (
        //     <div className="editable-row-operations">
        //         {
        //             this.state.isEdit == record[this.recordKey] ?
        //                 <span>
        //                     <a onClick={() => this.saveHandler(index)}>确定&nbsp;</a>
        //                     <a onClick={() => this.cancelEdit(index)}>取消</a>
        //                 </span>
        //                 :
        //                 this.state.isEdit != null ? null :
        //                     <span>
        //                         <a onClick={() => this.editHandler(record)}>编辑&nbsp;</a>
        //                         <Popconfirm placement="bottomRight"
        //                             title={
        //                                 <div>
        //                                     <h5>确认要删除该明细项吗？</h5>
        //                                 </div>
        //                             }
        //                             onConfirm={() => this.deleteRow(index)}
        //                             okText="是" cancelText="否">
        //                             <a>删除</a>
        //                         </Popconfirm>
        //                     </span>
        //         }
        //     </div>
        // );
    }

    //点击编辑
    editHandler = (record) => {
        this.record = Object.assign({}, record);
        this.handleEdit(record);
        this.setState({ isEdit: record[this.recordKey] });
    }
    //点击保存
    saveHandler = (index) => {
        this.validateFds((err, data) => {
            if (!err) {
                let { current, pageSize } = this.state;
                if (current && current != 1) {
                    index = (current - 1) * pageSize + index;
                };
                this.handleSave(index);
                if(this.isEdit){
                    Object.assign(this.data[index], this.record);
                    this.setState({ isEdit: null });
                    this.props.handleSubmit(this.data, index);
                }
            }
        });
    }
    //点击添加
    addNewRow = () => {
        let newRow = Object.assign({}, this.getNewRow());
        this.data.splice(0, 0, newRow);
        this.forceUpdate();
    }
    //表格头
    title = () => {
        let { addBtn } = this.props;
        return addBtn ?
            <div style={{ textAlign: 'right' }}>
                <a href='#' onClick={this.addNewRow}><i className='c2mfont c2m-tianjia' style={{ paddingRight: '5px' }} />{addBtn}</a>
            </div>
            :
            null;
    }
    //点击删除
    deleteRow = (index) => {
        let { current, pageSize } = this.state;
        let realIndex = index;
        if (current && current != 1) {
            realIndex = (current - 1) * pageSize + index;
            if (index == 0 && this.data.length - 1 == realIndex) {
                this.setState({ current: current - 1 });
            }
        };
        this.handleDel(realIndex);
        this.data.splice(realIndex, 1);
        this.props.handleSubmit(this.data, realIndex);
        this.forceUpdate();
    }
    //点击取消
    cancelEdit = (index) => {
        let { current, pageSize } = this.state;
        if (current && current != 1) {
            index = (current - 1) * pageSize + index;
        };
        this.handleCancel(index);
        this.setState({ isEdit: null});
    }
    //表格变化事件
    handleTableChange = (pagination, filters, sorter) => {
        let { current, pageSize } = pagination;
        this.setState({ current, pageSize });
    }
    //联动更新操作
    handleChange = (key, index, value) => { }
    handleEdit = (record) => { }
    handleSave = (record, index) => { }
    handleDel = (index) => { }
    handleCancel = (index) => { }
    render() {
        const { loading, paging, onChange, ...props } = this.props;
        return <Form className="formInTable">
            <div>
                <TableComp
                    {...props}
                    loading={loading}
                    dataSource={this.data.slice()}
                    cols={this.columns}
                    rowKey={this.recordKey}
                    onChange={this.handleTableChange}
                    title={this.title}
                />
            </div>
        </Form>;
    }
}
EditableTableComp.defaultProps = {
    addBtn: '添加行'
}

export default EditableTableComp;