import React, {Component} from "react";
import {connect} from 'react-redux';
import BomAct from '../../actions/BomModule/BomAct';
import {Spin } from '../../../base/components/AntdComp';
import BomUpgradeComp from '../../components/BomModule/BomUpgradeComp';
class BomUpgradeCont extends Component {
    constructor(props) {
        super(props);
    }

    initData = () => {
        this.props.BomDetail(this.props.upgrade.bomCode, this.props.upgrade.version,"upgrade")

    };
    render() {
        return (
            <div>
                <Spin spinning={this.props.bomLoading}>
                    <BomUpgradeComp {...this.props}
                                    initData={this.initData}
                                    onOk={this.handleSubmit}
                                    bomDetailInfo={this.props.bomDetailInfo.upgrade}
                    />
                </Spin>
            </div>

        )
    }
}
BomUpgradeCont.defaultProps = {
    title: "升级BOM信息",
    typePage:'upgrade'
}
const mapStateToProps = (state) => state.BomRedu.toJS();
const mapDispatchToProps = (dispatch) => ({


    BomDetail: (bomCode, version,flag) => dispatch(BomAct.BomDetail({bomCode, version},flag)),
    MaterialFormList: (materialCode,materialName,page,pageSize,inventoryType,status) => {
        return dispatch(BomAct.MaterialFormList({materialCode,materialName,page,pageSize,inventoryType,status}))
    },
    MaterialList: (pm) => {
        return dispatch(BomAct.MaterialList(pm))
    },
    Save:(data)=>dispatch(BomAct.UpgradeBom(data)),
    CheckDate:(pm,type)=>dispatch(BomAct.CheckDate(pm,type)),
    ModalVisiable:(data)=>dispatch(BomAct.ModalVisiable(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(BomUpgradeCont);