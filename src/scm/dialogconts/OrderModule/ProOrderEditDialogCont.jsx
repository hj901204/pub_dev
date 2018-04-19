import React, { Component } from "react";
import { Modal, message, Spin } from '../../../base/components/AntdComp';
import { connect } from 'react-redux';
import ProductionAct from '../../actions/OrderModule/ProductionAct';
import ProOrderDialogComp from '../../components/OrderModule/ProOrderDialogComp';

class ProOrderEditDialogCont extends Component {
    constructor(props, context) {
        super(props, context);
        this.searchPm = { orderCode: '', materialCode: '', customerName: '', page: 1, pageSize: 20 };
    }
    tablePaging = (page) => {
        let { orderSourceLoading, Getsalelist } = this.props;
        if (!orderSourceLoading) {
            if (typeof page === "number") {
                this.searchPm.page = page;
            } else {
                this.searchPm = { ...this.searchPm, ...page };
            };
            Getsalelist(this.searchPm)
        }
    }

    onSearch = (val) => {
        if (!this.props.orderSourceLoading) {
            this.searchPm = { ...this.searchPm, orderCode: val, materialCode: val, customerName: val, page: 1 };
            this.tablePaging();
        }
    }

    onChange = (val) => {
        if (!this.props.orderSourceLoading) {
            this.searchPm = { ...this.searchPm, page: 1 };
            this.tablePaging();
        }
    }

    // handleSubmit = (data) => {
    //     let { loading, handleSubmit, handleCancel, tablePaging } = this.props;
    //     handleSubmit(data).then(json => {
    //         if (json.status === 2000) {
    //             handleCancel();
    //             tablePaging();
    //         };
    //     });
    // }
    render() {
        return (
            this.props.edit.sourceCodeDilog ?
                <ProOrderDialogComp
                    {...this.props}
                    tablePaging={this.tablePaging}
                    onSearch={this.onSearch}
                    onClear={this.onClear}
                    onChange={this.onChange}
                    SearchVal={this.searchPm.companyName}
                    statusVal={this.searchPm.status}
                /> : null
        )

    }
}

ProOrderEditDialogCont.defaultProps = {
    title: "销售订单选择",
}

const mapStateToProps = (state) => {
    return state.ProductionRedu.toJS();
}
const mapDispatchToProps = (dispatch) => ({
    Getsalelist: (pm) => { dispatch(ProductionAct.Getsalelist(pm)); },
    handleCancel: (type) => { dispatch(ProductionAct.SourceCancel(type, false)) },
    ProductCode: (code, materialCode, orderCode, productionNumber, measureUnitName, lineNumber, materialUnit, type) => { dispatch(ProductionAct.ProductCode(code, materialCode, orderCode, productionNumber, measureUnitName, lineNumber, materialUnit, type)) },
    // handleSubmit: (data) => { return dispatch(CompanyAct.AddCompany(data)) },
    // AddAddressVisiable: () => { dispatch(AddressAct.AddAddressVisiable(true)); },
})


export default connect(mapStateToProps, mapDispatchToProps)(ProOrderEditDialogCont);
