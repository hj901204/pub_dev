import React, { Component } from 'react'
import actions from '../actions/MemberManageAct'
import SearchComp from '../../base/components/SearchComp';
import {Button, Spin, Pagination, Input, Layout, Table} from '../../base/components/AntdComp'

class HeaderToOutInfoComp extends Component {
    constructor(props, context) {
        super(props, context);
    }
    componentWillMount() {
        let searchval = {
            employeeName:'', 
            phone:'',
            page:1, 
            pageSize:10,
        }
        this.props.refreshList( searchval )
    }
    render(){
        let { state, checkedList, state2, onSearch, SearchVal, ...props } = this.props;
        return (
            <div>
                <div className='tableHeader'>       
                    <div className='head-line-three'>
                        <p  style={{float:'left'}}>已停用员工( { this.props.paging.total } )</p>
                        <div style={{float:'left'}}>
                            <SearchComp 
                                placeholder = '输入姓名/手机搜索'
                                onSearch = { onSearch }
                                SearchVal = { SearchVal }
                                width = {185}
                            />
                        </div>
                    </div>
                </div>
            </div>  
        );

    }
}

export default HeaderToOutInfoComp