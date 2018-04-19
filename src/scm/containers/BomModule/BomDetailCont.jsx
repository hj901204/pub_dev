import React, {Component} from "react";
import BomAct from '../../actions/BomModule/BomAct';
import {connect} from 'react-redux';
import BomDetailComp from '../../components/BomModule/BomDetailComp';
import {toJS} from 'immutable';
class BomDetailCont extends Component {
    constructor(props, context) {
        super(props, context);
    }

    initData = () => {
        this.props.BomDetail(this.props.detail.bomCode, this.props.detail.version, "detail")
    };

    render() {
        const {tabLoading, ...props} = this.props;
        return (
            <div>
                <div className="bomDetail-content">
                    <BomDetailComp
                        {...this.props}
                        initData={this.initData}
                        loading={tabLoading}
                        bomDetailInfo={this.props.bomDetailInfo.detail}
                    />
                </div>
            </div>

        )
    }
}
const mapStateToProps = (state) => state.BomRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    BomDetail: (bomCode, version, flag) => dispatch(BomAct.BomDetail({bomCode, version}, flag)),
    GetBom: (bomCode, version,flag) => dispatch(BomAct.GetBom(bomCode, version,flag)),
    CheckDate:(startTime,endTime,bomCode, version,status,type)=> dispatch(BomAct.CheckDate({startTime,endTime,bomCode, version,status},type)),
    UpdateStatus:(startTime,endTime,bomCode, version,status)=> dispatch(BomAct.UpdateStatus({startTime,endTime,bomCode, version,status})),
    ModalDetailVisiable:(data)=>dispatch(BomAct.ModalDetailVisiable(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(BomDetailCont);