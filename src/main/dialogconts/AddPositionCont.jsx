import React,{Component} from "react";
import { Modal, message } from '../../base/components/AntdComp.js';
import { connect } from 'react-redux';
import PositionAct from '../actions/PositionAct';
import AddPositionComp from '../components/AddPositionComp';
import TXT from '../languages';
const T = TXT.POSITION;

class AddPositionCont extends Component{
    constructor(props, context) {
        super(props, context);
        
    }
    handleSubmit = (data) => {
        let { handleSubmit, handleCancel, tablePaging } = this.props;
        handleSubmit(data).then(json => {
            if (json.status === 2000) {
                handleCancel();
                tablePaging();
            };
        });
    }
    render() {
        let { visible } = this.props;
        return (
            visible ?
                <AddPositionComp
                    {...this.props}
                    onOk={this.handleSubmit}
                /> : null
        );
    }
}

AddPositionCont.defaultProps = {
    title: T.ADD,
}

const mapStateToProps = (state) => ({
    visible: state.PositionRedu.get('add_position_visiable'),
    loading: state.PositionRedu.get('positionLoading'),
})
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(PositionAct.AddPositionVisiable(false)) },
    handleSubmit: (data) => dispatch(PositionAct.AddPosition(data)),
})


export default connect(mapStateToProps,mapDispatchToProps)(AddPositionCont);
