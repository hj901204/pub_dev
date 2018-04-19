/*import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import SalePriceListAct from '../../actions/SaleModule/SalePriceListAct';
import SalePriceTableComp from '../../components/SaleModule/SalePriceTableComp';

class SalePriceTableCont extends Component {
    constructor(props) {
        super(props);
    }
    // initData = () => {
    //     this.props.handleChange();
    // };
    render() {
        return (
            <div>
                <SalePriceTableComp {...this.props} />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return state.SalePriceRedu.toJS();
};

const mapDispatchToProps = (dispatch) => ({
    SourceCodeDilog:() => dispatch(SalePriceListAct.SourceCodeDilog(true)),
    // handleAdd: (data,typePage) => dispatch(BomAddTableAct.handleAdd(data,typePage)),
    // onDelete: (data,typePage) => dispatch(BomAddTableAct.onDelete(data,typePage)),
    // handleChange: (val, flag,typePage) => dispatch(BomAddTableAct.handleChange(val, flag,typePage)),
    // onCellChange: (index, key,typePage) => dispatch(BomAddTableAct.onCellChange(index, key,typePage)),
    // handleChanges:(data,typePage) => dispatch(BomAddTableAct.onCellChange(data,typePage)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SalePriceTableCont);*/