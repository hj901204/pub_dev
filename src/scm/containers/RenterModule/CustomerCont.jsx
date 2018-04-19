import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import CustomerAct from '../../actions/RenterModule/CustomerAct';

import TabsAct from '../../actions/TabsAct';
import CustomerListComp from '../../components/RenterModule/CustomerListComp';
import ImportCustomerCont from '../../dialogconts/RenterModule/ImportCustomerCont';

class CustomerCont extends Component {
    constructor(props, context) {
        super(props, context);
         this.state = {
            searchPm: {
                page: 1,
                pageSize: 10,
                searchValue: '',
                searchKey: '',
            },
        };
    }

    tablePaging = (pageNum) => {
        let { tabLoading, CustomerList } = this.props;
        if (!tabLoading){
            if (typeof pageNum === "number") {
                this.state.searchPm.page = pageNum;
            } else {
                this.state.searchPm = { ...this.state.searchPm, ...pageNum };
            };
            let { page, pageSize, searchKey, searchValue } = this.state.searchPm;
            let pm = { page, pageSize, [searchKey]: searchValue };
           CustomerList(pm).then(json => {
                if (json.status === 2000) {
                } else if (json.status === 4351) {

                };
            });
        }
    }

    onSearch = (searchData) => {
        if (Array.isArray(searchData.val)) {
            searchData.val = `"${searchData.val[0]},${searchData.val[1]}"`;
        }
        if (!this.props.tabLoading) {
            this.setState({
                searchPm: {
                    ...this.state.searchPm,
                    searchKey: searchData.key,
                    searchValue: searchData.val,
                }
            }, () => this.tablePaging());
        }
    }

    onSelect = (val) => {
        if (!this.props.tabLoading){
            val = parseInt(val);
            this.setState({
                searchPm: {
                    ...this.state.searchPm,
                    status: val,
                    page: 1, 
                }
            },() => this.tablePaging());
        }
        
    }

    onClear = () => {
        this.setState({
            searchPm: {

                ...this.state.searchPm,  customerFull: '', customerCode: '', customerAbt:'', page: 1
            }
        },() => this.tablePaging());
    }

    render() {
        let { status, customerName, customerCode } = this.state.searchPm;
        return (
            <div className="customer-cont">
                <CustomerListComp {...this.props}
                    SearchVal={customerName || customerCode}
                    status={status}
                    tablePaging={this.tablePaging}
                    onSearch={this.onSearch}

                    //onSelect={this.onSelect}
                    onClear={this.onClear}
                />
                <ImportCustomerCont {...this.props}/>
               
            </div>
        );
        
    }

   
}

const mapStateToProps = (state) => {
    return state.CustomerRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({
    CustomerList: (pm) => dispatch(CustomerAct.CustomerList(pm)),
    customerLoading:()=>dispatch(CustomerAct.customerLoading(true)),
    customerBaseLoading:()=>dispatch(CustomerAct.CustomerBaseLoading(true)),
    AddModul:()=>dispatch(TabsAct.TabAdd({
            title:"新建客户",
            key:"AddCustomer"
     })),
    CustomerViewClick:()=>dispatch(TabsAct.TabAdd({
            title:"客户详情",
            key:"customerViewCont"
     })),
    EditModul:()=>dispatch(TabsAct.TabAdd({
        title:"编辑客户",
        key:"EditCustomer"
    })),
    getEditData: (customerCode, langCode, type, Ppage) => {return dispatch(CustomerAct.getCustomerData({ customerCode, langCode }, type, Ppage)) },
    getDept:(pm)=>dispatch(CustomerAct.getDeptData(pm)),
    getBusinessPartnerData:(pm)=>dispatch(CustomerAct.getBusinessPartnerData(pm)),
    getCurrencyList:(pm)=>dispatch(CustomerAct.getCurList(pm)),
    delCustomer:(pm)=>dispatch(CustomerAct.DelCustomer(pm)),
    ContactList: (pm) => dispatch(CustomerAct.ContactList(pm)),
    defaultUser: () => {return dispatch(CustomerAct.defaultUser()) },
    getSubjectList: (pm) => dispatch(CustomerAct.getSearchInitData(pm)),
    getEmployeesList: (deptCode) => dispatch(CustomerAct.getEmpList(deptCode)),

    importViewVisiable: () => { dispatch(CustomerAct.ImportViewVisiable(true)); },//导入模块
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerCont);