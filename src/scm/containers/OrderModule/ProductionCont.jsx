//生产订单
import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import ProductionAct from '../../actions/OrderModule/ProductionAct';
import TabsAct from '../../actions/TabsAct';
import ProductionComp from '../../components/OrderModule/ProductionComp';


class ProductionCont extends Component {
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
        let { tabLoading, ProductionList } = this.props;
        if (!tabLoading) {
            if (typeof pageNum === "number") {
                // this.setState({
                //     ...searchPm,
                //     page:page
                // })
                this.state.searchPm.page = pageNum;
            } else {
                this.state.searchPm = { ...this.state.searchPm, ...pageNum };
            };
            let { page, pageSize, searchKey, searchValue } = this.state.searchPm;
            let pm = { page, pageSize, [searchKey]: searchValue };
            ProductionList(pm).then(json => {
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
        this.setState({
            searchPm: {
                ...this.state.searchPm,
                searchKey: val
            }
        })

    }

    onClear = () => {
        this.setState({
            searchPm: {
                ...this.state.searchPm,
                searchValue: '',
                page: 1
            }
        }, () => this.tablePaging());
    }

    render() {
        let { searchValue } = this.state.searchPm;
        return (
            <div className="supplier-cont">
                <ProductionComp {...this.props}
                    SearchVal={searchValue}
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
    return state.ProductionRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({
    ProductionList: (pm) => { return dispatch(ProductionAct.ProductionList(pm)) },
    ProductionDelete: (pm) => dispatch(ProductionAct.ProductionDel(pm)),
    ProductionViewClick: () => dispatch(TabsAct.TabAdd({
        title: "生产订单详情",
        key: "productionViewCont"
    })),
    ProductionDetail: (pm) => dispatch(ProductionAct.ProductionDetailData(pm)),
    AddProductionCont: () => dispatch(TabsAct.TabAdd({
        title: "新建生产订单",
        key: "addProductionCont"
    })),
    EditProductionCont: () => dispatch(TabsAct.TabAdd({
        title: "编辑生产订单",
        key: "editProductionCont"
    })),
    resetRecord: (value) => dispatch(ProductionAct.resetRecord(value)),
    ProductionCode: (orderCode) => dispatch(ProductionAct.ProductionCode(orderCode)),
    getSiteAll: (isSog) => { dispatch(ProductionAct.getSiteAll(isSog)) },
    getDepartment: (param, type) => { dispatch(ProductionAct.getDepartment(param, type)) },
    EditProOrderDetail: (orderCode) => dispatch(ProductionAct.EditProOrderDetail(orderCode)),
    GetCodeRule: () => dispatch(ProductionAct.GetCodeRule({businessIndex: 18})),
})


export default connect(mapStateToProps, mapDispatchToProps)(ProductionCont);