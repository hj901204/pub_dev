import React, { Component } from "react";
import { Breadcrumb, Input, Button, Table, Popconfirm,message } from '../../base/components/AntdComp.js';
import { is } from 'immutable';
import MTable from '../../base/components/TableComp';
import { shouldComponentUpdate } from '../../base/consts/Utils';

const BItem = Breadcrumb.Item;
const Search = Input.Search;



class EmployeeComp extends Component {
    constructor(props, context) {
        super(props, context);
            <div>
                <a href="#" onClick={() => this.onEditEmployee(record.empCode) }>编辑  </a>
                <Popconfirm title={
                    <div>
                        <h5>确定要删除该员工吗</h5>
                        <p>删除</p>
                    </div>
                } onConfirm={() => this.onDelete(record.empCode)}>
                    <a href="#">删除</a>
                </Popconfirm>
            </div>
    }

    componentDidMount() {
       // this.props.tablePaging(1);
    }
    onEditEmployee = (id) => {
        const { empCode, EditPositionVisiable} = this.props;
        if (id != empCode) {
            EditEmployeeVisiable(id);
        }
    }
    shouldComponentUpdate = (nextProps, nextState) => {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    };
    


    render() {
        const { AddEmployeeVisiable, EditEmployeeVisiable,npmonSearch, SearchVal, tabLoading, tablePaging, ...props } = this.props;
        return (
            <div>
                <div className="manage-head">
                    {/*<SearchComp SearchVal={SearchVal} onSearch={onSearch}/>*/}
                    <div>
                        <Button type="default" onClick={AddEmployeeVisiable}>新增员工</Button>
                        <Button type="default" onClick={EditEmployeeVisiable}>编辑员工</Button>
                    </div>    
                </div>
            </div>
        );
    }
}
export default EmployeeComp;

