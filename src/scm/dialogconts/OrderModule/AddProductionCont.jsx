import React, { Component } from "react";
import { connect } from 'react-redux';
import ProductionAct from '../../actions/OrderModule/ProductionAct';
import TabsAct from '../../actions/TabsAct';
import AddProOrderComp from '../../components/OrderModule/AddProOrderComp';
import { Spin } from '../../../base/components/AntdComp';
class AddProductionCont extends Component {
    constructor(props, context) {
        super(props, context);
        // this.state = {
        //     searchPm: {
        //         page: 1,
        //         pageSize: 10,
        //         searchValue: '',
        //         searchKey: '',
        //     },
        // };
    }
    // tablePaging = (pageNum) => {
    //     let { orderSourceLoading, Getsalelist } = this.props;
    //     if (typeof pageNum === "number") {
    //         // this.setState({
    //         //     ...searchPm,
    //         //     page:page
    //         // })
    //         this.state.searchPm.page = pageNum;
    //     } else {
    //         this.state.searchPm = { ...this.state.searchPm, ...pageNum };
    //     };
    //     let { page, pageSize, searchKey, searchValue } = this.state.searchPm;
    //     let pm = { page, pageSize, [searchKey]: searchValue };
    //     Getsalelist(pm).then(json => {
    //         if (json.status === 2000) {
    //         } else if (json.status === 4351) {

    //         };
    //     });
    // }
    render() {
        return (
            <Spin spinning={this.props.addProOrdLoading}><AddProOrderComp tablePaging={this.props.Getsalelist} { ...this.props} /></Spin>
        )
    }

}
AddProductionCont.defaultProps = {
    title: "新建生产订单",
    width: 800,
    type: "add",
}
const mapStateToProps = (state) => {
    return state.ProductionRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({
    SourceCodeDilog: (type) => dispatch(ProductionAct.SourceCodeDilog(type, true)),
    BomCodeSelect: (pm, type) => {return dispatch(ProductionAct.BomCodeSelect(pm, 'add'))},
    FreightSpace: (code) => { dispatch(ProductionAct.FreightSpace(code, 'add')) },
    getProOrgList: (pm) => dispatch(ProductionAct.getDepartment(pm, 'add')),
    Production_Add: (data) => { return dispatch(ProductionAct.Production_Add(data)) },
    Production_AddToBack: (data) => { return dispatch(ProductionAct.Production_Add(data, 'back')) },
    ProductCode: (code, materialCode, orderCode, productionNumber, measureUnitName, lineNumber, materialUnit) => { dispatch(ProductionAct.ProductCode(code, materialCode, orderCode, productionNumber, measureUnitName, lineNumber, materialUnit, "add")) },
    Getsalelist: (pm) => { return dispatch(ProductionAct.Getsalelist(pm)); },
    //handleCancel: () => { dispatch(ProductionAct.SourceCancel(false)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProductionCont);