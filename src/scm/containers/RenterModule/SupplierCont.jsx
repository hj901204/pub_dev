import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import SupplierAct from '../../actions/RenterModule/SupplierAct';
import CustomerAct from '../../actions/RenterModule/CustomerAct';
import TabsAct from '../../actions/TabsAct';
import SupplierListComp from '../../components/RenterModule/SupplierListComp';
import ImportSupplierViewCont from './ImportSupplierViewCont';


class SupplierCont extends Component {
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
        let { tabLoading, SupplierList } = this.props;
        if (!tabLoading){
            if (typeof pageNum === "number") {
                this.state.searchPm.page = pageNum;
            } else {
                this.state.searchPm = { ...this.state.searchPm, ...pageNum };
            };
            let { page, pageSize, searchKey, searchValue } = this.state.searchPm;
            let pm = { page, pageSize, [searchKey]: searchValue };
           SupplierList(pm).then(json => {
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
                ...this.state.searchPm, status: 0, supplierFull: '', supplierCode: '', supplierAbt: '', page: 1
            }
        },() => this.tablePaging());
    }

    render() {
        let { status, supplierFull, supplierCode, supplierAbt } = this.state.searchPm;
        return (
            <div className="supplier-cont">
                <SupplierListComp {...this.props}
                    SearchVal={supplierFull || supplierCode || supplierAbt}
                    status={status}
                    tablePaging={this.tablePaging}
                    onSearch={this.onSearch}
                    //onSelect={this.onSelect}
                    onClear={this.onClear}
                />
                <ImportSupplierViewCont
                    {...this.props}    
                    tablePaging={this.tablePaging}
                />               
            </div>
        );
        
    }

   
}

const mapStateToProps = (state) => {
    return state.SupplierRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({
    SupplierList: (pm) => dispatch(SupplierAct.SupplierList(pm)),
    supplierLoading:()=>dispatch(SupplierAct.supplierLoading(true)),
    SupplierBaseLoading:()=>dispatch(SupplierAct.supplierBaseLoading(true)),
    AddModul:()=>dispatch(TabsAct.TabAdd({
            title:"新建供应商",
            key:"AddSupplier"
     })),
    SupplierViewClick:()=>dispatch(TabsAct.TabAdd({
            title:"供应商详情",
            key:"supplierViewCont"
     })),
    EditModul:()=>dispatch(TabsAct.TabAdd({
        title:"编辑供应商",
        key:"EditSupplier"
    })),
    getEditData: (pm, type, Ppage) => { return dispatch(SupplierAct.getSupplierData(pm, type, Ppage)) },
    getDept:(pm)=>dispatch(SupplierAct.getDeptData(pm)),
    getBusinessPartnerData:(pm)=>dispatch(SupplierAct.getBusinessPartnerData(pm)),
    getCurrencyList:(pm)=>dispatch(SupplierAct.getCurList(pm)),
    delSupplier:(pm)=>dispatch(SupplierAct.DelSupplier(pm)),
    ContactList: (pm) => dispatch(SupplierAct.ContactList(pm)),
    getUserInfo:()=>{return dispatch(SupplierAct.getUserInfo())},
    getEmployeesList:(pm)=>dispatch(SupplierAct.getEmpList(pm)),
    getSubjectList: (pm) => { dispatch(SupplierAct.getSearchInitData(pm)) },
    importViewVisiable: () => { dispatch(SupplierAct.ImportViewVisiable(true)); },
})
     

export default connect(mapStateToProps, mapDispatchToProps)(SupplierCont);