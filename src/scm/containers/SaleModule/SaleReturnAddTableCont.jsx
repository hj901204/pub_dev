import React, { Component } from "react";
import { connect } from 'react-redux';
import SaleReturnAct from '../../actions/SaleModule/SaleReturnAct';
import SaleReturnAddTableAct from '../../actions/SaleModule/SaleReturnAddTableAct';
import SaleReturnAddTableComp from '../../components/SaleModule/SaleReturnAddTableComp';

class SaleReturnAddTableCont extends Component {
    constructor(props) {
        super(props);
    }
    // initData = () => {
    //     this.props.handleChange();
    // };
    render() {
        return (
            <div>
                <SaleReturnAddTableComp {...this.props}
                    initData={this.initData} 
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    // console.log(state.SaleReturnAddTableRedu.toJS());
    return state.SaleReturnAddTableRedu.toJS();
};

const mapDispatchToProps = (dispatch) => ({
    MaterialList: (materialCode) => dispatch(SaleReturnAct.MaterialList({materialCode})), 
    handleAdd: (data, typePage) => dispatch(SaleReturnAddTableAct.handleAdd(data, typePage)),
    onDelete: (data, typePage) => dispatch(SaleReturnAddTableAct.onDelete(data, typePage)),
    handleChange: (val, flag, typePage) => dispatch(SaleReturnAddTableAct.handleChange(val, flag, typePage)),
    onCellChange: (index, key, typePage) => dispatch(SaleReturnAddTableAct.onCellChange(index, key, typePage)),
    handleChanges:(data, typePage) => dispatch(SaleReturnAddTableAct.onCellChange(data, typePage)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SaleReturnAddTableCont);