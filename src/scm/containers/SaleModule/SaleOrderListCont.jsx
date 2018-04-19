import React, {Component} from "react";
import {connect} from 'react-redux';
import SaleOrderAct from '../../actions/SaleModule/SaleOrderAct';
import SaleOrderSearchComp from '../../components/SaleModule/SaleOrderSearchComp';
import SaleOrderTableComp from '../../components/SaleModule/SaleOrderTableComp';
class SaleOrderListCont extends Component {
    constructor(props) {
        super(props);
        this.searchPm = {saleOrderCode: '', customerName: '', sourceCode: '', page: 1, pageSize: 10};
        this.inputValue = {saleOrderCode: '', customerName: '', sourceCode: '',};
    }
    tablePaging = (page) => {
        const {tabLoading, SaleOrderList} = this.props;
        if (!tabLoading) {
            if (typeof page === "number") {
                this.searchPm.page = page;
            } else {
                this.searchPm = {...this.searchPm, ...page};
            };
            SaleOrderList(this.searchPm);
        }
    };
    onSearch = (val) => {
        this.searchPm = Object.assign({}, this.inputValue, val)
        if (!this.props.tabLoading) {
            this.searchPm = {...this.searchPm, page: 1};
            this.tablePaging();
        }
    };
    render() {
        return (
            <div>
                <SaleOrderSearchComp
                    {...this.props}
                    onSearch={this.onSearch}/>
                <SaleOrderTableComp
                    {...this.props}
                    tablePaging={this.tablePaging}/>
            </div>
        )}
}
const mapStateToProps = (state) => state.SaleOrderRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    SaleOrderList: (searchPm) => dispatch(SaleOrderAct.SaleOrderList(searchPm)),
    SetSaleOrderDetail:(saleOrderCode) => dispatch(SaleOrderAct.SetSaleOrderDetail({saleOrderCode})),
    SetSaleOrderEdit:(saleOrderCode) => dispatch(SaleOrderAct.SetSaleOrderEdit({saleOrderCode})),
    DeleteSaleOrder:(saleOrderCode) => dispatch(SaleOrderAct.DeleteSaleOrder({saleOrderCode})),
    CheckLockingStatus:(saleOrderCode) => dispatch(SaleOrderAct.CheckLockingStatus({saleOrderCode})),
    GetCodeRule: () => dispatch(SaleOrderAct.GetCodeRule({businessIndex: 16})),
})
export default connect(mapStateToProps, mapDispatchToProps)(SaleOrderListCont);