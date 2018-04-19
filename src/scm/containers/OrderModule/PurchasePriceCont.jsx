//采购价格清单
import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import TabsAct from '../../actions/TabsAct';
import PurchasePriceAct from '../../actions/OrderModule/PurchasePriceAct';
import PurchaseAct from '../../actions/OrderModule/PurchaseAct';
import PurchasePriceComp from '../../components/OrderModule/PurchasePriceComp';

class PurchasePriceCont extends Component {
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
        let { list, PurchasePriceList } = this.props;
        if (!list.loading) {
            if (typeof pageNum === "number") {
                this.state.searchPm.page = pageNum;
            } else {
                this.state.searchPm = { ...this.state.searchPm, ...pageNum };
            };
            let { page, pageSize, searchKey, searchValue } = this.state.searchPm;
            let pm = { page, pageSize, [searchKey]: searchValue };
            PurchasePriceList(pm);
        }
    }
    onSearch = (searchData) => {
        if(searchData.val=="null"){
            searchData.val = "";
        }
        if (!this.props.list.loading) {
            this.setState({
                searchPm: {
                    ...this.state.searchPm,
                    searchKey: searchData.key,
                    searchValue: searchData.val,
                }
            }, () => this.tablePaging());
        }
    }
    render() {
        return (
            <div className="purchaseprice-cont">
                <PurchasePriceComp {...this.props}
                    tablePaging={this.tablePaging}
                    onSearch={this.onSearch}
                />

            </div>
        );

    }


}

const mapStateToProps = (state) => state.PurchasePriceRedu.toJS();

const mapDispatchToProps = (dispatch) => ({
    PurchasePriceList: (pm) => dispatch(PurchasePriceAct.PurchasePriceList(pm)),
    OpenAddPurchasePrice: () => dispatch(TabsAct.TabAdd({
        title: "新建采购价格清单",
        key: "addPurchasePrice"
    })),
    OpenEditPurchasePrice: () => dispatch(TabsAct.TabAdd({
        title: "编辑采购价格清单",
        key: "editPurchasePrice"
    })),
    OpenPurchasePriceView: () => dispatch(TabsAct.TabAdd({
        title: "采购价格清单详情",
        key: "purchasePriceView"
    })),
    PurchasePriceAdd: () => dispatch(PurchasePriceAct.PurchasePriceAdd()),
    PurchasePriceView:(data) =>{ dispatch(PurchasePriceAct.PurchasePriceView(data))},
    PurchasePriceDetail: (data) => dispatch(PurchasePriceAct.PurchasePriceDetail(data)),
    PurchasePriceDelete: (data) => dispatch(PurchasePriceAct.PurchasePriceDelete(data)),
    PurchaseCurList: (pm) => dispatch(PurchasePriceAct.PurchaseCurList(pm, 'list')),
    PurchasePriceCode: (orderCode) => dispatch(PurchasePriceAct.PurchasePriceCode( orderCode )),
    GetCodeRule: () => dispatch(PurchaseAct.GetCodeRule({businessIndex: 36})),
})


export default connect(mapStateToProps, mapDispatchToProps)(PurchasePriceCont);