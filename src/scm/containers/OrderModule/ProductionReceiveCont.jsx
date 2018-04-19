//生产领料申请单
import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import ProductionReceiveAct from '../../actions/OrderModule/ProductionReceiveAct';
import TabsAct from '../../actions/TabsAct';
import ProductionReceiveComp from '../../components/OrderModule/ProductionReceiveComp';


class ProductionReceiveCont extends Component {
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
        let { tabLoading, ProductionReceiveList } = this.props;
        if (!tabLoading) {
            if (typeof pageNum === "number") {
                this.state.searchPm.page = pageNum;
            } else {
                this.state.searchPm = { ...this.state.searchPm, ...pageNum };
            };
            let { page, pageSize, searchKey, searchValue } = this.state.searchPm;
            let pm = { page, pageSize, [searchKey]: searchValue };
            ProductionReceiveList(pm).then(json => {
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


    }

    onClear = () => {

    }

    render() {
        let { status, supplierName, supplierCode } = this.state.searchPm;
        return (
            <div className="supplier-cont">
                <ProductionReceiveComp {...this.props}
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
    return state.ProductionReceiveRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({
    ProductionReceiveList: (pm) => dispatch(ProductionReceiveAct.ProductionReceiveList(pm)),
    ProductionReceiveViewClick: () => dispatch(TabsAct.TabAdd({
        title: "生产领料申请单详情",
        key: "productionReceiveViewCont"
    })),
    AddModul: () => dispatch(TabsAct.TabAdd({
        title: "新建生产领料申请单",
        key: "addProducRec"
    })),
    EditModul: () => dispatch(TabsAct.TabAdd({
        title: "编辑生产领料申请单",
        key: "editProducRec"
    })),
    ProductionReceiveView: (pm) => dispatch(ProductionReceiveAct.ProductionReceiveView(pm)),
    CanPorducRecEdit: (requisitionCode) => dispatch(ProductionReceiveAct.CanPorducRecEdit({ requisitionCode }, 'porducRecList')),
    GetSelectData: (type) => dispatch(ProductionReceiveAct.GetSelectData(type)),
    ChangeType: (type) => dispatch(ProductionReceiveAct.ChangeType(type)),
    DelPorducRec: (requisitionCode) => dispatch(ProductionReceiveAct.DelPorducRec({ requisitionCode })),
    GetCodeRule: () => dispatch(ProductionReceiveAct.GetCodeRule({businessIndex: 19})),
})


export default connect(mapStateToProps, mapDispatchToProps)(ProductionReceiveCont);