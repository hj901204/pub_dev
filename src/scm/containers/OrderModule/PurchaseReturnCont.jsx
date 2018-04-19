//采购退货单
import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import PurchaseReturnAct from '../../actions/OrderModule/PurchaseReturnAct';
import TabsAct from '../../actions/TabsAct';
import PurchaseReturnComp from '../../components/OrderModule/PurchaseReturnComp';


class PurchaseReturnCont extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            searchPm: {
                page: 1,
                pageSize: 10,
                searchValue: '',
                searchKey: '',
            },
            searchType: "S",
        };
    }

    tablePaging = (pageNum) => {
        let { tabLoading, PurchaseReturnList } = this.props;
        if (!tabLoading) {
            if (typeof pageNum === "number") {
                this.state.searchPm.page = pageNum;
            } else {
                this.state.searchPm = { ...this.state.searchPm, ...pageNum };
            };
            let { page, pageSize, searchKey, searchValue } = this.state.searchPm;
            let pm = { page, pageSize, [searchKey]: searchValue };
            PurchaseReturnList(pm).then(json => {
                if (json.status === 2000) {
                } else if (json.status === 4351) {

                };
            });
        }
    }

    onSearch = (searchData) => {
        if (Array.isArray(searchData.val)) {
            searchData.val = `${searchData.val[0]},${searchData.val[1]}`;
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


    onClear = () => {

    }

    render() {
        let { searchValue } = this.state.searchPm,
            { searchType } = this.state;
        return (
            <div className="supplier-cont">
                <PurchaseReturnComp {...this.props}
                    SearchVal={searchValue}
                    searchType={searchType}
                    tablePaging={this.tablePaging}
                    onSearch={this.onSearch}
                    onSelect={this.onSelect}
                    onClear={this.onClear}
                />

            </div>
        );

    }


}

const mapStateToProps = (state) => {
    return Object.assign({},state.PurchaseReturnRedu.toJS(),state.TabsRedu.toJS());
}

const mapDispatchToProps = (dispatch) => ({
    PurchaseReturnList: (pm) => dispatch(PurchaseReturnAct.PurchaseReturnList(pm)),
    PurRetViewClick: () => dispatch(TabsAct.TabAdd({
        title: "采购退货单详情",
        key: "purRetViewCont"
    })),
    PurRetCode: (returnCode) => dispatch(PurchaseReturnAct.PurRetCode(returnCode)),
    PurchaseReturnDelete: (pm) => dispatch(PurchaseReturnAct.PurchaseReturnDel(pm)),
    AddPurRet: () => dispatch(TabsAct.TabAdd({
        title: "新建采购退货单",
        key: "addPurRet"
    })),
    EditPurRet: () => dispatch(TabsAct.TabAdd({
        title: "编辑采购退货单",
        key: "editPurRet"
    })),
    GetSelectData: () => dispatch(PurchaseReturnAct.GetSelectData()),
    CanPurchaseReturnEdit: (returnCode) => dispatch(PurchaseReturnAct.CanPurchaseReturnEdit({ returnCode }, 'purchaseReturnList')),
    PurchaseReturnDetail: (returnCode) => dispatch(PurchaseReturnAct.PurchaseReturnDetail({ returnCode })),
    DeleteData: (value,type) => dispatch(PurchaseReturnAct.DeleteData(value, type)),
    GetCodeRule: () => dispatch(PurchaseReturnAct.GetCodeRule({businessIndex: 15})),
})


export default connect(mapStateToProps, mapDispatchToProps)(PurchaseReturnCont);