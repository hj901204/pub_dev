import React, { Component } from "react";
import { connect } from 'react-redux';
import SaleOrderAct from '../../actions/SaleModule/SaleOrderAct';
import SaleOrderAddTableComp from '../../components/SaleModule/SaleOrderAddTableComp';

class SaleOrderAddTableCont extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SaleOrderAddTableComp
                    {...this.props}
                    initData={this.initData}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => state.SaleOrderRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    MaterialList: (materialCode, materialName) => dispatch(SaleOrderAct.MaterialList({ materialCode, materialName })), 
    handleChangeSelect: (index, key,typePage) => dispatch(SaleOrderAct.handleChangeSelect(index, key,typePage)),
})
export default connect(mapStateToProps, mapDispatchToProps)(SaleOrderAddTableCont);