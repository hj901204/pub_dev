import React, {Component} from "react";
import {connect} from 'react-redux';
import {Spin} from '../../../base/components/AntdComp';
import BomAct from '../../actions/BomModule/BomAct';
import BomAddComp from '../../components/BomModule/BomAddComp';

class BomAddCont extends Component {
    constructor(props, context) {
        super(props, context);

    }
    componentDidMount() {
        this.props.CleanBomDetail({});
    }
    render() {
        return (
            <div>
                <Spin spinning={this.props.bomLoading}>
                    <BomAddComp {...this.props}
                                onOk={this.handleSubmit}
                                bomDetailInfo={this.props.bomDetailInfo.add}
                    />
                </Spin>
            </div>

        )
    }
}
BomAddCont.defaultProps = {
    title: "新建BOM信息",
    bomDetailInfo:{},
    typePage:'add'
}
const mapStateToProps = (state) => state.BomRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    MaterialFormList: (materialCode,materialName,page,pageSize,inventoryType,status) => {
        return dispatch(BomAct.MaterialFormList({materialCode,materialName,page,pageSize,inventoryType,status}))
    },
    MaterialList: (pm) => {
        return dispatch(BomAct.MaterialList(pm))
    },
    CleanBomDetail:(data) => {
        return dispatch(BomAct.CleanBomDetail({data}))
    },
    CleanMaterialSource:() => {
    return dispatch(BomAct.CleanMaterialSource())
},
    Save:(data)=>dispatch(BomAct.AddBom(data)),
    SaveBack:(data)=>dispatch(BomAct.AddBomBack(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(BomAddCont);