import React, { Component, PropTypes } from "react";
import { Button, Icon } from "./AntdComp";
import SearchBarComp from './SearchBarComp';
import MTable from './TableComp';

class SelectTableComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value || '',
            selectedRowKeys: [],
            selectedRows: [],
            show: false,
            tabLoading: false,
            searchPm: {
                page: 1,
                pageSize: 5,
                searchValue: '',
                searchKey: '',
            },
            paging: {
                total: null,
                current: 1,
                pageSize: 5,
            },
            dataSource: [],
            excepts: props.excepts || [],
        };
        this.rowKey = props.rowKey;
        this.valueKey = props.valueKey;
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState({ value });
        }
        if ('excepts' in nextProps) {
            const excepts = nextProps.excepts;
            this.setState({ excepts });
        }
    }
    componentDidMount() {
        this.tablePaging(1);
    }
    tablePaging = (pageNum) => {
        let { tabLoading } = this.state;
        let { getDataSource } = this.props;
        if (!tabLoading) {
            this.setState({ tabLoading: true });
            if (typeof pageNum === "number") {
                this.state.searchPm.page = pageNum;
            } else {
                this.state.searchPm = { ...this.state.searchPm, ...pageNum };
            };
            let { page, pageSize, searchKey, searchValue } = this.state.searchPm;
            let pm = { page, pageSize, [searchKey]: searchValue };
            if (getDataSource) {
                getDataSource(pm).then(json => {
                    if (json.status == 2000) {
                        let { list, total, page, pageSize } = json.data;
                        this.setState({
                            dataSource: list,
                            paging: {
                                total,
                                current: page,
                                pageSize,
                            }
                        })
                    }
                    this.setState({ tabLoading: false })
                });
            } else { this.setState({ tabLoading: false }) }
        }
    }
    onSearch = (searchData) => {
        if (Array.isArray(searchData.val)) {
            searchData.val = `"${searchData.val[0]},${searchData.val[1]}"`;
        }
        if (!this.state.tabLoading) {
            this.setState({
                searchPm: {
                    ...this.state.searchPm,
                    searchKey: searchData.key,
                    searchValue: searchData.val,
                }
            }, () => this.tablePaging());
        }
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
    }
    onSubmit = () => {
        let { handleSubmit } = this.props;
        let { selectedRows } = this.state;
        let value = selectedRows[0] && selectedRows[0][this.valueKey];
        this.handleChange(value);
        this.setState({ show: false }, () => {
            if (handleSubmit) {
                handleSubmit(selectedRows[0]);
            }
        })
    }
    handleChange = (value) => {
        if (!('value' in this.props)) {
            this.setState({ value });
        }
        this.triggerChange(value);
    }
    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(changedValue);
        }
    }
    render() {
        let { style, contStyle, columns, searchText, subText, searchData, tableProps, btnProps } = this.props;
        let { value, show, selectedRowKeys, tabLoading, paging, dataSource, excepts } = this.state;
        let iconType = show ? 'up' : 'down';
        return (
            <div className="select-table-comp">
                <div style={{ position: 'relative' }} className="stc-btn-wrap">
                    <Button
                        {...btnProps}
                        className="ant-input ant-input-lg"
                        onClick={() => this.setState({ show: !show })}
                        style={{ width: '140px', height: '30px', display: 'flex', justifyContent: 'space-between', ...style }}
                    >
                        <span>{value}</span>
                        <Icon type={iconType} style={{ lineHeight: '20px', fontSize: '8px' }} />
                    </Button>
                </div>
                {
                    show ?
                        <div style={{
                            position: 'absolute',
                            zIndex: '1',
                            backgroundColor: '#fff',
                            width: '600px',
                            boxShadow: '0 1px 11px 0 rgba(150,149,149,0.50)',
                            borderRadius: '4px',
                            marginTop: '2px',
                            ...contStyle
                        }}
                            className="stc-table-wrap"
                        >
                            <SearchBarComp
                                onSearch={this.onSearch}
                                searchData={searchData}
                                style={{
                                    borderBottom: '0',
                                    padding: '0 20px',
                                }}
                            />
                            <div style={{ padding: '0 20px' }} className="stc-table">
                                <MTable
                                    paging={paging}
                                    loading={tabLoading}
                                    dataSource={dataSource}
                                    cols={columns}
                                    rowSelection={{
                                        type: 'radio',
                                        onChange: this.onSelectChange,
                                        getCheckboxProps: (record) => ({
                                            disabled: excepts.includes(record[this.rowKey]), 
                                        }),
                                    }}
                                    selRows={selectedRowKeys}
                                    rowKey={this.rowKey}
                                    pageOnChange={this.tablePaging}
                                    pageSizeOptions={['5', '10', '15', '20', '50']}
                                    {...tableProps}
                                />
                            </div>
                            <div style={{ padding: '0px 20px 20px', height: '48px' }} className="stc-btn">
                                <Button type="primary" style={{ float: 'right' }} onClick={this.onSubmit}>{subText}</Button>
                            </div>
                        </div>
                        : null
                }
            </div>
        );
    }
}

SelectTableComp.defaultProps = {
    searchText: '查询',
    subText: '确定',
    rowKey: 'name',
    columns: [],
    searchData: {},
}
SelectTableComp.propTypes = {
    searchText: PropTypes.string,
    subText: PropTypes.string,
    rowKey: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    searchData: PropTypes.object,
    handleSubmit: PropTypes.func,
    getDataSource: PropTypes.func.isRequired,
}
export default SelectTableComp;

//example
{/* <SelectTableComp
    style={{}}
    contStyle={{}}
    columns={[]}
    rowKey='index' //表格的索引字段
    valueKey='code'//返回显示的字段
    handleSubmit={()=>{}}
    getDataSource={()=>{}} //promise
/> */}