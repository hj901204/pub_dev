/**
 * Created by MW on 2017/7/26.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import {
    Form,
    Popconfirm,
    Button,
} from '../../../base/components/AntdComp';

import TableComp from '../../../base/components/TableComp';

class OtherOutboundOrderAddEditableTableComp extends Component {

    renderColStatus = (text, record, index) => {
        return window.ENUM.getEnum("outDetailStatus", record.status + "");
    }

    //点击编辑
    editHandler = (record, index) => {
        let {current, pageSize} = this.state;
        let rowIndex = ((current - 1) * pageSize) + index;
        this.props.editRow && this.props.editRow(record, rowIndex);
    }
    onCancel = (txt, record, index) => {
        this.props.actions.setIsEdit(null);
        this.props.actions.editRow(this.record, index);
    }
    optColRender = (txt, record, index) => {
        return (
            <div className="editable-row-operations">
              <span style={{visibility: this.props.businessType == 1 ? 'hidden' : 'visible'}}>
                  <a onClick={() => this.editHandler(record, index)} title="编辑"><i
                      className="c2mfont c2m-bianji"></i></a>
                  <Popconfirm placement="bottomRight" title={
                      <div>
                          <h5>确认要删除该明细项吗？</h5>
                      </div>
                  }
                              onConfirm={() => this.deleteRow(index)}
                              okText="是" cancelText="否">
                      <a title="删除"><i className="c2mfont c2m-shanchu"></i></a>
                  </Popconfirm>
              </span>
            </div>
        );
    }

    addNewRow = () => {
        let newRow = {
            hasAddOpType: true,
            id: null,
            status: 1,
            materialCode: "",
            materialName: "",
            materialSpec: "",
            materialModel: "",
            planAmount: 0.00,
            materialUnitName: "",
            opType: 0,
        };
        newRow[this.recordKey] = (new Date()).valueOf();
        this.props.addRow && this.props.addRow(newRow);

    }
    //点击删除
    deleteRow = (index) => {
        let {current, pageSize} = this.state;
        let rowIndex = ((current - 1) * pageSize) + index;
        this.props.actions.dleRow(rowIndex);
        this.props.deleteRow && this.props.deleteRow(index);
    }

    constructor(props, context) {
        super(props, context);
        this.recordKey = '_recordKeyIndex';
        this.state = {
            disableds: [],
            isEdit: null,
            current: 1,
            pageSize: 10
        }
        this.columns = [
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: this.renderColStatus
            }, {
                title: '物料编码',
                width: 200,
                dataIndex: 'materialCode',
                key: 'materialCode'
                /*         render: this.renderColMaterialCode*/
            }, {
                title: '物料名称',
                dataIndex: 'materialName',
                key: 'materialName'
            },
            {
                title: '规格',
                dataIndex: 'materialSpec',
                key: 'materialSpec'
            },
            {
                title: '型号',
                dataIndex: 'materialModel',
                key: 'materialModel'
            },
            {
                title: '计划数量',
                dataIndex: 'planAmount',
                key: 'planAmount',
                obj: {
                    rules: [
                        {
                            validator: (rule, value = "", callback) => {
                                if (value.length <= 0) {
                                    callback("计划数量必填。")
                                } else if (!/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)) {
                                    callback("请输入数字。")
                                } else if (!(value > 0)) {
                                    callback("输入值必须大于 0。")
                                } else if (!(value <= 99999999)) {
                                    callback("输入值不能大于 99999999。")
                                } else if (!(/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(value))) {
                                    callback("小数点后不能超过两位");
                                }
                                callback();
                            }
                        }
                    ],
                }
            },
            {
                title: '基本单位',
                dataIndex: 'materialUnitName',
                key: 'materialUnitName'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                fixed: 'right',
                width: 92,

            }
        ];

        this.columns[this.columns.length - 1].render = this.optColRender;

    }


    render() {
        const {addBtn, loading, paging, onChange, ...props} = this.props;
        return <Form className="formInTable">
            <div className="other-out-information-table">
                <div className="formInTable-right">
                    <h3 className="information-title">
                        订单信息
                    </h3>
                </div>
                <div className="formInTable-right">
                    {
                        addBtn ?
                            <div>
                                <span className="contactBtn formInTable-right-btn" type="primary"
                                      onClick={this.addNewRow}
                                ><i className="c2mfont c2m-tianjia"></i>{addBtn}
                                </span>
                            </div>
                            : null
                    }
                </div>
            </div>
            <div>
                <TableComp
                    {...props}
                    loading={loading}
                    dataSource={this.props.dataSource}
                    cols={this.columns}
                    rowKey={this.recordKey}
                    onChange={this.handleTableChange}
                />
            </div>
        </Form>;
    }


}

OtherOutboundOrderAddEditableTableComp.defaultProps = {
    addBtn: "添加行",
    dataSource: [],
    materialCodeRowClick: () => {
    },
    addRow: () => {
    },
    deleteRow: () => {
    },
    editRow: () => {
    },


}


export default OtherOutboundOrderAddEditableTableComp;
