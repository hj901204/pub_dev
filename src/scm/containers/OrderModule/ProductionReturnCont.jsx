//生产退料申请单
import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import ProductionReturnAct from '../../actions/OrderModule/ProductionReturnAct';
import TabsAct from '../../actions/TabsAct';
import ProductionReturnComp from '../../components/OrderModule/ProductionReturnComp';


class ProductionReturnCont extends Component {
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
        let { tabLoading, ProductionReturnList } = this.props;
        if (!tabLoading) {
            if (typeof pageNum === "number") {
                this.state.searchPm.page = pageNum;
            } else {
                this.state.searchPm = { ...this.state.searchPm, ...pageNum };
            };
            let { page, pageSize, searchKey, searchValue } = this.state.searchPm;
            let pm = { page, pageSize, [searchKey]: searchValue };
            ProductionReturnList(pm).then(json => {
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
        let { status, supplierName, supplierCode } = this.state.searchPm;
        return (
            <div className="supplier-cont">
                <ProductionReturnComp {...this.props}
                    SearchVal={supplierName || supplierCode}
                    status={status}
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
    return state.ProductionReturnRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({
    ProductionReturnList: (pm) => dispatch(ProductionReturnAct.ProductionReturnList(pm)),
    ProductionReturnViewClick: () => dispatch(TabsAct.TabAdd({
        title: "生产退料申请单详情",
        key: "productionReturnViewCont"
    })),
    AddProductionReturnCont: () => dispatch(TabsAct.TabAdd({
        title: "新建生产退料单",
        key: "addProductionReturnCont"
    })),
    EditProductionReturnCont: () => dispatch(TabsAct.TabAdd({
        title: "编辑生产退料单",
        key: "editProductionReturnCont"
    })),
    ProductionReturnViewCode: (orderCode) => dispatch(ProductionReturnAct.ProductionReturnViewData(orderCode)),
    ProductionOrderList: (pm, type) => dispatch(ProductionReturnAct.ProductionOrderList(pm, type)),
    GetDepartment: (pm, type) => dispatch(ProductionReturnAct.GetDepartment(pm, type)),
    ProEdit: (pm) => dispatch(ProductionReturnAct.ProEdit(pm)),
    GetProductionReturnDetail: (pm) => dispatch(ProductionReturnAct.GetProductionReturnDetail(pm)),
    resetNull: (type) => dispatch(ProductionReturnAct.resetNull(type)),
    NullReturnDataSource: (type) => dispatch(ProductionReturnAct.NullReturnDataSource(type)),
    UpdateReturnDataSource: (pm, type) => dispatch(ProductionReturnAct.UpdateReturnDataSource(pm, type)),
    DelProductionReturn: (returnCode) => dispatch(ProductionReturnAct.DelProductionReturn({ returnCode })),
    EmpList: (pm) => dispatch(ProductionReturnAct.EmpList(pm, 'edit')),
    GetCodeRule: () => dispatch(ProductionReturnAct.GetCodeRule({businessIndex: 20})),
})


export default connect(mapStateToProps, mapDispatchToProps)(ProductionReturnCont);