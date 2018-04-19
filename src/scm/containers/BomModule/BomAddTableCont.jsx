import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import BomAddTableAct from '../../actions/BomModule/BomAddTableAct';
import BomAddTableComp from '../../components/BomModule/BomAddTableComp';

class BomAddTableCont extends Component {
    constructor(props) {
        super(props);
    }
    // initData = () => {
    //     this.props.handleChange();
    // };
    render() {
        return (
            <div>
                <BomAddTableComp {...this.props} />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    // console.log(state.BomAddTableRedu.toJS());
    return state.BomAddTableRedu.toJS();
};

const mapDispatchToProps = (dispatch) => ({
    handleAdd: (data,typePage) => dispatch(BomAddTableAct.handleAdd(data,typePage)),
    onDelete: (data,typePage) => dispatch(BomAddTableAct.onDelete(data,typePage)),
    handleChange: (val, flag,typePage) => dispatch(BomAddTableAct.handleChange(val, flag,typePage)),
    onCellChange: (index, key,typePage) => dispatch(BomAddTableAct.onCellChange(index, key,typePage)),
    handleChanges:(data,typePage) => dispatch(BomAddTableAct.onCellChange(data,typePage)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BomAddTableCont);