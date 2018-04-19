import React,{Component} from "react";
import { Modal, message } from '../../base/components/AntdComp.js';
import { connect } from 'react-redux';
import PositionAct from '../actions/PositionAct';
import EditPositionComp from '../components/EditPositionComp';
import TXT from '../languages';
const T = TXT.POSITION;

class AddPositionCont extends Component{
    constructor(props, context) {
        super(props, context);
        
    }
    initData = () =>{
        const { loading, PositionDetail, positionId, handleCancel } = this.props;
        if (!loading && positionId) {
            PositionDetail(positionId).then(json => {
                if (json.status === 2000) {
                    // message.info('获取职务详情成功!');
                } else if (json.status === 4352) {
                    handleCancel(null);
                };
            });
        }
    }
    
    handleSubmit = (data) => {
        const { handleSubmit, handleCancel, tablePaging } = this.props;
        handleSubmit(data).then(json => {
            if (json.status && (json.status === 2000)) {
                handleCancel();
                tablePaging();
            };
        });
    }
    render() {
        const { visible } = this.props;
        return (
            visible ?
                <EditPositionComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    initData={this.initData}
                /> : null
        );
    }
}

AddPositionCont.defaultProps = {
    title: T.EDIT,
}

const mapStateToProps = (state) => ({
    visible: state.PositionRedu.get('edit_position_visiable'),
    loading: state.PositionRedu.get('positionLoading'),
    position: state.PositionRedu.get('position'),
    positionId: state.PositionRedu.get('positionId'),
})
const mapDispatchToProps = (dispatch, ownProps) => ({
    handleCancel: (id) => { dispatch(PositionAct.EditPositionVisiable(false,id)) },
    handleSubmit: (data) => dispatch(PositionAct.EditPosition(data)),
    PositionDetail: (positionCode) => dispatch(PositionAct.PositionDetail({ positionCode })),
})


export default connect(mapStateToProps,mapDispatchToProps)(AddPositionCont);
