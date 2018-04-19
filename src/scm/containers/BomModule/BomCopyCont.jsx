import React, {Component} from "react";
import {connect} from 'react-redux';
import BomAct from '../../actions/BomModule/BomAct';
import {Spin } from '../../../base/components/AntdComp';
import BomCopyComp from '../../components/BomModule/BomCopyComp';
class BomCopyCont extends Component {
    constructor(props) {
        super(props);
    }

    initData = () => {
        this.props.BomDetail(this.props.copy.bomCode, this.props.copy.version,"copy")

    };
    render() {
        return (
            <div>
                <Spin spinning={this.props.bomLoading}>
                    <BomCopyComp {...this.props}
                                 initData={this.initData}
                                 onOk={this.handleSubmit}
                                 bomDetailInfo={this.props.bomDetailInfo.copy}
                    />
                </Spin>
            </div>
        )
    }
}
BomCopyCont.defaultProps = {
    title: "复制BOM信息",
    typePage:'copy'
}
const mapStateToProps = (state) => state.BomRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    MaterialFormList: (materialCode,materialName,page,pageSize,inventoryType,status) => {
        return dispatch(BomAct.MaterialFormList({materialCode,materialName,page,pageSize,inventoryType,status}))
    },
    MaterialList: (pm) => {
        return dispatch(BomAct.MaterialList(pm))
    },
    BomDetail: (bomCode, version,flag) => dispatch(BomAct.BomDetail({bomCode, version},flag)),
    Save:(data)=>dispatch(BomAct.CopyBom(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(BomCopyCont);
