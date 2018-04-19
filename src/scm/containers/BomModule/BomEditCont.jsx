import React, {Component} from "react";
import {connect} from 'react-redux';
import BomEditComp from '../../components/BomModule/BomEditComp';
import BomAct from '../../actions/BomModule/BomAct';
import {Spin } from '../../../base/components/AntdComp';
class BomEditCont extends Component {
    constructor(props) {
        super(props);
    }

    initData = () => {
        this.props.BomDetail(this.props.edit.bomCode, this.props.edit.version,"edit")

    };

    render() {
        return (
            <div>
                <Spin spinning={this.props.bomLoading}>
                    <BomEditComp  {...this.props}
                                  initData={this.initData}
                                  bomDetailInfo={this.props.bomDetailInfo.edit}/>
                </Spin>
            </div>
        )
    }
}
BomEditCont.defaultProps = {
    title: "编辑BOM信息",
    typePage:'edit'
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
    CheckDate:(pm,type)=>dispatch(BomAct.CheckDate(pm,type)),
    Save:(data)=>dispatch(BomAct.EditBom(data)),
    ModalEditVisiable:(data)=>dispatch(BomAct.ModalEditVisiable(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(BomEditCont);
